/* eslint-disable no-console */
const { execSync } = require("child_process");
const { existsSync, writeFileSync } = require("fs");

const packageJson = {
  name: "pokedex",
  version: "1.0.0",
  description: "",
  scripts: {
    start: "node ./server/*.js",
    keywords: [],
    author: "",
    license: "ISC",
  },
};
const procfileText = "web: npm run start";

const cwd = "./public";

console.log("Start building the app...");
execSync("npm run build");
console.log("Write new package.json and Procfile in public directory...");
writeFileSync("./public/package.json", JSON.stringify(packageJson));
writeFileSync("./public/Procfile", procfileText);

console.log("Check git exist");
if (!existsSync("./public/.git")) {
  console.log(
    "Git is not exist , init git repo and depoly to heroku. Please wait..."
  );
  execSync(
    "git init && git add . && git commit -m 'init public' && heroku create && git push heroku master -f",
    { cwd }
  );

  console.log("Finish deploy the project to heroku!");
} else {
  const commitMessage = process.argv[2];
  if (commitMessage) {
    console.log("Commit the project and deploy to heroku. please wait...");
    execSync(
      `git add . && git commit -m '${commitMessage}' && git push heroku master -f`,
      { cwd }
    );
    console.log("Finish deploy the project to heroku!");
  } else console.log("Please add commit message!");
}

