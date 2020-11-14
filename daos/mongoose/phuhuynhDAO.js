require('../../utils/MongooseUtil.js');
var Models = require('../../models/Models.js');
var phuhuynhDAO = {
  async selectByEmailAndPassword(email, password) {
    var query = { email: email, matkhau: password };
    var phuhuynh = await Models.phuhuynh.findOne(query);
    return phuhuynh;
  }
};
module.exports = phuhuynhDAO;