export class List {
  STATE = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
  }

  status = null
  data = null
  element = null

  update = (status, data) => {
    this.status = status
    if (data) this.data = data
    this.updateView()
  }
}
