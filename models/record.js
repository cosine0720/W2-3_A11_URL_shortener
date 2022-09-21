const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  input: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  output: {
    type: String, 
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)
