import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import Loading from './Loading';

const Home = lazy(() => import('../pages/home/Home'));
const Ticketing = lazy(() => import('../pages/ticketing/Ticketing'));
const Checkout = lazy(() => import('../pages/checkout/Checkout'));

export default class App extends Component {
  public render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path='/checkout' exact={true} component={Checkout} />
            <Route path='/:eventUrl' component={Ticketing} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}
