const express = require('express');
const cors = require('cors');

const router = require('./router');

const app = express();


app.use(express.json());

app.use(cors());

app.use('/api', router);

// conexão com o front da aplicação para testes
const path = require('path');
app.use('/', express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})
