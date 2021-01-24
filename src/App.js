import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/layout/layout';
// import FavoritesPage from '../src/containers/favorites-page/favorites-page';
// import HomePage from '../src/containers/home-page/home-page';

const asyncFavoritesPage = asyncComponent(() => {
  return import('../src/containers/favorites-page/favorites-page');
});

const asyncHomePage = asyncComponent(() => {
  return import('../src/containers/home-page/home-page');
});


function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/favorites-page" component={asyncFavoritesPage}/>
          <Route path="/" exact component={asyncHomePage}/>
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
