import React, { useState, useEffect, useContext, FunctionComponent } from "react";
import {connect} from 'react-redux'
import pet, { Animal, ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "../hooks/useDropdown";
import { RouteComponentProps } from "@reach/router";
import changeTheme from '../actions/changeTheme';
import changeLocation from '../actions/changeLocation';

const SearchParams  : FunctionComponent<RouteComponentProps<{location : string , theme : string}>> = (props) => {
  const [breeds, setBreeds] = useState([] as string[]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([] as Animal[]);

  const {theme , location  ,  setTheme , setLocation} = props;

  async function requestPets() {
    const { animals } = await pet.animals({
      location ,
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

const mapStateToProps = ({theme , location}) => ({
  theme, location
})

const mapDispatchToProps = dispatch => ({
  setTheme : theme => dispatch(changeTheme(theme)),
  setLocation : location => dispatch(changeLocation(location))
})
export default connect(mapStateToProps , mapDispatchToProps)(SearchParams);
