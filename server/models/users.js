const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');

class User extends Model {}

User.init({
  nohp: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  nama: {
    type: DataTypes.STRING
  },
  profilePic: {
    type: DataTypes.STRING,
    defaultValue: 'uploads/profilepic/default-profile.png',
    allowNull: true
  },
  password: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING
  },
  start_time: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  end_time: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  lastScore: {
    type: DataTypes.INTEGER,
    defaultValue: -1,
    allowNull: true
  },
  listening: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  written: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  reading: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  sesi: {
    type: DataTypes.STRING,
    allowNull: true
  },
  listening_correct: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  written_correct: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  reading_correct: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status_ujian: {
    type: DataTypes.ENUM('idle', 'sedang_ujian'),
    defaultValue: 'idle'
  },
  paket_soal_id_aktif: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  paket_terakhir: {
    type: DataTypes.STRING
  },
}, {
  sequelize,
  modelName: 'Users',
  tableName: 'users'
});

module.exports = User;
