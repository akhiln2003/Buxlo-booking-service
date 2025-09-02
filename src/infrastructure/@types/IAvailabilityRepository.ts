import { AvailabilityEntities } from "../../domain/entities/availabilityEntities";

export interface IAvailabilityRepository {
  create(data: AvailabilityEntities): Promise<AvailabilityEntities>;
  createRecurring(
    data: AvailabilityEntities
  ): Promise<AvailabilityEntities | null>;
  findById(id: string): Promise<AvailabilityEntities | null>;
  update(
    id: string,
    data: Partial<AvailabilityEntities>
  ): Promise<AvailabilityEntities>;
  findByMentorId(mentorId: string): Promise<AvailabilityEntities[]>;
  getAverageSalary(mentorId: string): Promise<number>;
}
