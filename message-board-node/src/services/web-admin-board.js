'use strict';

const server = require('exp-server');
const Promise = server.require('bluebird');
const lodash = server.require('lodash');
const dataStore = server.dataStore;
const returnCodes = server.returnCodes;
const errorCodes = require('../../config/dev/errorCodes');
const { get, isEmpty, assign } = lodash;

function BoardService() {
  // create
  this.createMessageBoard = async function (args, opts = {}) {
    const { loggingFactory, requestId } = opts;

    try {
      loggingFactory.debug(`function createMessageBoard begin`, {
        requestId: `${requestId}`
      });

      await validateAndSanitizeArgs(args);

      const data = await dataStore.create({
        type: 'BoardModel',
        data: args
      });

      const response = convertDataBoard(data)

      loggingFactory.debug(`function createMessageBoard end`, {
        requestId: `${requestId}`
      });

      return { id: response.id, message: 'Đã đăng ký' }
    } catch (err) {
      loggingFactory.error(`function createMessageBoard has error : ${err}`, {
        requestId: `${requestId}`,
      });
      return Promise.reject(err);
    }
  };
  // get all
  this.getMessageBoards = async function (args, opts = {}) {
    const { loggingFactory, requestId } = opts;

    try {
      loggingFactory.debug(`function getMessageBoards begin`, {
        requestId: `${requestId}`
      });

      const params = args.params;
      const skip = parseInt(params._start) || 0;
      let limit = parseInt(params._end) || 1000;
      limit = limit - skip;

      const boards = await dataStore.find({
        type: 'BoardModel',
        filter: { deleted: false },
        projection: {
          __v: 0
        },
        options: {
          sort: { registerDate: -1 },
          skip: skip,
          limit: limit
        }
      });

      const data = await convertDataResponse(boards)

      const total = await dataStore.count({
        type: 'BoardModel',
        filter: { deleted: false }
      })

      loggingFactory.debug(`function getMessageBoards end`, {
        requestId: `${requestId}`
      });

      return { data: data, total: total };

    } catch (err) {
      loggingFactory.error(`function getMessageBoards has error : ${err}`, {
        requestId: `${requestId}`
      })
      return Promise.reject(err);
    }
  };
  // get by id
  this.getMessageBoardById = async function (args, opts = {}) {
    const { loggingFactory, requestId } = opts;
    try {
      loggingFactory.debug(`function getMessageBoardById begin`, {
        requestId: `${requestId}`
      });
      const boardId = args.id;

      if (isEmpty(boardId)) {
        return Promise.reject(returnCodes(errorCodes, 'IdNotFound'));
      }

      const board = await dataStore.get({
        type: 'BoardModel',
        id: boardId
      });

      const response = await convertDataBoard(board);

      loggingFactory.debug(`function getMessageBoardById begin`, {
        requestId: `${requestId}`
      });

      return { data: response };
    } catch (err) {
      loggingFactory.error(`function getMessageBoardById has error : ${err}`, {
        requestId: `${requestId}`,
      });
      return Promise.reject(err);
    }
  }
};

async function validateAndSanitizeArgs(args) {

  if (isEmpty(args)) {
    return Promise.reject(returnCodes(errorCodes, 'ArgsNotFound'));
  }

  const registerDate = get(args, 'registerDate');
  const title = get(args, 'title');
  const name = get(args, 'name');
  const text = get(args, 'text');

  if (isEmpty(registerDate?.toString())) {
    return Promise.reject(returnCodes(errorCodes, 'DateIsEmpty'))
  }

  if (isEmpty(title)) {
    return Promise.reject(returnCodes(errorCodes, 'TitleIsEmpty'));
  } else {
    if (isEmpty(title.trim())) {
      return Promise.reject(returnCodes(errorCodes, 'TileHasSpace'));
    }
    if (title.length > 100) {
      return Promise.reject(returnCodes(errorCodes, 'TitleIsOverLength'));
    }
  }

  if (isEmpty(name)) {
    return Promise.reject(returnCodes(errorCodes, 'NameIsEmpty'));
  } else {
    if (isEmpty(name.trim())) {
      return Promise.reject(returnCodes(errorCodes, 'NameHasSpace'));
    }
    if (name.length > 50) {
      return Promise.reject(returnCodes(errorCodes, 'NameIsOverLength'));
    }
  }

  if (isEmpty(text)) {
    return Promise.reject(returnCodes(errorCodes, 'TextIsEmpty'));
  } else {
    if (isEmpty(text.trim())) {
      return Promise.reject(returnCodes(errorCodes, 'TextHasSpace'));
    }
    if (text.length > 1000) {
      return Promise.reject(returnCodes(errorCodes, 'TextIsOverLength'));
    }
  }

  assign(args, {
    title: title.trim(),
    name: name.trim(),
    text: text.trim(),
  })

  return args;
}

async function convertDataResponse(boards) {
  return Promise.map(boards, (board, index) => {
    return convertDataBoard(board, index);
  }, { concurrency: 5 });
};

function convertDataBoard(board, index) {
  const response = {};
  if (!isEmpty(board)) {
    board = board.toJSON();
    response.id = board._id;
    response.registerDate = board.registerDate;
    response.title = board.title;
    response.name = board.name;
    response.text = board.text;
    response.index = index;

    delete board._id;

    return response;
  } else {
    return Promise.resolve();
  }
};

exports = module.exports = new BoardService();