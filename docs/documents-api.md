# Documentação API documents

### Incluir um documento (protegida)

```
POST /documents

```

O body da requisição deverá conter um objeto com os dados do documento que será incluído. Vide a estrutura (schema) do documento **Document** abaixo.
Retorna Status 200 e um objeto com os dados do documento criado.
**Obs:** Ao enviar pelo fron-end é recomendado usar o _encodeURI()_ para normalizar o conteúdo do campo **texto**.

### Incluir um documento DOU (desprotgida)

Esta rota não necessita de autenticação pois é usada somente pelo scrapping para incluirdocumentos proveniente da raspagem do Diário Oficial da União.

```
POST /documents/dou

```

O body da requisição deverá conter um objeto com os dados do documento que será incluído. Vide a estrutura (schema) do documento **Document** abaixo.
Retorna Status 200 e um objeto com os dados do documento criado.
**Obs:** Ao enviar pelo fron-end é recomendado usar o _encodeURI()_ para normalizar o conteúdo do campo **texto**.

### Recuperar um documento pelo ID

```
GET /documents/get-one/:docId

```

Retorna Status 200 e um objeto com os dados do documento cuja ID foi passada como parâmetro.
**Obs:** Ao receber no fron-end é recomendado usar o _decodeURI()_ para normalizar o conteúdo do campo **texto** que for recuperado.

### Recuperar a lista de todos os documentos

```
GET /documents/get-all

```

Retorna Status 200 e um array contendo os dados de todos os documento da collection.

Aceita os seguintes parâmetros de query:

- **dt**: tipos do documento, ex.: dt=sei
- **s**: start index, o índice do primeiro documento a ser recuperado;
- **ps**: page size, a qauntidade de elementos por página.

Utilizando este parâmetro é possível filtrar os tipos de documentos e implementar paginação.
Por exemplo: `/documents/get-all?dt=dou&s=0&ps=15` recuperar a primeira página com **15** documentos de documentos do tipo **dou**; para obter a segunda página seria: `/documents/get-all?dt=dou&s=15&ps=15`; a terceira: `/documents/get-all?dt=dou&s=30&ps=15` e assim por diante.

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
    dataPublicacao : { type: Date },
    tipo: { type: String, enum: ["dou", "sei"], default: "dou" },
    formato: { type: String, enum: ["pdf", "epub"], default: "pdf" },
    document_id: {type: String},
    anotacoes:  { type: String },
    notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
    user: { type: Schema.Types.ObjectId, ref: "User" }
}
```
