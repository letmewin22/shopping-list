import React, {useState} from 'react'
import {Observer} from 'mobx-react-lite'
import List from './components/List'
import {IListItem} from './interfaces/IListItem'
import './App.css'
import { useListContext } from './context/ListContext'

const App = () => {
  const [input, setInput] = useState('')
  const {shoppingList} = useListContext()


  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const createNewItem = async () => {
    const newItem: IListItem = {
      checked: false,
      value: input,
    }

    await shoppingList.addItem(newItem)
    setInput('')
  }

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createNewItem()
    }
  }

  return (
    <Observer>
    {() => (
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
    )}
    </Observer>
  )
}

export default App
