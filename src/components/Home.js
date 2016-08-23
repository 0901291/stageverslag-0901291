import React from 'react';
import { Link } from 'react-router';

const Home = () => {
  return (
    <section>
      <h1>This is a Redux starterkit!!!</h1>
      <Link to="about">Go to the about page with no actual information!</Link>
    </section>
  );
}

export default Home;
