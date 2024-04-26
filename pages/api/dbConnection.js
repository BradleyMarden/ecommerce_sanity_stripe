const mongoose = require('mongoose');

global.mongoose = {
    conn: null
};

export async function dbConnect() {

    if (global.mongoose && global.mongoose.conn) {
        console.log("Connected from previous");
        return global.mongoose.conn;
    } else {
        console.log('\x1b[33mConnecting to Mongo\x1b[0m');

        const options = {
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true
        };
        const mongoUrl = process.env.MONGO_URL

        await mongoose.connect(mongoUrl, options).then((conn) => {
            console.log('\x1b[32mMongo connected at ', mongoUrl + "\x1b[0m");
            global.mongoose = {
                conn: conn,
            };
        }).catch((e) => {
            console.log(e)
            console.log('\x1b[31mMongo failed to connect at ', mongoUrl + "\x1b[0m");
            process.exit()
        })
    }
};


