import React, { useState } from 'react';
import DoneCard from '../../components/DoneCard';
import Header from '../../components/Header';

export default function DoneRecipes() {
  const [type, setType] = useState('all');

  const mealsButton = () => {
    setType('meal');
  };

  const drinksButton = () => {
    setType('drink');
  };

  const allButton = () => {
    setType('all');
  };

  return (
    <div>
      <Header title="Done Recipes" renderSearchBtn={ false } />
      <button
        onClick={ allButton }
        data-testid="filter-by-all-btn"
      >
        all
      </button>
      <button
        onClick={ mealsButton }
        data-testid="filter-by-meal-btn"
      >
        meals
      </button>
      <button
        onClick={ drinksButton }
        data-testid="filter-by-drink-btn"
      >
        drinks
      </button>

      <DoneCard type={ type } />
    </div>
  );
}
