const rc = require('rc');

const defaultConfig = {
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'postgres',
    password: 'postgres',
    database: 'servers',
  },
  minio: {
    endPoint: '127.0.0.1', //diganti
    port: 9001,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
  },
  nats: {
    hostname: 'localhost',
    port: '8222',
  },
  kv: {
    hostname: 'localhost',
    port: '6379',
  },
  server: {
    port: {
      worker: 7001,
      task: 7002,
      performance: 7003,
    },
  },
};

const config = rc('server', defaultConfig);

module.exports = {
  config,
};
