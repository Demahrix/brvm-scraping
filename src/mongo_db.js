import { MongoClient } from 'mongodb';

/** @type{MongoClient} */
let client = null;

/**
 * 
 * @param {string} url 
 * @returns 
 */
async function connect(url) {
    if (client != null)
        return Promise.resolve(client);
    console.log('connecting...');

    const c = new MongoClient(url);
    client = await c.connect();
    return client;
}

export { connect }