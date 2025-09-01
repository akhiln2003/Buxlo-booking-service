import { IrecurringData } from "../../../domain/interfaces/IrecurringData";
import { AvailabilityResponseDto } from "../../../domain/zodSchemaDto/output/availabilityResponse.dto";

export interface IcreateRecurringSlotUseCase {
  execute(data: IrecurringData): Promise<AvailabilityResponseDto[]>;
}
