import { AvailabilityEntities } from "../../domain/entities/availabilityEntities";

export interface IavailabilityRepository {
  create(data: AvailabilityEntities): Promise<AvailabilityEntities>;
  createRecurring(data: AvailabilityEntities): Promise<AvailabilityEntities|null>;
  findByMentorId(mentorId: string): Promise<AvailabilityEntities[]>;
  getAverageSalary(mentorId: string): Promise<number>;
}
