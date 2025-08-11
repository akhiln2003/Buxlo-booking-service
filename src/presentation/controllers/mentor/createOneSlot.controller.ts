import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IcreateOneSlotUseCase } from "../../../application/interface/mentor/IcreateOneSlotUseCase";

export class CreateOneSlotController {
  constructor(private createOneSlotUseCase: IcreateOneSlotUseCase) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const  data  = req.body;
      const newSlot = await this.createOneSlotUseCase.execute(data);
      res.status(HttpStatusCode.OK).json({ newSlot });
    } catch (error) {
      console.error("Error createing one slot :", error);
      next(error);
    }
  };
}
