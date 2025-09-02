import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IFetchAvailabilityUseCase } from "../../../application/interface/mentor/IFetchAvailabilityUseCase";

export class FetchAvailabilityController {
  constructor(private _fetchAvailabilityUseCase: IFetchAvailabilityUseCase) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { mentorId } = req.params;
      const slots = await this._fetchAvailabilityUseCase.execute(mentorId);
      res.status(HttpStatusCode.OK).json({ slots });
    } catch (error) {
      console.error("Error creating recurring slots:", error);
      next(error);
    }
  };
}
