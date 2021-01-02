import React from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";

const App = () => {
  return (
    <div>
      <h1 id="something-important">Adopt Me !</h1>
      <SearchParams />
    </div>
  );
};
//babel-eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

render(<App />, document.getElementById("root"));
