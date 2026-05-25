import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Conectar {

    conn = async () => {

        await mongoose.connect(`${process.env.URI}`, { dbName: `${process.env.DB_NAME}` }).

            then(() => {

                console.log("Conectado com sucesso");

            }).catch((error) => {

                console.log(`Erro ao se conectar ${error.error}`)
            })
    }
}

export default new Conectar;