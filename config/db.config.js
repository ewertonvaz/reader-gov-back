import mongoose from "mongoose";

async function connect(dbName){
    try {
        const dbConnect = await mongoose.connect(process.env.MONGODB_URI, {dbName : dbName});
        console.log(`Connected to data base: ${dbConnect.connection.name}`);
    } catch (e) {
        console.log(e);
    }
}

export default connect;