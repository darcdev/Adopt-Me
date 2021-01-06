import React, { useState, useEffect, useContext, FunctionComponent } from "react";
import pet, { Animal, ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "../hooks/useDropdown";
import ThemeContext from "../context/ThemeContext";
import { RouteComponentProps } from "@reach/router";

const SearchParams  : FunctionComponent<RouteComponentProps> = () => {
  const [location, setLocation] = useState("Seattle , WA");
  const [breeds, setBreeds] = useState([] as string[]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([] as Animal[]);
  const [theme, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });
    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    const requestBreedsPet = async () => {
      try {
        const { breeds  : breedsPet} = await pet.breeds(animal);
        const breedStrings = breedsPet.map(({ name }) => name);
        setBreeds(breedStrings);
      } catch (e ) {
        console.log("Error has ocurred", e);
      }
    }
    requestBreedsPet();

  }, [animal]);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            name=""
            id=""
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
