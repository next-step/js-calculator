const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('src'));

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/index.html`);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
