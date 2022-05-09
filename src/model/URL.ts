import Mongoose from 'mongoose';

const URL = new Mongoose.Schema({
    urlOriginal: String,
    idUrl: String,
    urlCurta: String,
});

const urlModel = Mongoose.model('URL', URL);

export default urlModel; 


