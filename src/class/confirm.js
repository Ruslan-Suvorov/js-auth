class Confirm {
  static #list = []

  constructor(data) {
    this.code = Confirm.generateCode()
    this.data = data
  }

  static generateCode = () =>
    Math.floor(Math.random() * 900000) + 100000

  static create = (data) => {
    this.#list.push(new Confirm(data))

    setTimeout(() => {
      this.delete(code)
    }, 15 * 60 * 1000)

    console.log(this.#list)
  }

  static delete = (code) => {
    this.#list = this.#list.filter(
      (item) => item.code !== code,
    )
  }

  static getData = (code) => {
    const confirm = this.#list.find(
      (item) => item.code === code,
    )
    return confirm ? confirm.data : null
  }
}

module.exports = { Confirm }
