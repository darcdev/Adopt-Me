import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./hooks/useDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle , WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  useEffect(async () => {
    setBreeds([]);
    setBreed("");
    try {
      let { breeds } = await pet.breeds(animal);
      let breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    } catch (e) {
      console.log("Error has ocurred", e);
    }
  }, [animal]);

  return (
    <div className="search-params">
      <form>
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

        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
