import { AvailabilityResponseDto } from "../../dto/availabilityResponse.dto";

export interface IDeleteAvailabilityUseCase {
  execute(id: string): Promise<AvailabilityResponseDto>;
}
