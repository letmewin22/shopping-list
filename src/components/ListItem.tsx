import React from 'react'
import { Observer } from 'mobx-react-lite'
import {IListItem} from '../interfaces/IListItem'
import {useListContext} from '../context/ListContext'

type ListItemProps = {
  el: IListItem
}


const ListItem = ({el}: ListItemProps) => {
  const {shoppingList} = useListContext()

  console.log(shoppingList)

  return (
    <Observer>
      {() => (
        <li
          className={`list-group-item shopping-list__item ${
            el.checked && 'shopping-list__item--checked'
          }`}
        >
          <span>{el.value}</span>
          <div className='shopping-list__item-btns'>
            <button
              onClick={() => shoppingList.toggleCheckItem(el)}
              aria-label='done'
            >
              <i className='green bi bi-bag-check'></i>
            </button>
            <button
              onClick={() => shoppingList.removeItem(el)}
              aria-label='delete'
            >
              <i className='red bi bi-x-circle'></i>
            </button>
          </div>
        </li>
      )}
    </Observer>
  )
}

export default ListItem
