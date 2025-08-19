import { AvailabilityResponseDto } from "../../../zodSchemaDto/output/availabilityResponse.dto";

export interface IfetchAvailabilityUseCase {
  execute(mentorId: string): Promise<AvailabilityResponseDto[]>;
}
