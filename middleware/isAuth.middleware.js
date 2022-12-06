import { expressjwt } from "express-jwt";
import * as dotenv from "dotenv";

dotenv.config();
//este middleware insere a propriedade auth no objeto res, 
// assim auth.res conterá o payload com os dados do usuário autenticado pelo token
export default expressjwt({
    secret: process.env.TOKEN_SIGN_SECRET,
    algorithms: ["HS256"],
});