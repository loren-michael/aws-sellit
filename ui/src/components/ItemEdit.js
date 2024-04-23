import React, { useState } from 'react';
import { updateItem } from '../actions/items';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ItemEdit = () => {
  const displayItem = useSelector(store => store.items.displayItem);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [item, setItem] = useState({
    title: displayItem.title,
    image: displayItem.image,
    description: displayItem.description,
    qty: displayItem.qty,
    category: displayItem.category,
    condition: displayItem.condition,
    make: displayItem.make,
    model: displayItem.model,
    price: displayItem.price
  });

  function resetForm() {
    setItem({
      title: "",
      image: "",
      description: "",
      qty: 1,
      category: "",
      condition: "",
      make: "",
      model: "",
      price: 0.00
    })
  };

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/items/" + displayItem.id, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(item)
    })
    .then(r => {
      if (r.ok)  {
        r.json()
        .then(item => {
          dispatch(updateItem(item))
          resetForm()
          navigate(`/items/${item.id}`)
        }
        )
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
  };

  return (
    <div>
      {errors.map(err => {
        return (
          <p className={errors ? "errmsg" : "offscreen"} aria-live="assertive">{err}</p>
        )
      })}
      <form className="add-item-form" onSubmit={handleSubmit}>
        <label htmlFor='title'> Title: </label>
        <input 
          type='text' 
          id="title" 
          value={ item.title }
          onChange={e => setItem({...item, title: e.target.value})}
        />
        <label htmlFor='image'> Image URL: </label>
        <input 
          type='text' 
          id="image" 
          value={ item.image }
          onChange={e => setItem({...item, image: e.target.value})}
        />
        <label htmlFor='description'> Description: </label>
        <textarea 
          type='text' 
          id="description" 
          value={ item.description }
          onChange={e => setItem({...item, description: e.target.value})}
        />
        <label htmlFor='qty'> Qty: </label>
        <input 
          type='text' 
          id="qty" 
          value={ item.qty }
          onChange={e => setItem({...item, qty: e.target.value})}
        />
        <label htmlFor='category'> Category: </label>
        <select required
          name="category"
          value={ item.category }
          onChange={e => setItem({...item, category: e.target.value})}
        >
          <option>Guitars</option>
          <option>Keyboards & Synth</option>
          <option>Drums & Percussion</option>
          <option>Folk Instruments</option>
          <option>Pedals & Amps</option>
          <option>Microphones</option>
          <option>Pro Audio</option>
          <option>Accessories</option>
        </select>
        <label htmlFor='condition'> Condition: </label>
        <select required
          name="condition"
          value={ item.condition }
          onChange={e => setItem({...item, condition: e.target.value})}
        >
          <option>New</option>
          <option>Used - Like New</option>
          <option>Used - Good</option>
          <option>Used - Fair</option>
          <option>Used - Poor</option>
        </select>
        <label htmlFor='make'> Make: </label>
        <input 
          type='text' 
          id="make" 
          value={ item.make }
          onChange={e => setItem({...item, make: e.target.value})}
        />
        <label htmlFor='model'> Model: </label>
        <input 
          type='text' 
          id="model" 
          value={ item.model }
          onChange={e => setItem({...item, model: e.target.value})}
        />
        <label htmlFor='price'> Price: </label>
        <input 
          type='text' 
          id="price" 
          value={ item.price }
          onChange={e => setItem({...item, price: e.target.value})}
        />
        <br></br>
        <button class=" bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit" value="Log In">Submit Changes</button>
      </form>
    </div>
  )
};

export default ItemEdit;