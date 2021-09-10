const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000 || process.env.PORT;

app.use(cors())
app.use(express.static('client/dist'));
app.use(express.static('client/images'));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})