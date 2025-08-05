import { IFloor, IParkingStrategy, ISlot, IVehicle, VehicleType } from "../types";

class ClosestFirstParkingStrategy implements IParkingStrategy {
    park(floors: IFloor[], vehicle: IVehicle): ISlot | null {
        if (vehicle.type === VehicleType.EV_CAR) {
            for (let floor of floors) {
                const availableSlots = floor.getAvailableSlots(vehicle.type);
                const evReservedSlot = availableSlots.find(slot => slot.isReservedForEV);
                if (evReservedSlot) {
                    return evReservedSlot;
                }
            }
        }

        for (let floor of floors) {
            let availableSlots = floor.getAvailableSlots(vehicle.type);
            
            if (vehicle.type === VehicleType.EV_CAR && availableSlots.length === 0) {
                availableSlots = floor.getAvailableSlots(VehicleType.CAR);
            }
            
            const suitableSlots = vehicle.type === VehicleType.EV_CAR 
                ? availableSlots 
                : availableSlots.filter(slot => !slot.isReservedForEV);
                
            if (suitableSlots.length > 0) {
                suitableSlots.sort((a, b) => a.id - b.id);
                return suitableSlots[0];
            }
        }

        return null;
    }
}

export default ClosestFirstParkingStrategy;
