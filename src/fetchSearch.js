async function fetchSearch({ queryKey }) {
  const { animal, location, breed } = queryKey[1]; //ini disebut destructuring untuk req params

  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!res.ok) {
    throw new Error("Gagal melakukan pencarian! Silakan coba lagi.");
  }

  return res.json();
}

export default fetchSearch;
