import express, {Request, Response} from 'express';
import cors from 'cors';
import route from './controller/urlController';

const PORT = 3000;

const app = express();

app.use(express.json());
//app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET, POST');
    res.header("Access-Control-Allow-Headers", 'Content-Type, Authorization');
    res.header("Access-Control-Expose-Headers", 'Content-Range, X-Content-Range');
    app.use(cors());
    next();
});

app.use(route);

app.get('/teste', (req: Request, resp: Response) => {
    resp.status(200).json({status:"Teste aceito!"});
});

app.listen(PORT, () => console.log(`Express conectado na porta ${PORT}`));
