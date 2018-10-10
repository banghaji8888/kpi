const path = require('path')

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'coba',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost',
      timezone: '+07:00'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'rahasiaadalahsecret'
  }
}
