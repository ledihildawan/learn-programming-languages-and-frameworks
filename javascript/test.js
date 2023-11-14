const fs = require('fs').promises;

const contents = { aa: 12, bb: 21 };

fs.open('myfile1.txt', 'a+').then((data) =>
  data.write(JSON.stringify(contents))
);
