# js-css-minifaction
A simple Node.js application for minifying js and css files.

# Prerequests:
Node.js must be installed

# How to use:

1. Clone project;
2. In the root of project open terminal/cmd and run: **npm install**;

To minimize **js** file:
1. Put this js file (for example example-1.js) to **original/js** folder;
2. Open **min-js.js** file and specify desitred for minimization (for example example-1.js) in **jsFiles** array;
3. In the root of project open terminal/cmd and run: **node min-js.js**;
4. As result of comand above - minimized js file(s) are created in **minimized/js** folder

To minimize **css** file:
1. Put this js file (for example example.css) to **original/css** folder;
2. Open **min-css.js** file and specify desitred for minimization (for example example.css) in **cssFiles** array;
3. In the root of project open terminal/cmd and run: **node min-css.js**;
4. As result of comand above - minimized css file(s) are created in **minimized/css** folder
