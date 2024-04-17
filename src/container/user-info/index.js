import { List } from '../../script/list'
import { USER_ROLE } from '../../script/user'

class UserInfo extends List {
  constructor() {
    super()

    this.element = document.querySelector('#info')
    if (!this.element)
      throw new Error('Error! Elements is null.')

    // this.id = new URL(location.href).searchParams.get('id')
    // or
    this.id = new URLSearchParams(location.search).get('id')
    if (!this.id) location.assign('/user-list')

    this.loadData()
  }

  loadData = async () => {
    this.update(this.STATE.LOADING)

    // return null

    try {
      const res = await fetch(
        `/user-info-data?id=${this.id}`,
        {
          method: 'GET',
        },
      )

      const data = await res.json()

      if (res.ok) {
        this.update(
          this.STATE.SUCCESS,
          this.convertData(data),
        )
      } else {
        this.update(this.STATE.ERROR, data)
      }
    } catch (err) {
      this.update(this.STATE.ERROR, {
        message: err.message,
      })
    }
  }

  convertData = (data) => {
    return {
      ...data,
      user: {
        ...data.user,
        role: USER_ROLE[data.user.role],
        isConfirm: data.user.isConfirm ? 'Так' : 'Ні',
      },
    }
  }

  updateView = () => {
    this.element.innerHTML = ''

    switch (this.status) {
      case this.STATE.LOADING:
        this.element.innerHTML = `
        <div class="user-info sceleton">
            <span class="user-info__title">ID</span>
            <span class="user-info__sub"></span>
          </div>
          <div class="user-info sceleton">
            <span class="user-info__title">Пошта e-mail</span>
            <span class="user-info__sub"></span>
          </div>
          <div class="user-info sceleton">
            <span class="user-info__title">Роль</span>
            <span class="user-info__sub"></span>
          </div>
          <div class="user-info sceleton">
            <span class="user-info__title">Пошта перевірена</span>
            <span class="user-info__sub"></span>
          </div>
        `
        break
      case this.STATE.SUCCESS:
        const { id, email, role, isConfirm } =
          this.data.user
        this.element.innerHTML = `
          <div class="user-info">
            <span class="user-info__title">ID</span>
            <span class="user-info__sub">${id}</span>
          </div>
          <div class="user-info">
            <span class="user-info__title">Пошта e-mail</span>
            <span class="user-info__sub">${email}</span>
          </div>
          <div class="user-info">
            <span class="user-info__title">Роль</span>
            <span class="user-info__sub">${role}</span>
          </div>
          <div class="user-info">
            <span class="user-info__title">Пошта перевірена</span>
            <span class="user-info__sub">${isConfirm}</span>
          </div>
          `

        break
      case this.STATE.ERROR:
        this.element.innerHTML = `
          <span class="alert alert--error">${this.data.message}</span>
        `
        break
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!window.session || !window.session.user.isConfirm) {
    location.assign('/')
  }
  new UserInfo()
})
