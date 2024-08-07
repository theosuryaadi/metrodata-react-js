import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import AdooptedPetContext from "./AdoptedPetContext.js";
import fetchSearch from "./fetchSearch.js";
import useBreedList from "./useBreedList";
import Results from "./Results.jsx";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SeacrhParam = () => {
  const [adoptedPet] = useContext(AdooptedPetContext);

  const [animal, setAnnimal] = useState("");
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <>
      <div className="search-params">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const obj = {
              // buat object untuk menampung value dari form inputan
              animal: formData.get("animal") ?? "",
              breed: formData.get("breed") ?? "",
              location: formData.get("location") ?? "",
            };
            //ngeset request params dengan object diatas
            setRequestParams(obj);
          }}
        >
          {adoptedPet ? (
            <div>
              <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
            </div>
          ) : null}
          <label htmlFor="location">
            location
            <input
              type="text"
              id="location"
              // value={location}
              placeholder="location"
              name="location"
            />
          </label>
          <label htmlFor="animal">
            Animal
            <select
              id="animal"
              // value={animal}
              name="animal"
              onChange={(e) => {
                setAnnimal(e.target.value);
                // setBreed("");
              }}
              onBlur={(e) => {
                setAnnimal(e.target.value);
                // setBreed("");
              }}
            >
              <option />
              {ANIMALS.map((animal) => (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="breed">
            Breed
            <select
              disabled={!breeds.length}
              id="breed"
              // value={breed}
              name="breed"
              // onChange={(e) => setBreed(e.target.value)}
              // onBlur={(e) => setBreed(e.target.value)}
            >
              <option />
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </label>
          <button>Submit</button>
        </form>
        <Results pets={pets} />
      </div>
    </>
  );
};

export default SeacrhParam;
