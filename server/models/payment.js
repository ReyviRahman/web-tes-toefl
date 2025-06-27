// models/payment.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');

class Payment extends Model {}

Payment.init({
  userNohp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paket_soal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  buktiBayar: {
    type: DataTypes.STRING, // Path atau filename bukti bayar
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'rejected'),
    defaultValue: 'pending',
  },
}, {
  sequelize,
  modelName: 'Payment',
  tableName: 'payments',
  timestamps: true,
  underscored: true,
});

// import User *setelah* Payment di-init, untuk menghindari circular
const User = require('./users');

// definisikan kedua sisi relasi di sini
Payment.belongsTo(User, {
  foreignKey: 'userNohp',
  targetKey:  'nohp'
});
User.hasMany(Payment, {
  foreignKey: 'userNohp',
  sourceKey:  'nohp'
});

module.exports = Payment;
