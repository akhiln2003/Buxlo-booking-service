import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { ILockAvailabilityUseCase } from "../../../application/interface/user/ILockAvailabilityUseCase";

export class LockAvailabilityController {
  constructor(private _lockAvailabilityUseCase: ILockAvailabilityUseCase) {}

  lock = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slotId, userId } = req.params;
      const slots = await this._lockAvailabilityUseCase.execute(slotId, userId);
      res.status(HttpStatusCode.OK).json(slots);
    } catch (error) {
      console.error("Error locking slots:", error);
      next(error);
    }
  };
}
