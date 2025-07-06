const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');

class Question extends Model {}

Question.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reading: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paket_soal_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'paket_soals',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Question',
  tableName: 'questions',
});

module.exports = Question;