const fs = require("fs");

const templateHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <style>{{styles}}</style>
  </head>
  <body id="body">
    <main>
      <div class='horizontal'>
        <div class="title">{{title}}</div>
      </div>
    </main>
  </body>
</html>
`;

const templateStyles = `
@font-face {
  font-family: Source Code Pro;
  src: url(https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500&display=swap);
}

* {
  box-sizing: border-box;
}

:root {
  font-size: 16px;
  font-family: Source Code Pro, monospace;
}

body {
  width: 1200px;
  height: 630px;
  background-image: url(data:image/png;base64,${fs
    .readFileSync(`./assets/Ticket_v9.png`)
    .toString("base64")});
  background-position: center;
}

main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.horizontal {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: raw;
  margin-left: 120px;
}

.title {
  position: absolute;
  font-size: {{fontSize}};
  text-transform: capitalize;
  top: 315px;
  right: 105px;
  width: 400px;
  height: 100px;
  color: white;
  font-weight: bold;
  align-items: center;
  transform: rotate(0.25turn);
}
`;

module.exports = { templateHTML, templateStyles };
