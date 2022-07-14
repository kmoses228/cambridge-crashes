import moment from "moment";

export const getCrashLocation = (crash) => {
  let location = null;
  if (crash.address_number && crash.address_street) {
    location = `${crash.address_number} ${crash.address_street}`;
  } else if (crash.address_street) {
    location = crash.address_street;
  } else if (crash.intersection_street1 && crash.intersection_street2) {
    location = `${crash.intersection_street1} and ${crash.intersection_street2}`;
  }
  return location;
};

export const formatCrash = (crash) => {
  const crashTime = moment(crash.datetime);

  let victims = "an unknown victim";
  const numCyclists = Number.parseInt(crash.cyclists, 10);
  const numPeds = Number.parseInt(crash.pedestrians, 10);
  const numInjuries = Number.parseInt(crash.injuries, 10);
  const numHosp = Number.parseInt(crash.hospitalizations, 10);

  const cyclistsPart =
    numCyclists > 1 ? `${numCyclists} cyclists` : "a cyclist";
  const pedsPart = numPeds > 1 ? `${numPeds} pedestrians` : "a pedestrian";
  if (numCyclists > 0 && numPeds === 0) {
    victims = cyclistsPart;
  } else if (numCyclists > 0 && numPeds > 0) {
    victims = `${cyclistsPart} and ${pedsPart}`;
  } else if (numCyclists === 0 && numPeds > 0) {
    victims = pedsPart;
  }

  let neighborhood = "";
  if (crash.neighborhood) {
    neighborhood = ` in ${crash.neighborhood}`;
  }

  let location = getCrashLocation(crash) || "(location unspecified)";

  let injuries = "There were no reported injuries.";
  if (numInjuries > 0) {
    injuries = `${numInjuries} ${numInjuries === 1 ? "person" : "people"} ${
      numInjuries === 1 ? "was" : "were"
    } injured`;
  }

  let hospitalizations = "";
  if (numHosp > 0) {
    hospitalizations = ` and ${numHosp} ${
      numHosp === 1 ? "person" : "people"
    } ${numHosp === 1 ? "was" : "were"} transported to the hospital.`;
  }

  return `On ${crashTime.format("L")} at ${crashTime.format(
    "LT"
  )}, a motorist and ${victims} were involved in a collision${neighborhood} near ${location}. ${injuries}${hospitalizations}`;
};
