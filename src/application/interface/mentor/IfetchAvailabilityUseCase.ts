import { AvailabilityEntities } from "../../../domain/entities/availabilityEntities";

export interface IfetchAvailabilityUseCase {
  execute(mentorId: string): Promise<AvailabilityEntities[]>;
}
