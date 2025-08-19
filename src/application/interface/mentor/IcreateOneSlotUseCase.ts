import { AvailabilityEntities } from "../../../domain/entities/availabilityEntities";
import { AvailabilityResponseDto } from "../../../zodSchemaDto/output/availabilityResponse.dto";

export interface IcreateOneSlotUseCase {
  execute(data: AvailabilityEntities): Promise<AvailabilityResponseDto | string>;
}
