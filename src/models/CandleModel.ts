import { model,Document,Schema } from "mongoose";

export interface Candle extends Document {
    currency:string
    open:number
    initialDateTime:Date
    finalDateTime:Date
    close:number
    high:number
    low:number
    color:string
}

const schema = new Schema<Candle>({
    currency: {type:String,required:true},
    open: {type:Number,required:true},
    initialDateTime: {type:Date},
    finalDateTime: {type:Date,required:true},
    close: {type:Number,required:true},
    high: {type:Number,required:true},
    low: {type:Number,required:true},
    color: {type:String,required:true}
})

export const CandleModel = model<Candle>('Candle',schema)