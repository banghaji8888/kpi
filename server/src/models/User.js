const Promise = require('bluebird')
const crypto = Promise.promisifyAll(require('crypto'))

function hashPasswords (user, options) {
  if(!user.changed('password')) {
    return
  }
  var hashed = hashing(user.password)
  user.setDataValue('password', hashed)
}

function hashing(password){
  return crypto.createHash("sha256").update(password, "binary").digest("base64")
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    name: DataTypes.STRING(100),
    birth_place: DataTypes.STRING(100),
    birth_day: DataTypes.DATEONLY,
    gender: DataTypes.ENUM('Laki-laki','Perempuan'),
    last_qualification: DataTypes.STRING(100),
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    nik: {
      type: DataTypes.STRING(100),
      unique: true
    },
    address: DataTypes.TEXT,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: hashPasswords
    }
  }
  )

  User.prototype.comparePassword = function (password) {
    return (hashing(password) == this.password) ? true: false
  }

  return User
}
