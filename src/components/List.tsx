import React from 'react'
import { observer } from 'mobx-react-lite'
import ListItem from './ListItem'
import shoppingList from '../store/shoppingList'
import appLoader from '../store/appLoader'
import { Loader } from './Loader'

const List = () => {

  const { list } = shoppingList
  return (
    <ul className='list-group shopping-list'>
    {appLoader.loading && (<Loader/>)}
    {list.map(el => (
      <ListItem key={el._id} el={el} />
    ))}
    {!list.length && !appLoader.loading && (<span>Список покупок пуст</span>)}
  </ul>
  )
}

export default observer(List)
