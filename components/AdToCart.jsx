import React, { useState } from 'react';

const AddToCart = () => {
  // Stan komponentu do przechowywania ilości przedmiotów w koszyku
  const [cartCount, setCartCount] = useState(0);

  // Funkcja do dodawania przedmiotów do koszyka
  const addToCart = () => {
    // Zwiększ ilość przedmiotów w koszyku o 1
    setCartCount(cartCount + 1);
  };

  return (
    <div>
      <h2>Przedmioty w koszyku: {cartCount}</h2>
      <button onClick={addToCart}>Dodaj do koszyka</button>
    </div>
  );
};

export default AddToCart;
