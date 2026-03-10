import 'dotenv/config'
import { connect } from "./src/mongo_db.js";
import { BrvmUtils } from './src/brvm_utils.js';

const collection = 'stock_2026';


async function task() {
    let client;
    try {
        client = await connect(process.env.MONGO_URI);
        const data = await BrvmUtils.getStock();

        const last = await client.db('brvm').collection(collection)
            .findOne({}, { sort: { registerAt: -1 }, projection: { date: 1 } })

        if (data[0]?.date?.getTime() == last?.date?.getTime()) {
            console.log('Same time', data[0]?.date, last?.date);
            return;
        }

        const registerAt = new Date();
        await client.db('brvm').collection(collection).insertMany(data.map(e => ({ ...e, registerAt })));
        console.log('Success', data[0]?.date);
    } catch (err) {
        console.log('Erreur', err, new Date());
    } finally {
        await client?.close();
    }
}

task();