import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IcreateRecurringSlotUseCase } from "../../../application/interface/mentor/IcreateRecurringSlotUseCase";

export class CreateRecurringSlotController {
  constructor(
    private _createRecurringSlotUseCase: IcreateRecurringSlotUseCase
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const newSlot = await this._createRecurringSlotUseCase.execute(data);
      res.status(HttpStatusCode.OK).json({ newSlot });
    } catch (error) {
      console.error("Error creating recurring slots:", error);
      next(error);
    }
  };
}
