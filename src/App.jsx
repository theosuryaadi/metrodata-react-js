import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import SeacrhParam from "./SearchParams";
import Details from "./Details";
import AdooptedPetContext from "./AdoptedPetContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdooptedPetContext.Provider value={adoptedPet}>
          <Link to="/">Peduli Hewan</Link>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SeacrhParam />} />
          </Routes>
        </AdooptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
