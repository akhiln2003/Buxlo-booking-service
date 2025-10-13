import { AvailabilityResponseDto } from "../../dto/availabilityResponse.dto";

export interface IUserFetchAvailabilityUseCase {
  execute(mentorId: string): Promise<AvailabilityResponseDto[]>;
}
