import http from 'http';
import 'dotenv/config'
import { connect } from "./src/mongo_db.js";
import { BrvmUtils } from './src/brvm_utils.js';

let lastTime = null;

setInterval(async () => {    
    const client = await connect(process.env.MONGO_URI);
    const data = await BrvmUtils.getStock();

    if (data[0].date.getTime() == lastTime)
        return;

    try {
        const registerAt = new Date();
        await client.db('brvm').collection('stock').insertMany(data.map(e => ({ ...e, registerAt })));
        lastTime = data[0].date.getTime();
    } catch (err) {
        
    }
}, 2 * 60 * 1000);


http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Hello world")
}).listen(process.env.PORT || 3000, '0.0.0.0')