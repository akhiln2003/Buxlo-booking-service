import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IfetchAvailabilityUseCase } from "../../../application/interface/mentor/IfetchAvailabilityUseCase";

export class FetchAvailabilityController {
  constructor(private fetchAvailabilityUseCase: IfetchAvailabilityUseCase) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { mentorId } = req.params;
      const slots = await this.fetchAvailabilityUseCase.execute(mentorId);
      res.status(HttpStatusCode.OK).json({ slots });
    } catch (error) {
      console.error("Error creating recurring slots:", error);
      next(error);
    }
  };
}
