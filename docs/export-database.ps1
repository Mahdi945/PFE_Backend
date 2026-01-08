# Export de la base de donnees pour production
# Structure complete + donnees utilisateurs uniquement

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Export BD pour Production" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Charger les variables d'environnement
if (Test-Path ".env") {
    Get-Content ".env" | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
    Write-Host "Variables d'environnement chargees" -ForegroundColor Green
} else {
    Write-Host "Fichier .env introuvable!" -ForegroundColor Red
    exit 1
}

$DB_HOST = $env:DB_HOST
$DB_USER = $env:DB_USER
$DB_PASSWORD = $env:DB_PASSWORD
$DB_NAME = $env:DB_NAME

if (-not $DB_HOST -or -not $DB_USER -or -not $DB_NAME) {
    Write-Host "Variables de base de donnees manquantes dans .env" -ForegroundColor Red
    exit 1
}

Write-Host "Configuration:" -ForegroundColor Yellow
Write-Host "  Base: $DB_NAME" -ForegroundColor White
Write-Host "  Host: $DB_HOST" -ForegroundColor White
Write-Host "  User: $DB_USER" -ForegroundColor White
Write-Host ""

# Creer le dossier sql s'il n'existe pas
$sqlDir = ".\sql"
if (-not (Test-Path $sqlDir)) {
    New-Item -ItemType Directory -Path $sqlDir | Out-Null
    Write-Host "Dossier sql cree" -ForegroundColor Green
}

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$structureFile = Join-Path $sqlDir "structure_only_$timestamp.sql"
$usersDataFile = Join-Path $sqlDir "users_data_$timestamp.sql"
$deployFile = Join-Path $sqlDir "deploy_production.sql"

Write-Host ""
Write-Host "Etape 1: Export de la structure (sans donnees)..." -ForegroundColor Yellow

# Export structure uniquement
$cmd = "mysqldump --host=$DB_HOST --user=$DB_USER --password=$DB_PASSWORD --no-data --skip-triggers --skip-add-drop-table $DB_NAME"

try {
    $structureContent = Invoke-Expression "$cmd 2>&1"
    
    if ($LASTEXITCODE -eq 0) {
        $structureContent | Out-File -FilePath $structureFile -Encoding UTF8
        $fileSize = (Get-Item $structureFile).Length / 1KB
        $fileSizeRounded = [math]::Round($fileSize, 2)
        Write-Host "  Structure exportee: $fileSizeRounded KB" -ForegroundColor Green
    } else {
        Write-Host "  Erreur lors de l'export de la structure" -ForegroundColor Red
        Write-Host $structureContent -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "  Erreur: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Etape 2: Export des donnees utilisateurs uniquement..." -ForegroundColor Yellow

# Export donnees de la table utilisateurs uniquement
$cmd = "mysqldump --host=$DB_HOST --user=$DB_USER --password=$DB_PASSWORD --no-create-info --skip-triggers $DB_NAME utilisateurs"

try {
    $usersData = Invoke-Expression "$cmd 2>&1"
    
    if ($LASTEXITCODE -eq 0) {
        $usersData | Out-File -FilePath $usersDataFile -Encoding UTF8
        
        # Compter le nombre d'utilisateurs
        $userCount = ([regex]::Matches($usersData, "INSERT INTO")).Count
        Write-Host "  Donnees exportees: $userCount utilisateurs" -ForegroundColor Green
    } else {
        Write-Host "  Erreur lors de l'export des donnees" -ForegroundColor Red
        Write-Host $usersData -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "  Erreur: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Etape 3: Creation du fichier de deploiement production..." -ForegroundColor Yellow

# Creer le fichier combine pour la production
$deployContent = @"
-- ============================================
-- SCRIPT DE DEPLOIEMENT PRODUCTION
-- Base de donnees: station_service
-- Genere le: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
-- ============================================
-- CONTENU:
--   - Structure complete (tables VIDES)
--   - Donnees de la table utilisateurs uniquement
-- ============================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- ============================================
-- STRUCTURE DES TABLES (VIDES)
-- ============================================

$structureContent

-- ============================================
-- DONNEES: TABLE UTILISATEURS
-- ============================================

$usersData

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
"@

$deployContent | Out-File -FilePath $deployFile -Encoding UTF8

$deploySize = (Get-Item $deployFile).Length / 1KB
$deploySizeRounded = [math]::Round($deploySize, 2)
Write-Host "  Fichier de deploiement cree: $deploySizeRounded KB" -ForegroundColor Green

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  Export termine avec succes!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Fichiers generes:" -ForegroundColor Cyan
Write-Host "  1. Structure seule: $structureFile" -ForegroundColor White
Write-Host "  2. Donnees users: $usersDataFile" -ForegroundColor White
Write-Host "  3. FICHIER PROD: $deployFile" -ForegroundColor Yellow
Write-Host ""
Write-Host "Prochaine etape:" -ForegroundColor Cyan
Write-Host "   Utilisez migrate-database-to-vps.ps1 pour deployer sur le VPS" -ForegroundColor White
Write-Host ""

