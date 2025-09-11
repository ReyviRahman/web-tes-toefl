const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');

class ExamHistory extends Model {}

ExamHistory.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userNohp: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  startedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  listeningScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  structureScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  readingScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  totalScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
  nama_paket: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  jawaban: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'ExamHistory',
  tableName: 'exam_histories',
  timestamps: true,
  underscored: true,
});

// Relasi dengan Users
const User = require('./users'); // pastikan path sesuai
ExamHistory.belongsTo(User, {
  foreignKey: 'userNohp',
  targetKey: 'nohp',
  as: 'user',
});

module.exports = ExamHistory;
