import mongoose from "mongoose";
import { config } from "../config/config";

const Connection = () => {
  mongoose.Promise = global.Promise

  const conexao = {
    uri: config.CONEXAO_MONGODB,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  }

  mongoose.connection.on('open', () => {
    console.log('Conectado com Sucesso ao Banco de Dados!');
  });

  mongoose.connection.on('error', (error) => {
      console.log("ERRO :: ", error.reason);
      //throw new Error('Erro ao conectar o MongoDB.');
  });

  mongoose.connect(conexao.uri, conexao.options);
}

export default Connection;
