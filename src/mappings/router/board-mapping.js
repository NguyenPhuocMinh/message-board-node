'use strict';

const BoardService = require('../../services/web-admin-board');

module.exports = [
  // create message board
  {
    pathName: '/boards',
    method: 'POST',
    methodName: 'createMessageBoard',
    serviceName: BoardService,
    input: {
      transform: function (req) {
        return {
          ...req.body
        }
      }
    },
    output: {
      transform: function (response) {
        return {
          body: response
        }
      }
    }
  },
  // get message boards
  {
    pathName: '/boards',
    method: 'GET',
    methodName: 'getMessageBoards',
    serviceName: BoardService,
    input: {
      transform: function (req) {
        return {
          params: req.query
        }
      }
    },
    output: {
      transform: function (response) {
        return {
          headers: {
            'X-Total-Count': response.total,
            'Access-Control-Expose-Headers': 'X-Total-Count'
          },
          body: { result: response.data, total: response.total }
        }
      }
    }
  },
  // get message board by id 
  {
    pathName: '/boards/:id',
    method: 'GET',
    methodName: 'getMessageBoardById',
    serviceName: BoardService,
    input: {
      transform: function (req) {
        return {
          id: req.params.id
        }
      }
    },
    output: {
      transform: function (response) {
        return {
          body: response
        }
      }
    }
  },
]