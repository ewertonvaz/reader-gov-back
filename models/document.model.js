import { Schema, model } from "mongoose";

const documentSchema = new Schema({
    titulo : {type: String, required: true},
    orgao : {type: String},
    imagem : {type: String},
    texto: {type: String},
    pdf : {type: String},
    dataPublicacao : { type: Date },
    tipo: { type: String, enum: ["dou", "sei"], default: "dou" },
    document_id: {type: String},
    anotacoes:  { type: String },
    notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
    user: { type: Schema.Types.ObjectId, ref: "User" }
});
documentSchema.index({texto: 'text', titulo: 'text', anotacoes: 'text'});
const DocumentModel = model("Document", documentSchema);

export default DocumentModel;