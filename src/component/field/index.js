class FieldPassword {
  static toggle = (target) => {
    target.toggleAttribute('show')

    const input = target.previousElementSibling

    const type = input.getAttribute('type')

    if (type === 'password') {
      input.setAttribute('type', 'text')
    } else {
      input.setAttribute('type', 'password')
    }
  }
}

class FieldCheckbox {
  static toggle = (target) => {
    target.toggleAttribute('active')
  }
}

class FieldSelect {
  static toggle = (target) => {
    const options = target.nextElementSibling
    options.toggleAttribute('active')
    setTimeout(() => {
      window.addEventListener(
        'click',
        (e) => {
          if (!options.parentElement.contains(e.target)) {
            options.removeAttribute('active')
          }
        },
        { once: true },
      )
    })
  }

  static change = (target) => {
    const parent = target.parentElement.parentElement
    const list = target.parentElement
    const active = list.querySelector('*[active]')
    if (active) active.toggleAttribute('active')
    target.toggleAttribute('active')

    const value = parent.querySelector('.field__value')
    if (value) {
      value.innerText = target.innerText
      value.classList.remove('field__value--placeholder')
    }

    list.toggleAttribute('active')
  }
}

window.fieldPassword = FieldPassword
window.fieldCheckbox = FieldCheckbox
window.fieldSelect = FieldSelect
