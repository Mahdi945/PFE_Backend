// =====================================================
// Configuration PM2 - Backend Station Service
// =====================================================

module.exports = {
  apps: [
    {
      name: 'station-service-backend',
      script: './server.js',
      
      // Mode
      instances: 1, // Une seule instance pour éviter conflits de ports
      exec_mode: 'fork', // Mode fork (pas de load balancing)
      
      // Variables d'environnement
      env: {
        NODE_ENV: 'development',
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      
      // Redémarrage automatique
      watch: false, // Ne pas surveiller les fichiers en production
      max_memory_restart: '500M', // Redémarrer si utilisation mémoire > 500MB
      
      // Logs
      error_file: '~/.pm2/logs/station-service-backend-error.log',
      out_file: '~/.pm2/logs/station-service-backend-out.log',
      log_file: '~/.pm2/logs/station-service-backend-combined.log',
      time: true, // Préfixer les logs avec timestamp
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Rotation des logs
      max_size: '10M',
      retain: 10,
      compress: true,
      
      // Comportement lors des erreurs
      autorestart: true, // Redémarrer automatiquement en cas de crash
      max_restarts: 10, // Nombre maximum de redémarrages en cas de crash répété
      min_uptime: '10s', // Temps minimum avant de considérer le démarrage réussi
      restart_delay: 4000, // Délai avant redémarrage (ms)
      
      // Gestion des signaux
      kill_timeout: 5000, // Temps d'attente avant SIGKILL (ms)
      wait_ready: true, // Attendre le signal ready
      listen_timeout: 10000, // Timeout pour le signal ready
      
      // Cron restart (optionnel - redémarrage quotidien à 3h du matin)
      cron_restart: '0 3 * * *',
      
      // Monitoring
      instance_var: 'INSTANCE_ID',
    }
  ],
  
  // Configuration du déploiement (optionnel)
  deploy: {
    production: {
      user: 'root',
      host: 'votre-ip-vps',
      ref: 'origin/main',
      repo: 'git@github.com:votre-repo/station-service.git',
      path: '/var/www/station-service/backend',
      'post-deploy': 'npm install --production && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'mkdir -p /var/log/station-service',
    }
  }
};
