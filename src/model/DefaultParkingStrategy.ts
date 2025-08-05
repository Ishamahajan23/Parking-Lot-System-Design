import { IFloor, IParkingStrategy, ISlot, ITicket, IVehicle, VehicleType } from "../types";

class DefaultParkingStrategy implements IParkingStrategy {
    park(floors: IFloor[], vehicle: IVehicle): ISlot | null{
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
        for(let floor of floors){
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
                return suitableSlots[0];
            }
        }
        return null;
    }
    
}

export default DefaultParkingStrategy;