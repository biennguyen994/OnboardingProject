import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchProduct } from './components/FetchProduct';
import { FetchCustomer } from './components/FetchCustomer';
import { FetchStore } from './components/FetchStore';
import { FetchSale } from './components/FetchSale';
export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
        <Route exact path='/' component={FetchCustomer} />
        <Route path='/fetch-customer' component={FetchCustomer} />
        <Route path='/fetch-sale' component={FetchSale} />
        <Route path='/fetch-product' component={FetchProduct} />
        <Route path='/fetch-store' component={FetchStore} />
      </Layout>
    );
  }
}
