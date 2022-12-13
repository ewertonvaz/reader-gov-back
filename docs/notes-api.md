# Documentação API notes

### Incluir uma anotação

```
POST /notes/:docId

```

O body da requisição deverá conter um objeto com os dados do documento que será incluído. Vide a estrutura (schema) do documento **Notes** abaixo:
Retorna Status 200 e um objeto com os dados do documento criado.

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
