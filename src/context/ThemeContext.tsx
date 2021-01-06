import { createContext } from "react";

const ThemeContext = createContext<[string, (theme:string) => void ]>(["green", () => {return}]);

export default ThemeContext;
