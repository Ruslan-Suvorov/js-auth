import {
  Form,
  REGEXP_EMAIL,
  REGEXP_PASSWORD,
} from '../../script/form'

class SignupForm extends Form {
  FIELD_NAME = {
    EMAIL: 'email',
    PASSWORD: 'password',
    PADDWORD_AGAIN: 'passwordAgain',
    ROLE: 'role',
    IS_CONFIRM: 'isConfirm',
  }
  FIELD_ERROR = {
    IS_EMPTY: 'Поле має бути заповнене!',
    IS_BIG: 'Дуже довге значення!',
    EMAIL: 'Введіть коректну e-mail адресу!',
    PASSWORD:
      'Мінімум 8 символів, включаючи мінімум 1 цифру!',
    PADDWORD_AGAIN: 'Повторний пароль не збігається!',
    NOT_CONFIRM: 'Ви не погодились з правилами!',
    ROLE: 'Потрібно обрати роль',
  }

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }
    if (String(value).length > 30) {
      return this.FIELD_ERROR.IS_BIG
    }
    if (name === this.FIELD_NAME.EMAIL) {
      if (!REGEXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL
      }
    }
    if (name === this.FIELD_NAME.PASSWORD) {
      if (!REGEXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.PASSWORD
      }
    }
    if (name === this.FIELD_NAME.PADDWORD_AGAIN) {
      if (
        String(value) !==
        this.value[this.FIELD_NAME.PASSWORD]
      ) {
        return this.FIELD_ERROR.PADDWORD_AGAIN
      }
    }

    if (name === this.FIELD_NAME.ROLE) {
      if (isNaN(value)) {
        return this.FIELD_ERROR.ROLE
      }
    }

    if (name === this.FIELD_NAME.IS_CONFIRM) {
      if (!Boolean(value)) {
        return this.FIELD_ERROR.NOT_CONFIRM
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
        const res = await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.convertData(),
        })

        const data = await res.json()

        if (res.ok) {
          this.setAlert('success', data.message)
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
      [this.FIELD_NAME.EMAIL]:
        this.value[this.FIELD_NAME.EMAIL],
      [this.FIELD_NAME.PASSWORD]:
        this.value[this.FIELD_NAME.PASSWORD],
      [this.FIELD_NAME.ROLE]:
        this.value[this.FIELD_NAME.ROLE],
    })
  }
}

window.signupForm = new SignupForm()
