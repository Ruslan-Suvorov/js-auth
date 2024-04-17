const { emit } = require('nodemon')

class Session {
  static #list = []

  constructor(user) {
    this.token = Session.generateToken(10)
    this.user = {
      email: user.email,
      isConfirm: user.isConfirm,
      role: user.role,
    }
  }

  static generateToken = (length) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let token = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * characters.length,
      )
      token += characters[randomIndex]
    }

    return token
  }

  static create = (user) => {
    const session = new Session(user)

    this.#list.push(session)

    return session
  }

  static get = (token) => {
    return (
      this.#list.find((item) => item.token === token) ||
      null
    )
  }
}

module.exports = { Session }

console.log(Session.generateToken(10))
