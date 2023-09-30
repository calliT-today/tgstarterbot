export const apps = [
  {
    name: 'tgbot',
    script: './index.js',
    instances: 1,
    exec_mode: 'cluster',
    autorestart: true,
    watch: true,
    max_restarts: 5,
    restart_delay: 1000,
  },
];
