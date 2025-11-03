export class AvailabilityEntities {
  constructor(
    public mentorId: string,
    public date: string,
    public startTime: string,
    public duration: number,
    public status: "available" | "booked" | "cancelled" | "pending",
    public isBooked: boolean,
    public salary: number,
    public createdAt: Date,
    public updatedAt: Date,
    public description?: string,
    public lockedUntil?: Date | null,
    public lockedBy?: string | null,
    public id?: string
  ) {}
}
