import { List } from '../../script/list'
import { USER_ROLE } from '../../script/user'

class UserList extends List {
  constructor() {
    super()

    this.element = document.querySelector('#list')
    if (!this.element)
      throw new Error('Error! Elements is null.')
    this.loadData()
  }

  loadData = async () => {
    this.update(this.STATE.LOADING)

    // return null

    try {
      const res = await fetch('/user-list-data', {
        method: 'GET',
      })

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
      list: data.list.map((user) => ({
        ...user,
        role: USER_ROLE[user.role],
        isConfirm: user.isConfirm ? 'Так' : 'Ні',
      })),
    }
  }

  updateView = () => {
    this.element.innerHTML = ''
    switch (this.status) {
      case this.STATE.LOADING:
        this.element.innerHTML = `
        <div class="user-list sceleton">
          <span class="user-list__title"></span>
          <span class="user-list__sub"></span>
        </div>
        <div class="user-list sceleton">
          <span class="user-list__title"></span>
          <span class="user-list__sub"></span>
        </div>
        <div class="user-list sceleton">
          <span class="user-list__title"></span>
          <span class="user-list__sub"></span>
        </div>
        <div class="user-list sceleton">
          <span class="user-list__title"></span>
          <span class="user-list__sub"></span>
        </div>
        `
        break
      case this.STATE.SUCCESS:
        this.data.list.forEach((user) => {
          this.element.innerHTML += `
            <a href="/user-info?id=${user.id}" class="user-list user-list--click">
              <span class="user-list__title">${user.email}</span>
              <span class="user-list__sub">${user.role}</span>
            </a>
          `
        })
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
  new UserList()
})
