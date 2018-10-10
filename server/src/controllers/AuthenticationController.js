const {users,groups} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await users.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.error(err)
      res.send({
        error: "NIK sudah terdaftar"
      })
    }
  },
  async login (req, res) {
    try {
      const {nik, password} = req.body
      const user = await users.findOne({
        where: {
          nik: nik
        },
        include: [
          {model: groups}
        ]
      })
      
      if (!(user instanceof Object)) {
        return res.send({
          error: 'NIK belum terdaftar'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.send({
          error: 'Password yang anda masukkan salah'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.send({
        error: 'Ada kesalahan sistem'
      })
      console.error(err)
    }
  }
}
