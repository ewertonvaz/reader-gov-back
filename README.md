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

### Registrar o SignUp (inclusão) de um User

```
POST /sign-up

```

O body da requisição deverá conter um objeto com os dados do usuário que será incluído conforme o exemplo abaixo:

```
{
    "name" : "Bob Esponja",
    "email" : "bob.esponja@gmail.com",
    "password" : "Senh@2022"
}
```

Caso bem sucedido retornará o status 200 e um objeto com os dados do usuário criado incluíndo id e jwt na estrutura descrita abaixo:

```
{
    "name": "Bob Esponja",
    "email": "bob.esponja@gmail.com",
    "role": "USER",
    "active": true,
    "tasks": [],
    "_id": "638fcb1da42461f2e82ef981",
    "createdAt": "2022-12-06T23:07:09.721Z",
    "updatedAt": "2022-12-06T23:07:09.721Z",
    "__v": 0
}
```

### Fazer o Login de um User

```
POST /login

```

O body da requisição deverá conter um objeto com e-mail e password do usuário que deseja fazer login conforme o exemplo abaixo:

```
{
    "email" : "bob.esponja@gmail.com",
    "password" : "Senh@2022"
}
```

Quando bem sucedido retorna os dados do usuário de acordo com o exemplo abaixo:

```
{
    "user": {
        "_id": "638fcb1da42461f2e82ef981",
        "name": "Bob Esponja",
        "email": "bob.esponja@gmail.com",
        "role": "USER",
        "active": true,
        "tasks": [],
        "createdAt": "2022-12-06T23:07:09.721Z",
        "updatedAt": "2022-12-06T23:07:09.721Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhmY2IxZGE0MjQ2MWYyZTgyZWY5ODEiLCJuYW1lIjoiQm9iIEVzcG9uamEiLCJlbWFpbCI6ImJvYi5lc3BvbmphQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjcwMzY4MzE4LCJleHAiOjE2NzA0MTE1MTh9.pMpyEYEre4sMQ27Mo7hKtvI8pwCCEK5DZVVMWXujR8A"
}
```

Poderá retornar os seguinte códigos de erro:

- 400 - Este usuário não existe !
- 404 - Usuário não encontrado.

### Obtém o perfil do usuário que fez o login

```
GET /profile

```

O Header da requisição deverá conter um token Bear semelahnte ao exemplo:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhmY2IxZGE0MjQ2MWYyZTgyZWY5ODEiLCJuYW1lIjoiQm9iIEVzcG9uamEiLCJlbWFpbCI6ImJvYi5lc3BvbmphQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjcwMzY4MzE4LCJleHAiOjE2NzA0MTE1MTh9.pMpyEYEre4sMQ27Mo7hKtvI8pwCCEK5DZVVMWXujR8A
```

Caso seja bem sucedido retornará 200 e um objeto contendo so dados do perfil (profile) conforme o exemplo abaixo:

```
{
    "_id": "638fcb1da42461f2e82ef981",
    "name": "Bob Esponja",
    "email": "bob.esponja@gmail.com",
    "role": "USER",
    "active": true,
    "tasks": [],
    "createdAt": "2022-12-06T23:07:09.721Z",
    "updatedAt": "2022-12-06T23:07:09.721Z"
}
```

Poderá retornar os seguinte códigos de erro:

- 400 - Usuário não cadastrado
- 401 - Email ou Senha inválidos!

### Obtém a relação de todos os usuários

```
GET /all-users

```

O Header da requisição deverá conter um token Bear para um usuário que tenha a role ADMIN, semelhante ao exemplo:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhmY2IxZGE0MjQ2MWYyZTgyZWY5ODEiLCJuYW1lIjoiQm9iIEVzcG9uamEiLCJlbWFpbCI6ImJvYi5lc3BvbmphQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjcwMzY4MzE4LCJleHAiOjE2NzA0MTE1MTh9.pMpyEYEre4sMQ27Mo7hKtvI8pwCCEK5DZVVMWXujR8A
```

Caso seja bem sucedido (usuário possua a role ADMIN) retornará 200 e um array contendo a lista de usuário cadastrados.
Poderá retornar os seguinte códigos de erro:

- 400 - Usuário não cadastrado
- 403 - Usuário não autorizado para esta rota!

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
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 20
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    active: {
      type: Boolean,
      default: true,
    },
    tasks: [{ type: String }],
    passwordHash: { type: String, required: true },
    birth: { type: Date },
    address: {
      city: { type: String },
      state: { type: String },
    },
  },
  {
    timestamps: true,
  }
```

# Documentação API documents

### Incluir um documento

```
POST /documents

```

O body da requisição deverá conter um objeto com os dados do documento que será incluído. Vide a estrutura (schema) do documento **Document** abaixo:
Retorna Status 200 e um objeto com os dados do documento criado.
**Obs:** Ao enviar pelo fron-end é recomendado usar o _encodeURI()_ para normalizar o conteúdo do campo **texto**.

### Recuperar um documento pelo ID

```
GET /documents/:docId

```

Retorna Status 200 e um objeto com os dados do documento cuja ID foi passada como parâmetro.
**Obs:** Ao receber no fron-end é recomendado usar o _decodeURI()_ para normalizar o conteúdo do campo **texto** que for recuperado.

### Atualizar um documento pelo ID

```
PUT /documents/:docId
```

O body da requisição deverá conter um objeto com os dados que serão atualizados. Vide a estrutura (schema) do documento **Document** abaixo.
Retorna Status 200 e um objeto com os dados atualziados do documento cuja ID foi passada como parâmetro.

### Deletar um documento pelo ID

```
DELETE /users/:docId
```

Retorna Status 200 e caso o documento exista, um objeto com os dados do documento que foi deletado. Caso não exista retorna o valor null.

# Estrutura (Schema) do Document Document

```
{
    titulo : {type: String, required: true},
    orgao : {type: String},
    imagem : {type: String},
    texto: {type: String},
    pdf : {type: String},
    dataPublicacao : { type: Date }
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
