const {Model, DataTypes} = require('sequelize')
const sequelize = require('../db.config')

class Soal extends Model {}

Soal.init({
  soal: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  pilihan_satu: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pilihan_dua: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pilihan_tiga: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pilihan_empat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jawaban: {
    type: DataTypes.STRING, 
    allowNull: false, 
  },
  
}, {
  sequelize,
  modelName: 'Soal'
})

module.exports = Soal
