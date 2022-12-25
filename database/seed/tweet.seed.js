import { faker } from '@faker-js/faker';
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import UserModel from '../../models/user.model.js';
import TweetModel from '../../models/tweet.model.js';
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
    if (UserModel.count < 1) {
        generateUser();
    }
    const users = await UserModel.find();
    await TweetModel.deleteMany();
    for (let i = 0; i < params.qte; i++){
        console.log(await generateTweet(users));
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

async function generateTweet(users){
    const id = users[Math.floor(Math.random() * users.length)]._id;

    const tweet = await TweetModel.create( {
        body: faker.lorem.text().substring(0, 247),
        user: id
    });

    const userUpd = await UserModel.findByIdAndUpdate(
        id,
        {
            $push: {
                tweets: tweet._id,
            },
        },
        { new: true, runValidators: true }
     );
    return tweet;
}

async function connect() {
    const dbName = process.env.MONGO_DATABASE;
    return await mongoose.connect(process.env.MONGODB_URI, {dbName : dbName});
}