var mongoose = require('mongoose');

// schemas
var phuhuynhSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tennguoidung: String,
  matkhau: String,
  email: String,
  nghenghiep: String,
  namsinh: Number,
  thanhpho: String,
  quan: String
}, { versionKey: false });

var treemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ten: String,
  gioitinh: Boolean,
  namsinh: Number,
  tuansinh: Number,
  sothangtuoi: Number,
  ketquachuandoan: String,
  noichuandoan: String,
  nguoichuandoan: String,
  idPhuHuynh: mongoose.Schema.Types.ObjectId
}, { versionKey: false });

// models
var phuhuynh = mongoose.model('phuhuynh', phuhuynhSchema);
var treem = mongoose.model('treem', treemSchema);
module.exports = { phuhuynh, treem };