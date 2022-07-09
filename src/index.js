import postCrashes from "./jobs/postCrashes.js";

async function main() {
  console.log("Initialized");
  console.log("------------------------");

  console.log("Running postCrashes...");
  await postCrashes();

  console.log("------------------------");
  console.log("Run complete");
}

main();
