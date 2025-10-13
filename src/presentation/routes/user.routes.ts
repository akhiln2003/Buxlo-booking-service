import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { fetchavailabilityDto } from "../dto/user/fetchavailability.dto";
import { validateReqParams } from "@buxlo/common";
import { UserFetchAvailabilityController } from "../controllers/user/userFetchAvailability.controller";

export class UserRouter {
  private _router: Router;
  private _diContainer: DIContainer;

  private _userFetchAvailabilityController!: UserFetchAvailabilityController;

  constructor() {
    this._router = Router();
    this._diContainer = new DIContainer();
    this._initializeControllers();
    this._initializeRoutes();
  }

  private _initializeControllers(): void {
    this._userFetchAvailabilityController = new UserFetchAvailabilityController(
      this._diContainer.userFetchAvailabilityUseCase()
    );
  }

  private _initializeRoutes(): void {
    this._router.get(
      "/fetchslots/:mentorId",
      validateReqParams(fetchavailabilityDto),
      this._userFetchAvailabilityController.fetch
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
