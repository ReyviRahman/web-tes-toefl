// models/paketSoal.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const Soal = require('./soal');
const Question = require('./question'); // Tambahkan ini

class PaketSoal extends Model {}

PaketSoal.init({
  nama_paket: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('siap', 'belum'),
    allowNull: false,
    defaultValue: 'belum',
  }
}, {
  sequelize,
  modelName: 'PaketSoal',
  tableName: 'paket_soals',
});

// Relasi
PaketSoal.hasMany(Soal, { foreignKey: 'paket_soal_id', as: 'soals' });
Soal.belongsTo(PaketSoal, { foreignKey: 'paket_soal_id', as: 'paketSoal' });

// Relasi ke Question
PaketSoal.hasMany(Question, { foreignKey: 'paket_soal_id', as: 'questions' });
Question.belongsTo(PaketSoal, { foreignKey: 'paket_soal_id', as: 'paketSoal' });

module.exports = PaketSoal;
