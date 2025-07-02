const {Model, DataTypes} = require('sequelize')
const sequelize = require('../db.config')
const Question = require('./question')

class Soal extends Model {}

Soal.init({
  soal: {
    type: DataTypes.STRING(4000),
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
  no_soal: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  jawaban: {
    type: DataTypes.STRING, 
    allowNull: false, 
  },
  page: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
  },
  audio: {
    type: DataTypes.STRING, 
    allowNull: false, 
  },
  q_reading: {
    type: DataTypes.INTEGER,
    references: {
      model: 'questions',
      key: 'id'
    },
    allowNull: false
  },
  paket_soal_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'paket_soals',  // Nama tabel yang di-referensikan
      key: 'id',
    },
    allowNull: false,  // Kolom ini tidak boleh null
  },
  kategori: {
    type: DataTypes.STRING(32),
    allowNull: false,
    defaultValue: 'listening',
  }
}, {
  sequelize,
  modelName: 'Soal',
  tableName: 'soals'
})

Soal.belongsTo(Question, { foreignKey: 'q_reading', as: 'readingQuestion' });

module.exports = Soal;