const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const User = require('./users');  // Import model User untuk asosiasi

class Surat extends Model {}

Surat.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  keperluanSurat: {
    type: DataTypes.STRING,
    allowNull: false      // Kolom ini juga wajib diisi
  },
  KTP: {
    type: DataTypes.STRING,  // Menyimpan path file KTP yang diupload
    allowNull: false         // Wajib diisi
  },
  KK: {
    type: DataTypes.STRING,   // Menyimpan path file KK yang diupload
    allowNull: false          // Wajib diisi
  },
  nik: {
    type: DataTypes.STRING,
    allowNull: false,         // Menentukan nik sebagai foreign key
    references: {
      model: User,            // Relasi ke model User
      key: 'nik'              // Mengacu ke kolom nik di model User
    }
  },
  status: {
    type: DataTypes.STRING,  // Menyimpan path file KTP yang diupload
  },
  keterangan: {
    type: DataTypes.STRING,  // Menyimpan path file KTP yang diupload
  },
}, {
  sequelize,
  modelName: 'Surat',
});

module.exports = Surat;
