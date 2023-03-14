import React, { useState } from 'react';
import DoneCard from '../../components/DoneCard';
import Header from '../../components/Header';
import style from './DoneRecipes.module.css';

export default function DoneRecipes() {
  const [type, setType] = useState('all');

  const filterButton = (filter) => setType(filter);

  return (
    <div>
      <Header title="Done Recipes" renderSearchBtn={ false } />
      <div className={ style.todosbotoes }>
        <button
          className={ style.botoes }
          onClick={ () => filterButton('all') }
          data-testid="filter-by-all-btn"
        >
          all
        </button>
        <button
          className={ style.botoes }
          onClick={ () => filterButton('meal') }
          data-testid="filter-by-meal-btn"
        >
          meals
        </button>
        <button
          className={ style.botoes }
          onClick={ () => filterButton('drink') }
          data-testid="filter-by-drink-btn"
        >
          drinks
        </button>
      </div>
      <DoneCard type={ type } />
    </div>
  );
}
