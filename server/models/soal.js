const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sesuaikan dengan konfigurasi database Anda

const Soal = sequelize.define('Soal', {
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
  answer: {
    type: DataTypes.STRING, 
    allowNull: false, 
  },
}, {
  timestamps: true, 
});

module.exports = Soal;
