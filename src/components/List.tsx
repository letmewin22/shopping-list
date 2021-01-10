import React, {useState, useEffect} from 'react'
import {Observer} from 'mobx-react-lite'
import ListItem from './ListItem'
import appLoader from '../store/appLoader'
import {Loader} from './Loader'
import {useListContext} from '../context/ListContext'
import { IListItem } from '../interfaces/IListItem'

const List = () => {
  const {shoppingList} = useListContext()
  const [itemsList, setItemsList] = useState([] as IListItem[])

  useEffect(() => {
    const getItems = async() => {
      await shoppingList.getItems()
      setItemsList(shoppingList.list)
      appLoader.setLoader(false)
    }
    getItems()
  }, [shoppingList])

  useEffect(() => {
    setItemsList(shoppingList.list)
  }, [shoppingList.list])

  const toggleCheckHandler = async (el: IListItem) => {
    await shoppingList.toggleCheckItem(el)
    setItemsList(shoppingList.list)
  }

  const removeHandler = async (el: IListItem) => {
    await shoppingList.removeItem(el)
    setItemsList(shoppingList.list)
  }


  return (
    <Observer>
      {() => (
        <ul className='list-group shopping-list'>
          {appLoader.loading && (<Loader/>)}
          {itemsList.map(el => (
            <ListItem 
            key={el._id} 
            el={el} 
            toggle={toggleCheckHandler} 
            remove={removeHandler} 
            />
          ))}
          {!itemsList.length && !appLoader.loading && (
            <span>Список покупок пуст</span>
          )}
        </ul>
      )}
    </Observer>
  )
}

export default List
