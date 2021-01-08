import {makeAutoObservable} from 'mobx'
import {IListItem} from '../interfaces/IListItem'

class ShoppingList {
  list: IListItem[] = []

  constructor() {
    makeAutoObservable(this)
  }

  addItem(newItem: IListItem) {
    this.list = [...this.list, newItem]
    this.setItems()
  }

  removeItem(el: IListItem) {
    this.list = this.list.filter(item => item !== el)
    this.setItems()
  }

  toggleCheckItem(el: IListItem) {
    this.list = this.list.map(item => {
      if (item === el) {
        !item.checked ? (item.checked = true) : (item.checked = false)
      }
      return item
    })
    this.setItems()
  }

  getItems() {
    this.list = JSON.parse(localStorage.getItem('shopping-list') || '[]')
    this.setItems()
  }

  setItems() {
    localStorage.setItem('shopping-list', JSON.stringify(this.list))
  }
}

export default new ShoppingList()
