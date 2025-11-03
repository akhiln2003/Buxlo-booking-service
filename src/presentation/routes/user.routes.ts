import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { fetchavailabilityDto } from "../dto/user/fetchavailability.dto";
import { validateReqParams } from "@buxlo/common";
import { UserFetchAvailabilityController } from "../controllers/user/userFetchAvailability.controller";
import { lockSlotDto } from "../dto/user/lockSlot.dto";
import { LockAvailabilityController } from "../controllers/user/lockAvailability.controller";

export class UserRouter {
  private _router: Router;
  private _diContainer: DIContainer;

  private _userFetchAvailabilityController!: UserFetchAvailabilityController;
  private _lockAvailabilityController!: LockAvailabilityController;
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
    this._lockAvailabilityController = new LockAvailabilityController(
      this._diContainer.lockAvailabilityUseCase()
    );
  }

  private _initializeRoutes(): void {
    this._router.get(
      "/fetchslots/:mentorId",
      validateReqParams(fetchavailabilityDto),
      this._userFetchAvailabilityController.fetch
    );
    this._router.patch(
      "/lockSlot/:slotId/:userId",
      validateReqParams(lockSlotDto),
      this._lockAvailabilityController.lock
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
