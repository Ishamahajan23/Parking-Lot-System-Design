import { IFloor, IParkingStrategy, ISlot, IVehicle, VehicleType } from "../types";

/**
 * ClosestFirstParkingStrategy - Parks vehicles in the closest available slot
 * starting from the first floor and first slot
 */
class ClosestFirstParkingStrategy implements IParkingStrategy {
    park(floors: IFloor[], vehicle: IVehicle): ISlot | null {
        // For EV Cars, first try to find a reserved EV slot
        if (vehicle.type === VehicleType.EV_CAR) {
            for (let floor of floors) {
                const availableSlots = floor.getAvailableSlots(vehicle.type);
                const evReservedSlot = availableSlots.find(slot => slot.isReservedForEV);
                if (evReservedSlot) {
                    return evReservedSlot;
                }
            }
        }

        // For all vehicles (including EV cars if no reserved slot is available),
        // find the first available slot of the compatible type
        for (let floor of floors) {
            let availableSlots = floor.getAvailableSlots(vehicle.type);
            
            // For EV cars, if no EV slots available, also check CAR slots
            if (vehicle.type === VehicleType.EV_CAR && availableSlots.length === 0) {
                availableSlots = floor.getAvailableSlots(VehicleType.CAR);
            }
            
            // For non-EV vehicles, exclude EV reserved slots
            const suitableSlots = vehicle.type === VehicleType.EV_CAR 
                ? availableSlots 
                : availableSlots.filter(slot => !slot.isReservedForEV);
                
            if (suitableSlots.length > 0) {
                // Sort by slot ID to get the closest slot
                suitableSlots.sort((a, b) => a.id - b.id);
                return suitableSlots[0];
            }
        }

        return null;
    }
}

export default ClosestFirstParkingStrategy;
