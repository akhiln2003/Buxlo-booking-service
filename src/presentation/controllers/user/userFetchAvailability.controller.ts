import HttpStatusCode from "@buxlo/common/build/common/httpStatusCode";
import { NextFunction, Request, Response } from "express";
import { IFetchAvailabilityUseCase } from "../../../application/interface/mentor/IFetchAvailabilityUseCase";
import { IUserFetchAvailabilityUseCase } from "../../../application/interface/user/IUserFetchAvailabilityUseCase";

export class UserFetchAvailabilityController {
  constructor(
    private _userFetchAvailabilityUseCase: IUserFetchAvailabilityUseCase
  ) {}

  fetch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { mentorId } = req.params;
      const slots = await this._userFetchAvailabilityUseCase.execute(mentorId);
      res.status(HttpStatusCode.OK).json({ slots });
    } catch (error) {
      console.error("Error creating recurring slots:", error);
      next(error);
    }
  };
}
