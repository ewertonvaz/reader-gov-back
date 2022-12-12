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

### Recuperar a lista de todos os livros

```
GET /books/get-all

```

Retorna Status 200 e um array contendo os dados de todos os books da collection.

Aceita os seguintes parâmetros de query:

- **dt**: status do livro, ex.: dt=lido
- **s**: start index, o índice do primeiro documento a ser recuperado;
- **ps**: page size, a qauntidade de elementos por página.

Utilizando este parâmetro é possível filtrar os tipos de documentos e implementar paginação.
Por exemplo: `/books/get-all?dt=dou&s=0&ps=15` recuperar a primeira página com **15** documentos de documentos do tipo **dou**; para obter a segunda página seria: `/books/get-all?dt=dou&s=15&ps=15`; a terceira: `/books/get-all?dt=dou&s=30&ps=15` e assim por diante.

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
status: { type: String, enum: ["Ler", "Lendo", "Lido"], default: "Ler" },
user: { type: Schema.Types.ObjectId, ref: "User" }
}
```
