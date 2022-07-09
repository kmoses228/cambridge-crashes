import fetch from "node-fetch";

export const fetchCrashes = async (isoDateSince) => {
  const query = `(cyclists > 0 OR pedestrians > 0) AND motorists > 0 AND datetime > "${isoDateSince}"`;
  return fetch(
    "https://data.cambridgema.gov/resource/h6fp-bp8s.json?" +
      new URLSearchParams({
        $where: query,
      })
  ).then((response) => response.json());
};
