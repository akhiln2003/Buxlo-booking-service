import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { CreateOneSlotController } from "../controllers/mentor/createOneSlot.controller";
import {
  validateReqBody,
  validateReqParams,
  validateReqQueryParams,
} from "@buxlo/common";
import { CreateRecurringSlotController } from "../controllers/mentor/createRecurringSlot.controller";
import { FetchAvailabilityController } from "../controllers/mentor/fetchAvailability.controller";
import { createOneSlotDto } from "../dto/mentor/createOneSlot.dto";
import { createRecurringSlotDto } from "../dto/mentor/createRecurringSlot.dto";
import { fetchavailabilityDto } from "../dto/mentor/fetchavailability.dto";
import { deleteSlotDto } from "../dto/mentor/deleteSlot.dto";
import { DeleteAvailabilityController } from "../controllers/mentor/deleteAvailability.controller";

export class MentorRouter {
  private _router: Router;
  private _diContainer: DIContainer;

  private _createOneSlotController!: CreateOneSlotController;
  private _createRecurringSlotController!: CreateRecurringSlotController;
  private _fetchAvailabilityController!: FetchAvailabilityController;
  private _deleteAvailabilityController!: DeleteAvailabilityController;

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
    this._deleteAvailabilityController = new DeleteAvailabilityController(
      this._diContainer.deleteAvailabilityUseCase()
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
      "/fetchslots",
      validateReqQueryParams(fetchavailabilityDto),
      this._fetchAvailabilityController.create
    );
    this._router.delete(
      "/deleteslot/:id",
      validateReqParams(deleteSlotDto),
      this._deleteAvailabilityController.delete
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
