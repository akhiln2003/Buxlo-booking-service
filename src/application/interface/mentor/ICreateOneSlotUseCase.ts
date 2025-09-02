import { AvailabilityEntities } from "../../../domain/entities/availabilityEntities";
import { AvailabilityResponseDto } from "../../../domain/zodSchemaDto/output/availabilityResponse.dto";

export interface ICreateOneSlotUseCase {
  execute(data: AvailabilityEntities): Promise<AvailabilityResponseDto | string>;
}
