import { faker } from '@faker-js/faker';
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import UserModel from '../../models/user.model.js';
import bcrypt from "bcrypt";

if( process.argv.length <= 2) {
    console.log(`Não foram passados parametros. Uso:
    node ${process.argv[1]} qte=[number]`);
    process.exit();
}

let params = {};
const valid= ['qte'];

for(let i = 2; i < process.argv.length; i++) {
    let arg = process.argv[i].split("=");
    if ( valid.includes(arg[0])) { params[arg[0]] = arg[1]; }
}

if( Object.keys(params).length < 1) {
    console.log(`Não foram passados parametros válidos! Uso:
    node ${process.argv[1]} qte=[number]`);
    process.exit();
}

dotenv.config();
try {
    const dbConnect = await connect();
    console.log(`Connected to data base: ${dbConnect.connection.name}`);
    // await UserModel.deleteMany({});
    for (let i = 0; i < params.qte; i++){
        console.log(await generateUser());
    }
} catch (e) {
    console.log(e);
} finally {
    mongoose.disconnect();
}

async function generateUser(){
    const salt = await bcrypt.genSalt(10);
    const user = UserModel.create( {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        passwordHash: await bcrypt.hash('secret', salt),
        username: faker.name.firstName() + faker.random.numeric(3),
        emailConfirm: true
    });
    return user;
}

async function connect() {
    const dbName = process.env.MONGO_DATABASE;
    return await mongoose.connect(process.env.MONGODB_URI, {dbName : dbName});
}