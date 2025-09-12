import { AvailabilityEntities } from "../../domain/entities/availability.entities";

export interface IAvailabilityRepository {
  create(data: Partial<AvailabilityEntities>): Promise<AvailabilityEntities>;
  createRecurring(
    data: AvailabilityEntities
  ): Promise<AvailabilityEntities | null>;
  findById(id: string): Promise<AvailabilityEntities | null>;
  update(
    id: string,
    data: Partial<AvailabilityEntities>
  ): Promise<AvailabilityEntities>;
  findByMentorId(
    mentorId: string,
    fromDate?: string
  ): Promise<AvailabilityEntities[]>;
  getAverageSalary(mentorId: string): Promise<number>;
}
