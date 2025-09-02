import { IRecurringData } from "../../../domain/interfaces/IRecurringData";
import { AvailabilityResponseDto } from "../../../domain/zodSchemaDto/output/availabilityResponse.dto";

export interface ICreateRecurringSlotUseCase {
  execute(data: IRecurringData): Promise<AvailabilityResponseDto[]>;
}
