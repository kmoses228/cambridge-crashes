import AWS from "aws-sdk";
AWS.config.update({ region: "us-east-1" });

const SSM = new AWS.SSM();

const LAST_POST_PARAMETER = "cambridge_crashes_last_post";

export const getSecrets = async () => {
  const params = {
    Names: [
      "twitter_access_secret",
      "twitter_access_token",
      "twitter_app_key",
      "twitter_app_secret",
      "static_maps_key",
    ],
    WithDecryption: true,
  };
  return new Promise((resolve, reject) => {
    SSM.getParameters(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          data.Parameters.reduce(
            (acc, param) => ({
              ...acc,
              [param.Name]: param.Value,
            }),
            {}
          )
        );
      }
    });
  });
};

export const getLastRunTime = async () => {
  const params = {
    Name: LAST_POST_PARAMETER,
  };
  return new Promise((resolve, reject) => {
    SSM.getParameter(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const setLastRunTime = async (isoLastRunTime) => {
  const params = {
    Name: LAST_POST_PARAMETER,
    Value: isoLastRunTime,
    Overwrite: true,
  };
  return new Promise((resolve, reject) => {
    SSM.putParameter(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
