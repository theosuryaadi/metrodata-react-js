import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import fetchSearch from "./fetchSearch.js";
import useBreedList from "./useBreedList";
// import Pet from "./Pet.jsx";
import Results from "./Results.jsx";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SeacrhParam = () => {
  // const [location, setLocation] = useState("");
  const [animal, setAnnimal] = useState("");
  // const [breed, setBreed] = useState("");
  // const [pets, setPets] = useState([]);
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  // useEffect(() => {
  //   requestPets();
  // }, []);

  // async function requestPets() {
  //   const res = await fetch(
  //     `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  //   );
  //   const json = await res.json();
  //   setPets(json.pets);
  // }

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
          <label htmlFor="location">
            location
            <input
              type="text"
              id="location"
              // value={location}
              placeholder="location"
              name="location"
              // onChange={(e) => setLocation(e.target.value)}
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
