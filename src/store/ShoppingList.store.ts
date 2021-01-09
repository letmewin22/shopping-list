import {observable, action} from 'mobx'
import axios from 'axios'
import {IListItem} from '../interfaces/IListItem'

class ShoppingList {
  @observable list: IListItem[] = []

  @action
  addItem = async (newItem: IListItem) => {
    if (newItem.value.trim().length > 0) {
      const res = await axios.post('http://localhost:5000/api/list/', newItem)

      if (res.status === 201) {
        console.log(res)
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
    await axios.put(`http://localhost:5000/api/list/${el._id}`, {
      checked: !el.checked ? (el.checked = true) : (el.checked = false),
    })
    this.list = this.list.map(item => {
      if (item === el) {
        !item.checked ? (item.checked = true) : (item.checked = false)
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
