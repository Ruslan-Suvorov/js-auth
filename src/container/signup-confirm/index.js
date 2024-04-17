import { Form } from '../../script/form'
import {
  saveSession,
  getSessionToken,
  getSession,
} from '../../script/session'

class SignupConfirmForm extends Form {
  FIELD_NAME = {
    CODE: 'code',
  }
  FIELD_ERROR = {
    CODE: 'Ви ввели невірний код підтвердження!',
  }

  validate = (name, value) => {
    if (name === this.FIELD_NAME.CODE) {
      if (String(value).length !== 6) {
        return this.FIELD_ERROR.CODE
      }
    }
  }
  submit = async () => {
    if (this.disabled === true) {
      this.validateAll()
    } else {
      //====
      // console.log(this.value)
      this.setAlert('progress', 'Завантаження...')

      try {
        const res = await fetch('/signup-confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.convertData(),
        })

        const data = await res.json()

        if (res.ok) {
          this.setAlert('success', data.message)
          saveSession(data.session)
          location.assign('/')
        } else {
          this.setAlert('error', data.message)
        }
      } catch (error) {
        this.setAlert('error', error.message)
      }
    }
  }

  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.CODE]: Number(
        this.value[this.FIELD_NAME.CODE],
      ),
      token: getSessionToken(),
    })
  }
}

window.signupConfirmForm = new SignupConfirmForm()

document.addEventListener('DOMContentLoaded', () => {
  if (window.session) {
    if (window.session.user.isConfirm) {
      location.assign('/')
    }
  } else {
    location.assign('/')
  }

  document
    .querySelector('#renew')
    .addEventListener('click', (e) => {
      e.preventDefault()

      const session = getSession()

      location.assign(
        `/signup-confirm?renew=true&email=${session.user.email}`,
      )
    })
})
