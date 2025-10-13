import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IFetchAvailabilityUseCase } from "../../../application/interface/mentor/IFetchAvailabilityUseCase";

export class FetchAvailabilityController {
  constructor(private _fetchAvailabilityUseCase: IFetchAvailabilityUseCase) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { mentorId, page, searchData } = req.query;

      const slots = await this._fetchAvailabilityUseCase.execute(
        String(mentorId),
        Number(page),
        String(searchData)
      );
      res.status(HttpStatusCode.OK).json(slots);
    } catch (error) {
      console.error("Error creating recurring slots:", error);
      next(error);
    }
  };
}
