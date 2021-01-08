import {makeAutoObservable} from 'mobx'

class AppLoader {
  loading: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  setLoader(value: boolean) {
    this.loading = value
  }
}

export default new AppLoader()
