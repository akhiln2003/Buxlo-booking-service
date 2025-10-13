import { AvailabilityResponseDto } from "../../dto/availabilityResponse.dto";

export interface IFetchAvailabilityUseCase {
  execute(
    mentorId: string,
    page: number,
    searchData?: string
  ): Promise<{ slots: AvailabilityResponseDto[]; totalPages: number }>;
}
