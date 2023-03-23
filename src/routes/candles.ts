import { Router } from "express";
import CandleController from "../controllers/CandleController";

export const candleRouter = Router();
const candleCtrl = new CandleController();

candleRouter.get("/:quantity", async (req, res) => {
    const quantity = req.params.quantity;
    const lastCandles = await candleCtrl.findLastCandle(Number(quantity));
    return res.json(lastCandles);
});