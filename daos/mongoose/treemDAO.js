require('../../utils/MongooseUtil.js');
var Models = require('../../models/Models.js');
var treemDAO = {
  async selectByID(_id) {
    var category = await Models.Category.findById(_id).exec();
    return category;
  },
  async insert(hoso) {
    var mongoose = require('mongoose');
    hoso._id = new mongoose.Types.ObjectId();
    var result = await Models.treem.create(hoso);
    return result ? true : false;
  }
};
module.exports = treemDAO;