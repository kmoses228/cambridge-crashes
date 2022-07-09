import axios from "axios";

class StaticMapsClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getStaticMap(markerLocation) {
    return axios
      .get(`https://maps.googleapis.com/maps/api/staticmap`, {
        params: {
          style: "feature:poi|visibility:off",
          markers: `color:red|1000 ${markerLocation}`,
          zoom: 16,
          size: "640x640",
          key: this.apiKey,
        },
        responseType: "arraybuffer",
      })
      .then((response) => Buffer.from(response.data, "binary"));
  }
}

export default StaticMapsClient;
