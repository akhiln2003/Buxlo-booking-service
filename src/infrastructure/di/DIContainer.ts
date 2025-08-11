import { IcreateOneSlotUseCase } from "../../application/interface/mentor/IcreateOneSlotUseCase";
import { IcreateRecurringSlotUseCase } from "../../application/interface/mentor/IcreateRecurringSlotUseCase";
import { IfetchAvailabilityUseCase } from "../../application/interface/mentor/IfetchAvailabilityUseCase";
import { CreateOneSlotUseCase } from "../../application/usecase/mentor/createOneSlot.usecase";
import { CreateRecurringSlotUseCase } from "../../application/usecase/mentor/createRecurringSlot.usecase";
import { FetchAvailabilityUseCase } from "../../application/usecase/mentor/fetchAvailability.usecase";
import { AvailabilityRepository } from "../repositories/availability.Repository";

export class DIContainer {
  private _availability: AvailabilityRepository;

  constructor() {
    this._availability = new AvailabilityRepository();
  }

  createOneSlotUseCase(): IcreateOneSlotUseCase {
    return new CreateOneSlotUseCase(this._availability);
  }
  createRecurringSlotUseCase(): IcreateRecurringSlotUseCase {
    return new CreateRecurringSlotUseCase(this._availability);
  }

  fetchAvailabilityUseCase(): IfetchAvailabilityUseCase {
    return new FetchAvailabilityUseCase(this._availability);
  }
 
}
