const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');

class User extends Model {}

User.init({
  nik: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  nama: {
    type: DataTypes.STRING
  },
  ttl: {
    type: DataTypes.STRING
  },
  jk: {
    type: DataTypes.STRING
  },
  alamat: {
    type: DataTypes.STRING
  },
  agama: {
    type: DataTypes.STRING
  },
  statusPerkawinan: {
    type: DataTypes.STRING
  },
  pekerjaan: {
    type: DataTypes.STRING
  },
  profilePic: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING
  },
}, {
  sequelize,
  modelName: 'Users',
});

module.exports = User;
