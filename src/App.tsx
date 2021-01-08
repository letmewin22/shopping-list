import React, {useState, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import shoppingList from './store/shoppingList'
import appLoader from './store/appLoader'
import List from './components/List'
import {keysGenerator} from './utils/keysGenerator'
import {IListItem} from './interfaces/IListItem'
import './App.css'

const App = () => {
  const [input, setInput] = useState('')

  useEffect(() => {
    shoppingList.getItems()
    appLoader.setLoader(false)
  }, [])

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const createNewItem = () => {
    const newItem: IListItem = {
      _id: keysGenerator(8),
      checked: false,
      value: input,
    }

    shoppingList.addItem(newItem)
    setInput('')
  }

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createNewItem()
    }
  }

  return (
    <div className='App'>
      <h1>Список покупок</h1>
      <div className='add-item-input'>
        <input
          value={input}
          onKeyDown={keyPressHandler}
          onChange={onChangeHandler}
          className='form-control list-input'
          type='text'
          placeholder='Введи что нужно купить'
          aria-label='input'
        />
        <button onClick={createNewItem} type='button' className='btn btn-primary add-btn'>
          <i className="bi bi-plus"></i>
        </button>
      </div>
      <List />
    </div>
  )
}

export default observer(App)
