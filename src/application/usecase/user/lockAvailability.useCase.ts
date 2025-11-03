import { IAvailabilityRepository } from "../../../infrastructure/@types/IAvailabilityRepository";
import {
  AvailabilityMapper,
  AvailabilityResponseDto,
} from "../../dto/availabilityResponse.dto";
import { ILockAvailabilityUseCase } from "../../interface/user/ILockAvailabilityUseCase";

export class LockAvailabilityUseCase implements ILockAvailabilityUseCase {
  constructor(private _availabilityRepo: IAvailabilityRepository) {}
  async execute(
    slotId: string,
    userId: string
  ): Promise<AvailabilityResponseDto> {
    const slot = await this._availabilityRepo.lockSlot(slotId, userId);

    return AvailabilityMapper.toDto(slot);
  }
}
