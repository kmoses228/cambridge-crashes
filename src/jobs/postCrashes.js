import { getLastRunTime, setLastRunTime, getSecrets } from "../data/aws.js";
import { fetchCrashes } from "../data/openData.js";
import { EUploadMimeType, TwitterApi } from "twitter-api-v2";
import StaticMapsClient from "../data/googleMaps.js";
import { formatCrash, getCrashLocation } from "../utils/crashes.js";

const postCrashes = async () => {
  try {
    console.log("Fetching secrets");
    const secrets = await getSecrets();

    console.log("Fetching last run time");
    const lastRunTime = await getLastRunTime();

    console.log(`Fetching crash data since ${lastRunTime.Parameter.Value}`);
    const response = await fetchCrashes(lastRunTime.Parameter.Value);
    console.log(`Got ${response.length} results.`);

    if (response.length) {
      const twitterClient = new TwitterApi({
        appKey: secrets.twitter_app_key,
        appSecret: secrets.twitter_app_secret,
        accessToken: secrets.twitter_access_token,
        accessSecret: secrets.twitter_access_secret,
      });
      for (const crash of response.reverse()) {
        console.log(`Composing tweet...`);

        const crashLocation = getCrashLocation(crash);
        let mediaId;
        if (crashLocation) {
          console.log("Fetching map");
          const staticMapsClient = new StaticMapsClient(
            secrets.static_maps_key
          );
          const mapImgBuffer = await staticMapsClient.getStaticMap(
            `${crashLocation}, Cambridge, MA`
          );
          console.log("Uploading map");
          mediaId = await twitterClient.v1.uploadMedia(mapImgBuffer, {
            mimeType: EUploadMimeType.Png,
          });
        }

        console.log("Sending tweet");
        await twitterClient.v1.tweet(
          formatCrash(crash),
          mediaId
            ? {
                media_ids: mediaId,
              }
            : undefined
        );
        console.log("Tweet sent successfully!");
      }
      console.log("Updating last posted incident time:", response[0].datetime);
      await setLastRunTime(response[0].datetime);
      console.log("Updated successfully");
    } else {
      console.log("Nothing to post");
    }
  } catch (err) {
    console.error("Eror during postCrashes job:");
    console.error(err);
  } finally {
    console.log("postCrashes job complete");
  }
};

export default postCrashes;
