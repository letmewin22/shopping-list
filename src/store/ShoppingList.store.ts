import {observable, action} from 'mobx'
import axios from 'axios'
import {IListItem} from '../interfaces/IListItem'

const URL = 'https://mysterious-caverns-45772.herokuapp.com'

class ShoppingList {
  @observable.shallow list: IListItem[] = []

  @action
  addItem = async (newItem: IListItem) => {
    if (newItem.value.trim().length > 0) {
      try {
        const res = await axios.post(`${URL}/api/list/`, newItem)

        if (res.status === 201) {
          this.list = [...this.list, res.data.body]
        }
      } catch (e) {
        console.log(e.message)
      }
    }
  }

  @action
  removeItem = async (el: IListItem) => {
    try {
      await axios.delete(`${URL}/api/list/${el._id}`)
      this.list = this.list.filter(item => item !== el)
    } catch (e) {
      console.log(e.message)
    }
  }

  @action
  toggleCheckItem = async (el: IListItem) => {
    try {
      const res = await axios.put(`${URL}/api/list/${el._id}`, {
        checked: !el.checked ? (el.checked = true) : (el.checked = false),
      })

      this.list = this.list.map(item => {
        if (item._id === res.data._id) {
          return (item = res.data)
        }
        return item
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  @action
  getItems = async () => {
    try {
      const {data} = await axios.get(`${URL}/api/list/`)
      this.list = data
    } catch (e) {
      console.log(e.message)
    }
  }
}

export default ShoppingList
