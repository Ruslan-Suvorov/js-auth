import {
  Form,
  REGEXP_EMAIL,
  REGEXP_PASSWORD,
} from '../../script/form'

class RecoveryConfirmForm extends Form {
  FIELD_NAME = {
    CODE: 'code',
    PASSWORD: 'password',
  }
  FIELD_ERROR = {
    CODE: 'Ви ввели невірний код підтвердження!',
    PASSWORD:
      'Мінімум 8 символів, включаючи мінімум 1 цифру! Лише латиниця!',
  }

  validate = (name, value) => {
    if (name === this.FIELD_NAME.CODE) {
      if (String(value).length !== 6) {
        return this.FIELD_ERROR.CODE
      }
    }
    if (name === this.FIELD_NAME.PASSWORD) {
      if (!REGEXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.PASSWORD
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
        const res = await fetch('/recovery-confirm', {
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
      [this.FIELD_NAME.CODE]: Number(
        this.value[this.FIELD_NAME.CODE],
      ),
      [this.FIELD_NAME.PASSWORD]:
        this.value[this.FIELD_NAME.PASSWORD],
    })
  }
}

window.recoveryConfirmForm = new RecoveryConfirmForm()
