import { AvailabilityResponseDto } from "../../../domain/zodSchemaDto/output/availabilityResponse.dto";

export interface IFetchAvailabilityUseCase {
  execute(mentorId: string): Promise<AvailabilityResponseDto[]>;
}
