import React from 'react'
import {Observer} from 'mobx-react-lite'
import ListItem from './ListItem'
import appLoader from '../store/appLoader'
import {Loader} from './Loader'
import {useListContext} from '../context/ListContext'

const List = () => {
  const {shoppingList} = useListContext()

  return (
    <Observer>
      {() => (
        <ul className='list-group shopping-list'>
          {appLoader.loading && (<Loader/>)}
          {shoppingList.list.map(el => (
            <ListItem key={el._id} el={el} />
          ))}
          {!shoppingList.list.length && !appLoader.loading && (
            <span>Список покупок пуст</span>
          )}
        </ul>
      )}
    </Observer>
  )
}

export default List
