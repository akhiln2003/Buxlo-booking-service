import { AvailabilityResponseDto } from "../../../domain/zodSchemaDto/output/availabilityResponse.dto";

export interface ICreateRecurringSlotUseCaseProps {
  mentorId: string;
  days: string[];
  startTime: string;
  duration: number;
  startDate: string;
  endDate: string;
  salary: number;
  description?: string;
}
export interface ICreateRecurringSlotUseCase {
  execute(
    data: ICreateRecurringSlotUseCaseProps
  ): Promise<AvailabilityResponseDto[]>;
}
