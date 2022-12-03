import { Schema, model } from "mongoose";

const BookSchema = new Schema( {
    googleID: { type: String },
    autor: { type: String },
    ranking: { type: Number, min:0, max: 5 },
    categoria: { type: String },
    imagemCapa: { type: String },
    idioma: { type: String },
    qtdPaginas: { type: Number, min: 0 },
    titulo: { type: String, required: true },
    subtitulo: { type: String },
    ultPagLida: { type: Number, min: 0 },
    anotacoes:  { type: String },
    dataInicio:  { type: Date },
    dataConclusao:  { type: Date },
    tipo: { type: String },
    caminho: { type: String },
    status: { type: String, enum: ["Ler", "Lendo", "Lido"], default: "Ler" }
});

const BookModel = model("Book", BookSchema);
export default BookModel;