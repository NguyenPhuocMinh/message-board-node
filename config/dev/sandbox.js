'use strict';

const mappings = require('../../src/mappings');

module.exports = {
  application: {
    pathServer: '/rest/api',
    enable: false,
    bridges: {
      connect: {
        serverInternees: {
          port: 7979,
          host: '0.0.0.0'
        },
        mongoose: {
          dataStore: {
            connect_options: {
              host: 'localhost',
              port: '27017',
              name: 'message-board',
            }
          }
        },
        mappingStore: {
          mappings: mappings,
        }
      },
    },
  },
}