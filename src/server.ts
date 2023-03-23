import { config } from "dotenv";
import { connection } from "mongoose";
import { app } from "./app";
import { connectToMongoDb } from "./config/db";
import CandleMessageChannel from "./messages/CandleMessageChannel";

config()

const createServer = async () => {
    await connectToMongoDb()
    const port = process.env.PORT || 3000
    const server = app.listen(port, () => console.log('App running on port ' + port))

    const candleMsgChannel = new CandleMessageChannel(server)
    candleMsgChannel.consumeMessages() 

    process.on('SIGINT', async () => {
        await connection.close()
        server.close()
        console.log('App server closed!')
    })
}
createServer()

