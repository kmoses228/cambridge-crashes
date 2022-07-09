import fetch from "node-fetch";

class StaticMapsClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getStaticMap(markerLocation) {
    return fetch(
      "https://maps.googleapis.com/maps/api/staticmap?" +
        new URLSearchParams({
          style: "feature:poi|visibility:off",
          markers: `color:red|${markerLocation}`,
          zoom: 16,
          size: "640x640",
          key: this.apiKey,
        })
    ).then((response) => response.buffer());
  }
}

export default StaticMapsClient;
