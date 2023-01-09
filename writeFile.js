const fs = require("fs");

function writeFile() {}

writeFile.prototype.read = function(file) {
  return fs.readFileSync(file, "utf8");
};

writeFile.prototype.write = function(path, data) {
  return fs.writeFileSync(path, data);
};

writeFile.prototype.append = function(file, data) {
  return fs.appendFileSync(file, data);
};

module.exports = writeFile;