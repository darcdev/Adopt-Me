import React, { useState, lazy, Suspense, FunctionComponent } from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { Link, Router } from "@reach/router";
import SearchParams from "./components/SearchParams";
import store from './store';

const Details = lazy(() => import("./components/Details"));

const App : FunctionComponent = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
      <div>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>

          <Suspense fallback={<h1>Loading route...</h1>}>
            <Router>
              <SearchParams path="/" />
              <Details path="/details/:id" />
            </Router>
          </Suspense>
        </div>
      </Provider>
       
    </React.StrictMode>
  );
};
// babel-eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

render(<App />, document.getElementById("root"));
