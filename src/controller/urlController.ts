import { Router, Request, Response } from "express";
import shortid from "shortid";
import { config } from "../config/config";
import Connection from "../database/db";
import urlModel from "../model/URL";

 
Connection();
const route = Router();

route.post('/urlcurta', async (req: Request, resp: Response) => {    
    // Pega a URL Original
    const urlOriginal = req.body.urlOriginal;
    // Pesquisa no Banco
    const url = await urlModel.findOne({ urlOriginal });

    resp.setHeader("Content-Type", "application/json");

    if (url) {
        // Retorna um JSON com a Resposta        
        resp.status(200).json(url);
        return;

    } 

    const idUrl = shortid.generate(); // Gera id único
    const urlCurta = `${config.URL_API}/${idUrl}`; // cria a URL curta
    // Salva no Banco de Dados
    const novaUrl = await urlModel.create({ urlOriginal, idUrl, urlCurta });
    resp.status(201).json(novaUrl); // Retorna a Resposta em JSON
});

route.get('/:idurl', async (req: Request, resp: Response) => {
    
    // Pega o Id da URL
    const idUrl = req.params.idurl;
    // Pesquisa no Banco de Dados
    const url = await urlModel.findOne({ idUrl });
    resp.setHeader("Content-Type", "application/json");

    if (url) {
        // Redireciona para a URL Original        
        resp.status(200).redirect(url.urlOriginal);
        return;
    } 
    // Caso não seja encontrada uma URL.
    resp.status(404).json({ "erro": 'URL não encontrada!' });
});

export default route;
