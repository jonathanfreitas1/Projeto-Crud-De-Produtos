import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import CadastrarProduto from './pages/CadastrarProduto';
// import CadastrarProduto from './pages/CadastrarProduto/index';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
      <Route path="/cadastrarProduto" component={CadastrarProduto} />
    </Switch>
  );
}
