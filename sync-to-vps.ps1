# Synchronisation du backend vers le VPS
# Station Service - Backend Deployment

# CONFIGURATION VPS
$VPS_HOST = "almalinux@vps-3b4fd3be.vps.ovh.ca"
$VPS_PASSWORD = "Offline2025"
$VPS_PATH = "~/station-service-backend"
$LOCAL_ROOT = "C:\Users\MSP\Documents\Mahdi\station service projet\Backend"
$TEMP_DIR = "C:\Users\MSP\Documents\Mahdi\station service projet\Backend\temp-sync"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Synchronisation Backend vers VPS" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Creer un repertoire temporaire
if (Test-Path $TEMP_DIR) {
    Remove-Item -Recurse -Force $TEMP_DIR
}
New-Item -ItemType Directory -Path $TEMP_DIR | Out-Null

Write-Host "Etape 1/5: Preparation des fichiers..." -ForegroundColor Yellow

# Liste des dossiers/fichiers a copier
$itemsToCopy = @(
    "config",
    "controllers", 
    "models",
    "routes",
    "services",
    "public",
    "chatbot",
    "sql",
    "server.js",
    "package.json",
    "swagger-config.js",
    "ecosystem.config.js"
)

# Copier les fichiers necessaires
foreach ($item in $itemsToCopy) {
    $source = Join-Path $LOCAL_ROOT $item
    if (Test-Path $source) {
        if (Test-Path $source -PathType Container) {
            Copy-Item -Path $source -Destination $TEMP_DIR -Recurse -Force
            Write-Host "  Copie: $item/" -ForegroundColor Green
        } else {
            Copy-Item -Path $source -Destination $TEMP_DIR -Force
            Write-Host "  Copie: $item" -ForegroundColor Green
        }
    } else {
        Write-Host "  Ignore: $item (introuvable)" -ForegroundColor Gray
    }
}

# Supprimer .env s'il existe
$envFile = Join-Path $TEMP_DIR ".env"
if (Test-Path $envFile) {
    Remove-Item $envFile -Force
    Write-Host "  .env exclu" -ForegroundColor Green
}

# Supprimer node_modules si present
$nodeModules = Join-Path $TEMP_DIR "node_modules"
if (Test-Path $nodeModules) {
    Remove-Item -Recurse -Force $nodeModules
    Write-Host "  node_modules exclu" -ForegroundColor Green
}

Write-Host ""
Write-Host "Etape 2/5: Creation de l'archive..." -ForegroundColor Yellow

$archivePath = Join-Path $LOCAL_ROOT "backend-sync.tar.gz"
if (Test-Path $archivePath) {
    Remove-Item $archivePath -Force
}

Set-Location $TEMP_DIR
tar -czf $archivePath *
Set-Location $LOCAL_ROOT

if ($LASTEXITCODE -ne 0) {
    Write-Host "  Erreur lors de la creation de l'archive" -ForegroundColor Red
    Remove-Item -Recurse -Force $TEMP_DIR
    exit 1
}

$archiveSize = (Get-Item $archivePath).Length / 1MB
$archiveSizeRounded = [math]::Round($archiveSize, 2)
Write-Host "  Archive creee: $archiveSizeRounded MB" -ForegroundColor Green
Write-Host ""

Write-Host "Etape 3/5: Transfert vers le VPS..." -ForegroundColor Yellow
scp $archivePath "${VPS_HOST}:~/backend-sync.tar.gz"

if ($LASTEXITCODE -ne 0) {
    Write-Host "  Erreur lors du transfert" -ForegroundColor Red
    Remove-Item -Recurse -Force $TEMP_DIR
    Remove-Item $archivePath -Force
    exit 1
}

Write-Host "  Transfert reussi" -ForegroundColor Green
Write-Host ""

Write-Host "Etape 4/5: Deploiement sur le VPS..." -ForegroundColor Yellow

$sshCommands = @"
echo '=== Creation du dossier backend ==='
mkdir -p $VPS_PATH
cd $VPS_PATH

echo '=== Sauvegarde de .env ==='
if [ -f .env ]; then
    cp .env ~/.env.backup
    echo '.env sauvegarde'
else
    echo 'Aucun .env existant'
fi

echo '=== Extraction de l archive ==='
tar -xzf ~/backend-sync.tar.gz -C $VPS_PATH/
echo 'Fichiers extraits'

echo '=== Restauration de .env ==='
if [ -f ~/.env.backup ]; then
    cp ~/.env.backup $VPS_PATH/.env
    echo '.env restaure'
else
    echo 'Creez le fichier .env avec les variables de production'
fi

echo '=== Mise a jour des variables EMAIL dans .env ==='
if [ -f $VPS_PATH/.env ]; then
    sed -i 's/^EMAIL_USER=.*/EMAIL_USER=carbotrack@gmail.com/' $VPS_PATH/.env
    sed -i 's/^EMAIL_PASS=.*/EMAIL_PASS=anfphkedikrgowoc/' $VPS_PATH/.env
    echo 'Variables EMAIL mises a jour'
    grep -E '^EMAIL_' $VPS_PATH/.env
fi

echo '=== Nettoyage ==='
rm ~/backend-sync.tar.gz
echo 'Archive supprimee'

echo '=== Installation des dependances Node.js ==='
cd $VPS_PATH
if [ -f package.json ]; then
    npm install --production
    echo 'npm install termine'
fi

echo '=== Installation des dependances Python pour le chatbot ==='
if [ -d $VPS_PATH/chatbot ]; then
    cd $VPS_PATH/chatbot
    pip3 install flask flask-cors openai --quiet 2>/dev/null || pip install flask flask-cors openai --quiet 2>/dev/null
    echo 'Dependances Python installees'
fi

echo '=== Arret des services existants ==='
pm2 stop station-service-backend 2>/dev/null || echo 'Backend pas encore demarre'
pm2 stop station-service-chatbot 2>/dev/null || echo 'Chatbot pas encore demarre'
pkill -f 'python.*chatbot_api.py' 2>/dev/null || echo 'Aucun processus chatbot Python'

echo '=== Demarrage du Backend avec PM2 ==='
cd $VPS_PATH
pm2 delete station-service-backend 2>/dev/null
pm2 start server.js --name station-service-backend
echo 'Backend demarre'

echo '=== Demarrage du Chatbot avec PM2 ==='
cd $VPS_PATH/chatbot
pm2 delete station-service-chatbot 2>/dev/null
pm2 start chatbot_api.py --name station-service-chatbot --interpreter python3
echo 'Chatbot demarre'

echo '=== Sauvegarde de la config PM2 ==='
pm2 save

echo '=== Statut des services ==='
pm2 status

echo '=== Verification des fichiers ==='
ls -lh $VPS_PATH/
echo ''
echo '=== Contenu du dossier chatbot ==='
ls -lh $VPS_PATH/chatbot/
"@

$sshCommands = $sshCommands -replace "`r", ""
echo $VPS_PASSWORD | ssh $VPS_HOST $sshCommands

Write-Host ""

if ($LASTEXITCODE -eq 0) {
    Write-Host "Etape 5/5: Configuration finale..." -ForegroundColor Yellow
    Write-Host "  Backend synchronise avec succes" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host "  Synchronisation reussie!" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Resume:" -ForegroundColor Cyan
    Write-Host "  - Code backend synchronise vers: $VPS_PATH" -ForegroundColor White
    Write-Host "  - .env preserve (ou a creer si premiere installation)" -ForegroundColor White
    Write-Host "  - node_modules installe en mode production" -ForegroundColor White
    Write-Host ""
    Write-Host "Prochaines etapes sur le VPS:" -ForegroundColor Cyan
    Write-Host "   1. Verifiez/creez le fichier .env dans $VPS_PATH" -ForegroundColor White
    Write-Host "   2. Variables requises: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET, etc." -ForegroundColor White
    Write-Host "   3. Demarrez le backend: cd $VPS_PATH puis npm start" -ForegroundColor White
    Write-Host "   4. Ou avec PM2: pm2 start ecosystem.config.js" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "==========================================" -ForegroundColor Red
    Write-Host "  Erreur lors du deploiement" -ForegroundColor Red
    Write-Host "==========================================" -ForegroundColor Red
    Write-Host ""
}

# Nettoyage local
Write-Host "Nettoyage local..." -ForegroundColor Yellow
if (Test-Path $TEMP_DIR) {
    Remove-Item -Recurse -Force $TEMP_DIR
}
if (Test-Path $archivePath) {
    Remove-Item $archivePath -Force
}
Write-Host "  Fichiers temporaires supprimes" -ForegroundColor Green
Write-Host ""
