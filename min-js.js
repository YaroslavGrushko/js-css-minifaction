const fs = require("fs");
var UglifyJS = require("uglify-js");

const sourceFolder = "original/js"; // The folder where the source JS files are located
const outputFolder = "minimized/js"; // A folder where to save minified JS files

// An array of JS files to minify
const jsFiles = [
  "example-1.js",
  "example-2.js",
];

// Minimize JS files and save them in the specified folder
jsFiles.forEach((file) => {
  const inputFile = `${sourceFolder}/${file}`;

  const inputCode = fs.readFileSync(inputFile, "utf8");

  const minifiedCode = UglifyJS.minify(inputCode);

  const outputFile = `${outputFolder}/${file}`;

  fs.writeFileSync(outputFile, minifiedCode.code);
});
