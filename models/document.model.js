import { Schema, model } from "mongoose";

const documentSchema = new Schema({
    titulo : {type: String, required: true},
    orgao : {type: String},
    imagem : {type: String},
    texto: {type: String},
    pdf : {type: String},
    dataPublicacao : { type: Date }
});

const DocumentModel = model("Document", documentSchema);

export default DocumentModel;