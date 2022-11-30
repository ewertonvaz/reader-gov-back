# Docs Collection 92 - Server - back end

# Instalação

Executar os comandos:

```
git clone https://github.com/ewertonvaz/docs-collection-92-back.git
cd docs-collection-92-back
npm install
npm start

```

### Passo a passo

```
npm init -y
```

Editar **package.json**

```
...
"type": "module",
...
"scripts": {
"dev" : "nodemon index.js"
}
```

Executar os comandos:

```
npm install express
npm install dotenv
npm install mongoose
npm install nodemon -D
```

Criar **index.js** :

```
import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.listen( port, () => { console.log(`App up and running on http://localhost:${port}`) })
```

Criar **.env** :

```
PORT=8080
```
