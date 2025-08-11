import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IcreateRecurringSlotUseCase } from "../../../application/interface/mentor/IcreateRecurringSlotUseCase";

export class CreateRecurringSlotController {
  constructor(private createRecurringSlotUseCase: IcreateRecurringSlotUseCase) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const  data  = req.body;
      const newSlot = await this.createRecurringSlotUseCase.execute(data);
      res.status(HttpStatusCode.OK).json({ newSlot });
    } catch (error) {
      console.error("Error creating recurring slots:", error);
      next(error);
    }
  };
}
