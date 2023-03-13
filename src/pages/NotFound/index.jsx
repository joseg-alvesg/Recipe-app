import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import jacquinPessimo from '../../images/jacquinPessimo.jpg';

export default function NotFound() {
  return (
    <>
      <Header title="404" renderSearchBtn={ false } />
      <section>
        <h2>
          {`It's not too bad, but it's too bad:
          the page you've requested is not found.`}
        </h2>
        <img
          alt="Erick Jacquin saying It's not too bad, but it's too bad"
          src={ jacquinPessimo }
        />
      </section>
      <Footer />
    </>
  );
}
