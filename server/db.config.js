const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('webrt', 'root', '', {
  dialect: 'mysql',
  host : 'localhost'
})

module.exports = sequelize