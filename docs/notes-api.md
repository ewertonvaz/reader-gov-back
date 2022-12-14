# Documentação API notes

### Incluir uma anotação

```
POST /notes/:docId

```

Recebe como parâmetro o **docId** que pode ser um id de documento ou de livro.
O body da requisição deverá conter um objeto com os dados da anptação que será incluída. Vide a estrutura (schema) da anotação **Notes** abaixo.
Retorna Status 200 e um objeto com os dados do documento criado.

### Recupera todas as anotações de um Book

```
GET /notes/book/:docId

```

Recebe como parâmetro o **docId** necessariamente de um livro. Retorna Status 200 e um array com os dados das anotações do livro pasado como parâmetro.

### Deleta uma anotação de um Book

```
DELETE /notes/book/:noteId

```

Recebe como parâmetro o **noteId** o identificador da anotação que se desja excluir necessariamente de um LIVRO. Retorna Status 200 e os dados da anotações que foi deletada.

# Estrutura (Schema) do document Notes

```
{
    titulo : {type: String},
    texto: {type: String, required: true},
    page: { type: Number, min:1},
    book: { type: Schema.Types.ObjectId, ref: "Book" },
    document: { type: Schema.Types.ObjectId, ref: "Document" }
},
{
    timestamps: true,
}
```
