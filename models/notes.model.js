import { Schema, model } from "mongoose";

const noteSchema = new Schema({
        titulo : {type: String},
        texto: {type: String, required: true},
        page: { type: Number, min:1},
        book: { type: Schema.Types.ObjectId, ref: "Book" },
        document: { type: Schema.Types.ObjectId, ref: "Document" }
    },
    {
       timestamps: true,
    }
);
noteSchema.index({texto: 'text', titulo: 'text'});
//schema.index({ animal: 'text', color: 'text', pattern: 'text', size: 'text' });
const NoteModel = model("Note", noteSchema);

export default NoteModel;