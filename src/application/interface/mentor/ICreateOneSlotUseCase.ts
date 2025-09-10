import { AvailabilityResponseDto } from "../../../domain/zodSchemaDto/output/availabilityResponse.dto";

export interface ICreateOneSlotUseCaseProps {
  mentorId: string;
  date: string;
  startTime: string;
  duration: number;
  status: "available" | "booked" | "cancelled" | "pending";
  isBooked: boolean;
  salary: number;
  description?: string;
}

export interface ICreateOneSlotUseCase {
  execute(
    data: ICreateOneSlotUseCaseProps
  ): Promise<AvailabilityResponseDto | string>;
}
