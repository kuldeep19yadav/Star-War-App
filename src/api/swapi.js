//  function for fetching a list of Star Wars characters from  SWAPI API.
//  Page parameter is for pagination.
export async function fetchPeople(page = 1) {
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  if (!response.ok) throw new Error("Failed to fetch people");
  const data = await response.json();
  return data;
}
