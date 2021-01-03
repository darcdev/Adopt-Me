import React from "react";
import { render } from "react-dom";
import { Link, Router } from "@reach/router";
import SearchParams from "./components/SearchParams";
import Details from "./components/Details";
const App = () => {
  return (
    <React.StrictMode>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>

        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </React.StrictMode>
  );
};
//babel-eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

render(<App />, document.getElementById("root"));
