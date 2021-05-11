'use strict';

const errorCodes = [
  {
    nameCode: 'DateIsEmpty',
    messageCode: 'Ngày không được để trống',
    returnCode: 1,
    statusCode: 400,
  },
  {
    nameCode: 'TitleIsEmpty',
    messageCode: 'Title không được để trống',
    returnCode: 2,
    statusCode: 400,
  },
  {
    nameCode: 'NameIsEmpty',
    messageCode: 'Name không được để trống',
    returnCode: 3,
    statusCode: 400,
  },
  {
    nameCode: 'TextIsEmpty',
    messageCode: 'Text không được để trống',
    returnCode: 4,
    statusCode: 400,
  },
  {
    nameCode: 'TileHasSpace',
    messageCode: 'Vui lòng không nhập khoảng trống cho tiêu đề',
    returnCode: 5,
    statusCode: 400,
  },
  {
    nameCode: 'NameHasSpace',
    messageCode: 'Vui lòng không nhập khoảng trống cho tên',
    returnCode: 6,
    statusCode: 400,
  },
  {
    nameCode: 'TextHasSpace',
    messageCode: 'Vui lòng không nhập khoảng trống cho nội dung',
    returnCode: 7,
    statusCode: 400,
  },
  {
    nameCode: 'ArgsNotFound',
    messageCode: 'Vui lòng điền đầy đủ thông tin',
    returnCode: 8,
    statusCode: 400,
  },
  {
    nameCode: 'TitleIsOverLength',
    messageCode: 'Tiêu đề không vượt quá 100 kí tự',
    returnCode: 9,
    statusCode: 400,
  },
  {
    nameCode: 'NameIsOverLength',
    messageCode: 'Tên không vượt quá 50 kí tự',
    returnCode: 10,
    statusCode: 400,
  },
  {
    nameCode: 'TextIsOverLength',
    messageCode: 'Nội dung không vượt quá 1000 kí tự',
    returnCode: 11,
    statusCode: 400,
  },
  {
    nameCode: 'IdNotFound',
    messageCode: 'Không tìm thấy bảng tin đã chọn',
    returnCode: 12,
    statusCode: 400,
  },
]

module.exports = errorCodes;