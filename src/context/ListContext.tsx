import React from 'react'
import ShoppingList from '../store/ShoppingList.store'

type ListContentValue = {
  shoppingList: ShoppingList
}

const ListContext = React.createContext<ListContentValue>(
  {} as ListContentValue
)

const shoppingList = new ShoppingList()

export const ListContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <ListContext.Provider value={{shoppingList}}>
      {children}
    </ListContext.Provider>
  )
}

export const useListContext = () => React.useContext(ListContext)