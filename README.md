# Docs Collection 92 - Server - back end

# Instalação

Executar os comandos:

```
git clone https://github.com/ewertonvaz/docs-collection-92-back.git
cd docs-collection-92-back
cp .env.sample .env
npm install
npm start

```

# Documentação API users

### Incluir um User

```
POST /users

```

O body da requisição deverá conter um objeto com os dados do usuário que será incluído. Vide a estrutura (schema) do documento **User** abaixo:
Retorna Status 200 e um objeto com os dados do usuário criado.

### Obter um usuário pelo parâmetro key/value

```
GET /users/:key/:value
```

Retorna Status 200 e um objeto com os dados do usuário que satisfazem a condição passada como parâmetro.
**Ex:**
`/users/email/bobesponja@gmail.com`

Obterá os dados do usuário cujo **email** é igual a **bobesponja@gmail.com**.

### Atualizar um usuário pelo ID

```
PUT /users/:userId
```

O body da requisição deverá conter um objeto com os dados que serão atualizados. Vide a estrutura (schema) do documento **User** abaixo.
Retorna Status 200 e um objeto com os dados atualziados do usuário cuja ID foi passada como parâmetro.

### Deletar um usuário pelo ID

```
DELETE /users/:userId
```

Retorna Status 200 e caso o usuário exista, um objeto com os dados do usuário que foi deletado. Caso não exista retorna o valor null.

# Estrutura (Schema) do Document User

```
{
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
    },
    active: {
      type: Boolean,
      default: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
    createdAt: { type: Date, default: Date.now() },
  }
```

# Documentação API books

### Incluir um livro

```
POST /books

```

O body da requisição deverá conter um objeto com os dados do livro que será incluído. Vide a estrutura (schema) do documento **Books** abaixo:
Retorna Status 200 e um objeto com os dados do livro criado.

### Obter um livro pelo ID

```
GET /books/:bookId
```

Retorna Status 200 e um objeto com os dados do livro cuja ID foi passada como parâmetro.

### Obter um livro pelo parâmetro key/value

```
GET /books/:key/:value
```

Retorna Status 200 e um objeto com os livros cuja que satisfazem a condição passada como parâmetro.
**Ex:**
`/books/status/Lendo`

Obterá os livro cujo **status** é igual a **Lendo**.

### Atualizar um livro pelo ID

```
PUT /books/:bookId
```

O body da requisição deverá conter um objeto com os dados que serão atualziados. Vide a estrutura (schema) do documento **Books** abaixo:
Retorna Status 200 e um objeto com os dados atualziados do livro cuja ID foi passada como parâmetro.

### Deletar um livro pelo ID

```
DELETE /books/:bookId
```

Retorna Status 200 e caso o livro exista, um objeto com os dados do livro que foi deletado. Caso não exista retorna o valor null.

# Estrutura (Schema) do Document Books

```
{
googleID: { type: String, unique: true },
autor: { type: String, minLength: 5 },
ranking: { type: Number, min:0, max: 5 },
categoria: { type: String, minLength: 5 },
imagemCapa: { type: String },
idioma: { type: String },
qtdPaginas: { type: Number, min: 0 },
titulo: { type: String, required: true },
subtitulo: { type: String },
ultPagLida: { type: Number, min: 0 },
anotacoes: { type: String },
dataInicio: { type: Date },
dataConclusao: { type: Date },
tipo: { type: String },
caminho: { type: String },
status: { type: String, enum: ["Ler", "Lendo", "Lido"], default: "Ler" }
}
```
