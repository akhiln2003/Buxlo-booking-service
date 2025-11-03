import { AvailabilityResponseDto } from "../../dto/availabilityResponse.dto";

export interface ILockAvailabilityUseCase {
  execute(slotId: string, userId: string): Promise<AvailabilityResponseDto>;
}
