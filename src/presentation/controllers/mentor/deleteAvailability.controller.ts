import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IDeleteAvailabilityUseCase } from "../../../application/interface/mentor/IDeleteAvailabilityUseCase";

export class DeleteAvailabilityController {
  constructor(private _deleteAvailabilityUseCase: IDeleteAvailabilityUseCase) {}

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const slots = await this._deleteAvailabilityUseCase.execute(id);
      res.status(HttpStatusCode.OK).json(slots);
    } catch (error) {
      console.error("Error deleting slot:", error);
      next(error);
    }
  };
}
