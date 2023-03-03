// TODO receber `title` das páginas onde Header for adicionado
// TODO receber `renderSearchBtn={ false }` das páginas que não devem exibir o Search Button
// ? de repente, usar um hook `useToggle()` no botão de pesquisa?

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../Button';

import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';

function Header({ title = 'TÍTULO PROVISÓRIO', renderSearchBtn = true }) {
  const [renderSearchBar, setRenderSearchBar] = useState(false);
  const history = useHistory();

  const toProfile = () => {
    history.push('/profile');
  };

  return (
    <header>
      <Button onClick={ toProfile }>
        <img
          alt="profile-icon"
          src={ profileIcon }
          data-testid="profile-top-btn"
        />
      </Button>
      <h1 data-testid="page-title">{title}</h1>
      {renderSearchBtn && (
        <Button
          onClick={ () => setRenderSearchBar(!renderSearchBar) }
        >
          <img
            alt="search-icon"
            src={ searchIcon }
            data-testid="search-top-btn"
          />
        </Button>
      )}
      {renderSearchBar && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  renderSearchBtn: PropTypes.bool,
  title: PropTypes.string,
}.isRequired;

export default Header;
