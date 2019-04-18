const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  apps: [{
      name: 'server',
      script: 'src/index.js',
      node_args: '-r esm',
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: isDev,
    },
    {
      name: 'worker',
      script: 'src/worker.js',
      node_args: '-r esm',
      instances: 1,
      autorestart: true,
      watch: isDev,
    }
  ],
};
