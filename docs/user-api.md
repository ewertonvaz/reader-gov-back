# Documentação API users

### Registrar o SignUp (inclusão) de um User

```
POST /user/sign-up

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
POST /user/login

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
GET /user/profile

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
GET /user/all-users

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
POST /user

```

O body da requisição deverá conter um objeto com os dados do usuário que será incluído. Vide a estrutura (schema) do documento **User** abaixo:
Retorna Status 200 e um objeto com os dados do usuário criado.

### Obter um usuário pelo id

```
GET /user/oneUser/:id
```

Retorna Status 200 e um objeto com os dados do usuário cujo ID foi passado como parâmetro.

### Obter um usuário pelo parâmetro key/value

```
GET /user/:key/:value
```

Retorna Status 200 e um objeto com os dados do usuário que satisfazem a condição passada como parâmetro.
**Ex:**
`/user/email/bobesponja@gmail.com`

Obterá os dados do usuário cujo **email** é igual a **bobesponja@gmail.com**.

### Atualizar um usuário pelo ID

```
PUT /user/:userId
```

O body da requisição deverá conter um objeto com os dados que serão atualizados. Vide a estrutura (schema) do documento **User** abaixo.
Retorna Status 200 e um objeto com os dados atualziados do usuário cuja ID foi passada como parâmetro.

### Deletar um usuário pelo ID

```
DELETE /user/:userId
```

Retorna Status 200 e caso o usuário exista, um objeto com os dados do usuário que foi deletado. Caso não exista retorna o valor null.

# Estrutura (Schema) do Document User

```
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 20
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
    profilePic: { type: String },
    emailConfirm: { type: Boolean, default: false },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    documents: [{ type: Schema.Types.ObjectId, ref: "Document" }]
  },
  {
    timestamps: true,
  }
```
