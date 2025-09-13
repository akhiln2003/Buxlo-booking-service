import { AvailabilityResponseDto } from "../../dto/availabilityResponse.dto";

export interface IFetchAvailabilityUseCase {
  execute(mentorId: string): Promise<AvailabilityResponseDto[]>;
}
