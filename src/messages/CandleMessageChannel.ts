import { Channel, connect } from "amqplib";
import { config } from "dotenv";
import { Server } from "socket.io";
import * as http from "http";
import CandleController from "src/controllers/CandleController";
import { Candle } from "src/models/CandleModel";

config()

export default class CandleMessageChannel{
    private _channel: Channel
    private _candleCtrl: CandleController
    private _io: Server

    constructor(server: http.Server){
        this._io = new Server(server,{
            cors: {
                origin: process.env.SOCKET_CLIENT_SERVER,
                methods: ["GET","POST"]
            }
        })
        this._candleCtrl = new CandleController()

        this._io.on("connection",socket => console.log("Socket connected"))
        this._createMessageChannel()
    }

    private async _createMessageChannel(){
        try{
            const connection = await connect(process.env.AMQP_SERVER)
            this._channel = await connection.createChannel()
            await this._channel.assertQueue(process.env.QUEUE_NAME as string)
        }catch(err){
            console.log("Error on createMessageChannel method")
            console.log(err)
        }
    }

    consumeMessages(){
        this._channel.consume(process.env.QUEUE_NAME as string, async (msg) => {
            if(msg){
                const candle: Candle = JSON.parse(msg.content.toString())
                console.log('Candle received: ',candle)
                this._channel.ack(msg)
                
                this._candleCtrl.save(candle)
                console.log('Candle saved on database')

                this._io.emit(process.env.SOCKET_EVENT_NAME,candle)
                console.log('Candle sent to socket.io')
            }
        })
        console.log('Waiting for messages...')
    }

}