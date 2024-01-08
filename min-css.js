const minify = require("@node-minify/core");
const cleanCSS = require("@node-minify/clean-css");

const sourceFolder = "original/css"; // The folder where the source CSS files are located
const outputFolder = "minimized/css"; //  A folder where to save minified CSS files

// An array of CSS files to minify
const cssFiles = [
  "example.css", // Add other files as needed
];

// Minimize CSS files and save them in the specified folder
cssFiles.forEach((file) => {
  minify({
    compressor: cleanCSS,
    input: `${sourceFolder}/${file}`,
    output: `${outputFolder}/${file}`,
    callback: (err, min) => {
      if (err) {
        console.error(`File minification error ${file}: ${err}`);
      } else {
        console.log(`File ${file} successfully minified.`);
      }
    },
  });
});
