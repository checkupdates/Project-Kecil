const express = require("express");
const path = require("path");
const server = express();

function keepAlive() {
  server.listen(3000, async () => {
  });
}

module.exports = keepAlive;
