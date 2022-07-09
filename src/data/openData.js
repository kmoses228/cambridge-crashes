import axios from "axios";

export const fetchCrashes = async (isoDateSince) => {
  const query = `(cyclists > 0 OR pedestrians > 0) AND motorists > 0 AND datetime > "${isoDateSince}"`;
  return axios.get("https://data.cambridgema.gov/resource/h6fp-bp8s.json", {
    params: {
      $where: query,
    },
  });
};
