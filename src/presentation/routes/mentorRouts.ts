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
  private router: Router;
  private diContainer: DIContainer;

  private createOneSlotController!: CreateOneSlotController;
  private createRecurringSlotController!: CreateRecurringSlotController;
  private fetchAvailabilityController!: FetchAvailabilityController;

  constructor() {
    this.router = Router();
    this.diContainer = new DIContainer();
    this.initializeControllers();
    this.initializeRoutes();
  }

  private initializeControllers(): void {
    this.createOneSlotController = new CreateOneSlotController(
      this.diContainer.createOneSlotUseCase()
    );
    this.createRecurringSlotController = new CreateRecurringSlotController(
      this.diContainer.createRecurringSlotUseCase()
    );
    this.fetchAvailabilityController = new FetchAvailabilityController(
      this.diContainer.fetchAvailabilityUseCase()
    );
  }

  private initializeRoutes(): void {
    this.router.post(
      "/createoneslot",
      validateReqBody(createOneSlotDto),
      this.createOneSlotController.create
    );
    this.router.post(
      "/createrecurringslot",
      validateReqBody(createRecurringSlotDto),
      this.createRecurringSlotController.create
    );
    this.router.get(
      "/fetchslots/:mentorId",
      validateReqParams(fetchavailabilityDto),
      this.fetchAvailabilityController.create
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
