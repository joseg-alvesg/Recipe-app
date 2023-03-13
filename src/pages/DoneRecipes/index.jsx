import React, { useState } from 'react';
import DoneCard from '../../components/DoneCard';
import Header from '../../components/Header';

export default function DoneRecipes() {
  const [type, setType] = useState('all');

  const filterButton = (filter) => setType(filter);

  return (
    <div>
      <Header title="Done Recipes" renderSearchBtn={ false } />
      <button
        onClick={ () => filterButton('all') }
        data-testid="filter-by-all-btn"
      >
        all
      </button>
      <button
        onClick={ () => filterButton('meal') }
        data-testid="filter-by-meal-btn"
      >
        meals
      </button>
      <button
        onClick={ () => filterButton('drink') }
        data-testid="filter-by-drink-btn"
      >
        drinks
      </button>

      <DoneCard type={ type } />
    </div>
  );
}
