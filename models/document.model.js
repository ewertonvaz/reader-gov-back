import { Schema, model } from "mongoose";

const documentSchema = new Schema({
    titulo : {type: String, required: true},
    orgao : {type: String},
    imagem : {type: String},
    texto: {type: String},
    pdf : {type: String},
    dataPublicacao : { type: Date },
    tipo: { type: String, enum: ["dou", "sei"], default: "dou" },
    document_id: {type: String}
});

const DocumentModel = model("Document", documentSchema);

export default DocumentModel;