import React, { useState, lazy, Suspense } from "react";
import { render } from "react-dom";
import { Link, Router } from "@reach/router";
import SearchParams from "./components/SearchParams";
import ThemeContext from "./context/ThemeContext";

const Details = lazy(() => import("./components/Details"));

const App = () => {
  const themeHook = useState("darkblue");
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
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
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};
//babel-eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

render(<App />, document.getElementById("root"));
