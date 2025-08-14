import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { CreateOneSlotController } from "../controllers/mentor/createOneSlot.controller";
import { validateReqBody, validateReqParams } from "@buxlo/common";
import { CreateRecurringSlotController } from "../controllers/mentor/createRecurringSlot.controller";
import { createOneSlotDto } from "../../zodSchemaDto/mentor/createOneSlot.dto";
import { createRecurringSlotDto } from "../../zodSchemaDto/mentor/createRecurringSlot.dto";
import { FetchAvailabilityController } from "../controllers/mentor/fetchAvailability.controller";
import { fetchavailabilityDto } from "../../zodSchemaDto/mentor/fetchavailability.dto";

export class MentorRouter {
  private _router: Router;
  private _diContainer: DIContainer;

  private _createOneSlotController!: CreateOneSlotController;
  private _createRecurringSlotController!: CreateRecurringSlotController;
  private _fetchAvailabilityController!: FetchAvailabilityController;

  constructor() {
    this._router = Router();
    this._diContainer = new DIContainer();
    this._initializeControllers();
    this._initializeRoutes();
  }

  private _initializeControllers(): void {
    this._createOneSlotController = new CreateOneSlotController(
      this._diContainer.createOneSlotUseCase()
    );
    this._createRecurringSlotController = new CreateRecurringSlotController(
      this._diContainer.createRecurringSlotUseCase()
    );
    this._fetchAvailabilityController = new FetchAvailabilityController(
      this._diContainer.fetchAvailabilityUseCase()
    );
  }

  private _initializeRoutes(): void {
    this._router.post(
      "/createoneslot",
      validateReqBody(createOneSlotDto),
      this._createOneSlotController.create
    );
    this._router.post(
      "/createrecurringslot",
      validateReqBody(createRecurringSlotDto),
      this._createRecurringSlotController.create
    );
    this._router.get(
      "/fetchslots/:mentorId",
      validateReqParams(fetchavailabilityDto),
      this._fetchAvailabilityController.create
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
