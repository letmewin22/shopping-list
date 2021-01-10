import {observable, action} from 'mobx'
import axios from 'axios'
import {IListItem} from '../interfaces/IListItem'

class ShoppingList {
  @observable.shallow list: IListItem[] = []

  @action
  addItem = async (newItem: IListItem) => {
    if (newItem.value.trim().length > 0) {
      const res = await axios.post('http://localhost:5000/api/list/', newItem)

      if (res.status === 201) {
        this.list = [...this.list, res.data.body]
      }
    }
  }

  @action
  removeItem = async (el: IListItem) => {
    await axios.delete(`http://localhost:5000/api/list/${el._id}`)
    this.list = this.list.filter(item => item !== el)
  }

  @action
  toggleCheckItem = async (el: IListItem) => {
    const res = await axios.put(`http://localhost:5000/api/list/${el._id}`, {
      checked: !el.checked ? (el.checked = true) : (el.checked = false),
    })

    this.list = this.list.map(item => {
      if (item._id === res.data._id) {
        return (item = res.data)
      }
      return item
    })
  }

  @action
  getItems = async () => {
    const {data} = await axios.get('http://localhost:5000/api/list/')
    this.list = data
  }
}

export default ShoppingList
