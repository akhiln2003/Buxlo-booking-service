import { ICreateOneSlotUseCase } from "../../application/interface/mentor/ICreateOneSlotUseCase";
import { ICreateRecurringSlotUseCase } from "../../application/interface/mentor/ICreateRecurringSlotUseCase";
import { IFetchAvailabilityUseCase } from "../../application/interface/mentor/IFetchAvailabilityUseCase";
import { CreateOneSlotUseCase } from "../../application/usecase/mentor/createOneSlot.usecase";
import { CreateRecurringSlotUseCase } from "../../application/usecase/mentor/createRecurringSlot.usecase";
import { FetchAvailabilityUseCase } from "../../application/usecase/mentor/fetchAvailability.usecase";
import { AvailabilityRepository } from "../repositories/availability.Repository";

export class DIContainer {
  private _availability: AvailabilityRepository;

  constructor() {
    this._availability = new AvailabilityRepository();
  }

  createOneSlotUseCase(): ICreateOneSlotUseCase {
    return new CreateOneSlotUseCase(this._availability);
  }
  createRecurringSlotUseCase(): ICreateRecurringSlotUseCase {
    return new CreateRecurringSlotUseCase(this._availability);
  }

  fetchAvailabilityUseCase(): IFetchAvailabilityUseCase {
    return new FetchAvailabilityUseCase(this._availability);
  }
 
}
