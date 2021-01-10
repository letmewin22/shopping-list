import React from 'react'
import { Observer } from 'mobx-react-lite'
import {IListItem} from '../interfaces/IListItem'

type ListItemProps = {
  el: IListItem,
  toggle: (el: IListItem) => Promise<void>
  remove: (el: IListItem) => Promise<void>
}


const ListItem = ({el, toggle, remove}: ListItemProps) => {

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
              onClick={toggle.bind(null, el)}
              aria-label='done'
            >
              <i className='green bi bi-bag-check'></i>
            </button>
            <button
              onClick={remove.bind(null, el)}
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
