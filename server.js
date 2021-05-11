'use strict';

const server = require('exp-server');
const sandbox = require('./config/dev/sandbox');

if (require.main === module) {
  server.register(sandbox);
  server.start();
  server.connect_mongoose();
  server.mappingStore();
  require('./src/models');
  const stopped = function () {
    server.stop();
    server.disconnect_mongoose();
  };
  process.on('SIGINT', stopped);
  process.on('SIGQUIT', stopped);
  process.on('SIGTERM', stopped);
}
