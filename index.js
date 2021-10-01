const { readFileSync } = require("fs-extra");
const fg = require("fast-glob");
const replacer = require("replace-in-file");

async function run() {
  return Promise.all(
    fg
      .sync(["**/build.gradle"], {
        onlyFiles: true,
      })
      .map((path) => ({
        files: path,
        from: /jcenter\(\)/g,
        to: readFileSync(path)
          .toString()
          .match(/mavenCentral\(\)/)?.length
          ? ""
          : "mavenCentral()",
      }))
      .map((options) => replacer.replaceInFile(options))
  );
}

module.exports = run;
