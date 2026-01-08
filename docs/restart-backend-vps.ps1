# Redémarrage propre du backend sur VPS
# Station Service - Backend Restart

$VPS_HOST = "almalinux@vps-3b4fd3be.vps.ovh.ca"
$VPS_PASSWORD = "Offline2025"
$VPS_PATH = "~/station-service-backend"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Redémarrage Backend VPS" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Etape 1/4: Arrêt du backend..." -ForegroundColor Yellow

$sshCommands = @"
echo '=== Arrêt complet de PM2 ===' 
pm2 delete station-service-backend 2>/dev/null || echo 'Aucun processus PM2 à arrêter'

echo ''
echo '=== Vérification des processus Node sur port 3000 et 3001 ==='
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo 'Aucun processus sur port 3000'
lsof -ti:3001 | xargs kill -9 2>/dev/null || echo 'Aucun processus sur port 3001'

echo ''
echo '=== Processus arrêtés ==='
"@

$sshCommands = $sshCommands -replace "`r", ""
echo $VPS_PASSWORD | ssh $VPS_HOST $sshCommands

Write-Host "  Backend arrêté" -ForegroundColor Green
Write-Host ""

Write-Host "Etape 2/4: Transfert de la configuration..." -ForegroundColor Yellow
scp "C:\Users\MSP\Documents\Mahdi\station service projet\Backend\ecosystem.config.cjs" "${VPS_HOST}:${VPS_PATH}/ecosystem.config.cjs"

if ($LASTEXITCODE -eq 0) {
    Write-Host "  Configuration transférée" -ForegroundColor Green
} else {
    Write-Host "  Erreur lors du transfert" -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "Etape 3/4: Redémarrage avec la nouvelle configuration..." -ForegroundColor Yellow

$sshCommands = @"
echo '=== Vérification du fichier .env ==='
cd $VPS_PATH
if [ -f .env ]; then
    echo 'Fichier .env présent'
    grep PORT .env || echo 'PORT non défini dans .env'
else
    echo 'ATTENTION: Fichier .env manquant!'
    echo 'Création d un .env minimal...'
    echo 'PORT=3001' > .env
    echo 'NODE_ENV=production' >> .env
fi

echo ''
echo '=== Nettoyage complet des processus ==='
pkill -f 'node.*server.js' || echo 'Aucun processus Node server.js à tuer'
fuser -k 3000/tcp 2>/dev/null || echo 'Port 3000 libre'
fuser -k 3001/tcp 2>/dev/null || echo 'Port 3001 libre'

echo ''
echo '=== Démarrage du backend avec PM2 ==='
cd $VPS_PATH
pm2 start ecosystem.config.cjs --env production

echo ''
echo '=== Attente du démarrage (5 secondes) ==='
sleep 5

echo ''
echo '=== Status PM2 ==='
pm2 status
"@

$sshCommands = $sshCommands -replace "`r", ""
echo $VPS_PASSWORD | ssh $VPS_HOST $sshCommands

Write-Host ""

Write-Host "Etape 4/4: Vérification finale..." -ForegroundColor Yellow

$sshCommands = @"
echo '=== Logs récents (10 dernières lignes) ==='
pm2 logs station-service-backend --lines 10 --nostream

echo ''
echo '=== Test connexion backend ==='
sleep 2
curl -I http://localhost:3001/api 2>&1 | head -5

echo ''
echo '=== Processus écoutant sur les ports ==='
netstat -tlnp 2>/dev/null | grep -E ':(3000|3001)' || echo 'Commande netstat non disponible, utilisation de lsof'
lsof -i :3001 2>/dev/null | head -5 || echo 'Port 3001 libre ou lsof non disponible'
"@

$sshCommands = $sshCommands -replace "`r", ""
echo $VPS_PASSWORD | ssh $VPS_HOST $sshCommands

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  Redémarrage terminé!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Vérifications:" -ForegroundColor Cyan
Write-Host "  - Backend devrait écouter sur port 3001" -ForegroundColor White
Write-Host "  - Vérifiez les logs ci-dessus pour erreurs" -ForegroundColor White
Write-Host "  - Testez l'API: https://vps-3b4fd3be.vps.ovh.ca:4202/api" -ForegroundColor White
Write-Host ""
