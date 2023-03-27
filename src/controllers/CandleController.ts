import { Candle, CandleModel } from "../models/CandleModel";

export default class CandleController {

    async save (candle:Candle):Promise<Candle> {
        const newCandle = await CandleModel.create(candle)
        return newCandle
    }

    async findLastCandle (quantity:number):Promise<Candle[]> {
        const n = quantity > 0 ? quantity : 10

        const lastCandle = await CandleModel.find().sort({finalDateTime:-1}).limit(n)
        return lastCandle
    }
}