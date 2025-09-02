import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { ICreateOneSlotUseCase } from "../../../application/interface/mentor/ICreateOneSlotUseCase";

export class CreateOneSlotController {
  constructor(private _createOneSlotUseCase: ICreateOneSlotUseCase) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const newSlot = await this._createOneSlotUseCase.execute(data);
      res.status(HttpStatusCode.OK).json({ newSlot });
    } catch (error) {
      console.error("Error createing one slot :", error);
      next(error);
    }
  };
}
