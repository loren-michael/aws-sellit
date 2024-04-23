import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ItemCard from './ItemCard'
import FilterMenu from './FilterMenu';

const ItemsContainer = () => {
  const items = useSelector(store => store.items)
  const [filterCategory, setFilterCategory] = useState("All")
  const [displayItems, setDisplayItems] = useState([])

  useEffect(() => {
    setDisplayItems(items.items)
  }, [items])

  useEffect(() => {
    if (filterCategory === "All") {
      const allItems = items.items
      setDisplayItems(allItems)
    } else {
      const filterItems = items.items.filter(item => item.category === filterCategory)
      setDisplayItems(filterItems)
    }
  }, [filterCategory])


  return (
    <div id="background-color">
      <div>
        <FilterMenu setFilterCategory={setFilterCategory} />
        <br></br>
      </div>
      <br></br>
      <div class="ui cards centered">
        {displayItems.map(item => {
          return (
            <ItemCard item={item} key={item.id} />
          )
        })}
      </div>
    </div>
  )
}

export default ItemsContainer