const fs = require('fs');

// const buffer = fs.readFileSync("java.png");

// console.log(fs.writeFileSync('buffered/java.png', buffer));

const base64 = fs.readFileSync('java.png', "base64");

const buffer = Buffer.from(base64, "base64");

console.log(buffer);

const img = fs.writeFileSync('buffered/java.png', buffer);

console.log(img);