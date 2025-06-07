const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db.config')

class Question extends Model {}

Question.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reading: {
    type: DataTypes.STRING(4000),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Question',
  tableName: 'questions',

})

module.exports = Question;