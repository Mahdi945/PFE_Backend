# Migration de la base de donnees vers VPS
# Station Service - Deploiement Production

# CONFIGURATION VPS
$VPS_HOST = "almalinux@vps-3b4fd3be.vps.ovh.ca"
$VPS_SSH_PASSWORD = "Offline2025"
$MYSQL_ROOT_PASSWORD = ""  # Vide si pas de mot de passe root MySQL

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Migration BD vers VPS" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Charger les variables d'environnement
if (Test-Path ".env") {
    $envVars = @{}
    Get-Content ".env" | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            $envVars[$key] = $value
        }
    }
    Write-Host "Variables d'environnement chargees" -ForegroundColor Green
} else {
    Write-Host "Fichier .env introuvable!" -ForegroundColor Red
    exit 1
}

$DB_NAME = $envVars['DB_NAME']
$DB_USER = $envVars['DB_USER']
$DB_PASSWORD = $envVars['DB_PASSWORD']

Write-Host ""
Write-Host "Configuration depuis .env:" -ForegroundColor Yellow
Write-Host "  Base: $DB_NAME" -ForegroundColor White
Write-Host "  User: $DB_USER" -ForegroundColor White
Write-Host "  Pass: $DB_PASSWORD" -ForegroundColor White
Write-Host ""

# Verifier que le fichier SQL existe
$deployFile = ".\sql\deploy_production.sql"
if (-not (Test-Path $deployFile)) {
    Write-Host "Fichier SQL introuvable: $deployFile" -ForegroundColor Red
    Write-Host ""
    Write-Host "Executez d'abord: .\export-database.ps1" -ForegroundColor Yellow
    exit 1
}

$fileSize = (Get-Item $deployFile).Length / 1KB
$fileSizeRounded = [math]::Round($fileSize, 2)
Write-Host "Fichier SQL trouve: $fileSizeRounded KB" -ForegroundColor Green
Write-Host ""

# Confirmation
Write-Host "ATTENTION: Cette operation va:" -ForegroundColor Yellow
Write-Host "   - Creer/recreer la base $DB_NAME sur le VPS" -ForegroundColor White
Write-Host "   - Creer l'utilisateur $DB_USER avec le mot de passe du .env" -ForegroundColor White
Write-Host "   - Importer toutes les tables (vides sauf utilisateurs)" -ForegroundColor White
Write-Host ""
$confirm = Read-Host "Continuer? (oui/non)"
if ($confirm -ne "oui") {
    Write-Host "Operation annulee" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Deploiement en cours..." -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Etape 1/4: Transfert du fichier SQL..." -ForegroundColor Yellow
scp $deployFile "${VPS_HOST}:~/deploy_station_service.sql"

if ($LASTEXITCODE -ne 0) {
    Write-Host "  Erreur lors du transfert" -ForegroundColor Red
    exit 1
}
Write-Host "  Fichier transfere" -ForegroundColor Green
Write-Host ""

Write-Host "Etape 2/4: Creation du script de setup..." -ForegroundColor Yellow

# Script SQL pour creer la BD et l'utilisateur
$setupSQL = @"
DROP DATABASE IF EXISTS $DB_NAME;
CREATE DATABASE $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
DROP USER IF EXISTS '$DB_USER'@'localhost';
CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
SELECT 'Base de donnees $DB_NAME creee' AS Status;
SELECT 'Utilisateur $DB_USER cree avec tous les privileges' AS Status;
"@

$setupFile = ".\sql\setup_vps.sql"
$setupSQL | Out-File -FilePath $setupFile -Encoding ASCII

scp $setupFile "${VPS_HOST}:~/setup_vps.sql"

if ($LASTEXITCODE -ne 0) {
    Write-Host "  Erreur lors du transfert du setup" -ForegroundColor Red
    exit 1
}
Write-Host "  Script de setup transfere" -ForegroundColor Green
Write-Host ""

Write-Host "Etape 3/4: Configuration MySQL sur le VPS..." -ForegroundColor Yellow

# Construction de la commande MySQL
if ($MYSQL_ROOT_PASSWORD) {
    $mysqlRootCmd = "mysql -u root -p'$MYSQL_ROOT_PASSWORD'"
} else {
    $mysqlRootCmd = "sudo mysql -u root"
}

$sshCommands1 = @"
echo '=== Configuration de la base de donnees ==='
$mysqlRootCmd < ~/setup_vps.sql
if [ `$? -eq 0 ]; then
    echo 'Base de donnees et utilisateur crees'
else
    echo 'Erreur lors de la creation'
    exit 1
fi
"@

$sshCommands1 = $sshCommands1 -replace "`r", ""
echo $VPS_SSH_PASSWORD | ssh $VPS_HOST $sshCommands1

if ($LASTEXITCODE -ne 0) {
    Write-Host "  Erreur lors de la configuration" -ForegroundColor Red
    exit 1
}
Write-Host "  Base et utilisateur crees" -ForegroundColor Green
Write-Host ""

Write-Host "Etape 4/4: Import de la structure et des donnees..." -ForegroundColor Yellow

$sshCommands2 = @"
echo '=== Import des tables et donnees ==='
mysql -u $DB_USER -p'$DB_PASSWORD' $DB_NAME < ~/deploy_station_service.sql
if [ `$? -eq 0 ]; then
    echo 'Import reussi'
    echo ''
    echo '=== Verification ==='
    mysql -u $DB_USER -p'$DB_PASSWORD' $DB_NAME -e 'SHOW TABLES;'
    echo ''
    mysql -u $DB_USER -p'$DB_PASSWORD' $DB_NAME -e 'SELECT COUNT(*) as Total FROM utilisateurs;'
    echo ''
    echo '=== Nettoyage ==='
    rm ~/setup_vps.sql ~/deploy_station_service.sql
    echo 'Fichiers temporaires supprimes'
else
    echo 'Erreur lors de l import'
    exit 1
fi
"@

$sshCommands2 = $sshCommands2 -replace "`r", ""
echo $VPS_SSH_PASSWORD | ssh $VPS_HOST $sshCommands2

Write-Host ""

if ($LASTEXITCODE -eq 0) {
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host "  Migration reussie!" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Configuration MySQL sur le VPS:" -ForegroundColor Cyan
    Write-Host "  Host: localhost" -ForegroundColor White
    Write-Host "  Database: $DB_NAME" -ForegroundColor White
    Write-Host "  User: $DB_USER" -ForegroundColor White
    Write-Host "  Password: $DB_PASSWORD" -ForegroundColor White
    Write-Host ""
    Write-Host "Prochaines etapes:" -ForegroundColor Cyan
    Write-Host "   1. Creez le fichier .env sur le VPS avec ces credentials" -ForegroundColor White
    Write-Host "   2. Utilisez sync-to-vps.ps1 pour deployer le backend" -ForegroundColor White
    Write-Host "   3. Utilisez deploy-to-vps.ps1 pour deployer le frontend" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "==========================================" -ForegroundColor Red
    Write-Host "  Erreur lors de la migration" -ForegroundColor Red
    Write-Host "==========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Verifications:" -ForegroundColor Yellow
    Write-Host "  - MySQL/MariaDB est installe sur le VPS" -ForegroundColor White
    Write-Host "  - Vous avez les droits root MySQL" -ForegroundColor White
    Write-Host "  - La connexion SSH fonctionne" -ForegroundColor White
    exit 1
}

# Nettoyage local
if (Test-Path $setupFile) {
    Remove-Item $setupFile -Force
}

Write-Host ""
