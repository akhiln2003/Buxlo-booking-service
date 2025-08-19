import { AvailabilityEntities } from "../../domain/entities/availabilityEntities";
import { AvailabilityResponseDto } from "../../zodSchemaDto/output/availabilityResponse.dto";

export interface IavailabilityRepository {
  create(data: AvailabilityEntities): Promise<AvailabilityResponseDto>;
  createRecurring(data: AvailabilityEntities): Promise<AvailabilityResponseDto|null>;
  findByMentorId(mentorId: string): Promise<AvailabilityResponseDto[]>;
  getAverageSalary(mentorId: string): Promise<number>;
}
