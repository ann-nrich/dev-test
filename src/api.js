const express = require('express');
const db = require('better-sqlite3')('db.sqlite');
const app = express();
const port = 8085;
app.use(express.json());
const apiKey = 'f542792898b29cc97af9100f687f3a4808d31a0cf0590d26163ddb861462fcd8';
setInterval(transactionWatcherIfUsdValueBelowOpenRate, 1000);


app.post('/api/close-transaction', async (req, res) => {
    await db.prepare(`UPDATE userTransaction SET isOpened = 'false' WHERE id = '${req.body.transactionId}'`).run();
    res.send({success: true});
});

app.post('/api/create-transaction', async (req, res) => {
    const coinInfo = await getCoinInfoAndSaveIfNotYetSaved(req);
    const created = await createTransaction(req, coinInfo);
    res.send({transactionId: created});
});

async function transactionWatcherIfUsdValueBelowOpenRate(){
    const allCoins = await db.prepare('SELECT * FROM coin').all();
    for(const coin of allCoins) {
        const url = `https://min-api.cryptocompare.com/data/price?fsym=${coin.symbol}&tsyms=USD&api_key=` + apiKey;
        const result = await fetch(url);
        const data = await result.json();
        const res = await db.prepare(`SELECT * FROM userTransaction WHERE coinId ='${coin.id}' AND isOpened = 'true'`).all();
        if(res.usdPrice < data.USD){
            await db.prepare(`UPDATE userTransaction SET isOpened = 'false' WHERE coinId = '${coin.id}'`).run();
        }
    }
}

async function createTransaction(req, coinInfo){
    const usdPrice = await fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=' + apiKey);
    const usdPriceJson = await usdPrice.json();
    const eurPrice = await fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=EUR&api_key=' + apiKey);
    const eurPriceJson = await eurPrice.json();
    const exists = await checkTableExists('userTransaction');
    if(!exists) {
        console.log('Creating table');
        await db.prepare('CREATE TABLE userTransaction (id INTEGER PRIMARY KEY AUTOINCREMENT, coinId INTEGER, amount REAL, usdPrice REAL, eurPrice REAL, date TEXT, userId REAL, isOpened REAL)').run();
    }
    const res = await db.prepare(`INSERT INTO userTransaction (coinId, amount, usdPrice, eurPrice, date, userId, isOpened) VALUES (${coinInfo.id}, ${req.body.amount}, ${usdPriceJson.USD}, ${eurPriceJson.EUR}, '${req.body.date}' , ${coinInfo.userId}, 'true')`).run();
    return res.lastInsertRowid;
}

async function getCoinInfoAndSaveIfNotYetSaved(req){
    const exists = await checkTableExists('coin');
    if(!exists) {
        console.log('Creating table');
        await db.prepare('CREATE TABLE coin (id INTEGER PRIMARY KEY AUTOINCREMENT, symbol TEXT, name TEXT, coinName TEXT, imageUrl TEXT, userId INTEGER)').run();
    }
    const url = 'https://min-api.cryptocompare.com/data/all/coinlist?api_key=' + apiKey;
    const result = await fetch(url);
    const data = await result.json();
    for(const key of Object.keys(data.Data)){
        if(key == req.body.coin){
            const exists = await db.prepare(`SELECT * FROM coin WHERE symbol = '${key}'`).get();
            if(exists) {
                return exists;
            }
            await db.prepare(`INSERT INTO coin (symbol, name, coinName, imageUrl, userId) VALUES ('${key}', '${data.Data[key].Name}', '${data.Data[key].CoinName}', '${data.Data[key].ImageUrl}', '${req.body.userId}')`).run();
            return await db.prepare(`SELECT * FROM coin WHERE symbol = '${key}'`).get();
        }
    }
}


async function  checkTableExists (tableName) {
    const row = await db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`);
    return row.pluck().get() == tableName;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});