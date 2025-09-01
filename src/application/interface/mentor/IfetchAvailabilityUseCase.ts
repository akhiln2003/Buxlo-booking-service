import { AvailabilityResponseDto } from "../../../domain/zodSchemaDto/output/availabilityResponse.dto";

export interface IfetchAvailabilityUseCase {
  execute(mentorId: string): Promise<AvailabilityResponseDto[]>;
}
