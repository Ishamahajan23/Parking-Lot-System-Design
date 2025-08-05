import { IFloor, IParkingStrategy, ISlot, IVehicle, VehicleType } from "../types";

class RandomParkingStrategy implements IParkingStrategy{
    park(floors: Array<IFloor>, vehicle: IVehicle): ISlot | null {
        // For EV Cars, first try to find a reserved EV slot
        if (vehicle.type === VehicleType.EV_CAR) {
            const evReservedSlots: Array<ISlot> = [];
            floors.forEach((floor) => {
                const slots = floor.getAvailableSlots(vehicle.type);
                const evSlots = slots.filter(slot => slot.isReservedForEV);
                evReservedSlots.push(...evSlots);
            });
            
            if (evReservedSlots.length > 0) {
                const randomEvSlot = evReservedSlots[Math.floor(Math.random() * evReservedSlots.length)];
                return randomEvSlot;
            }
        }

        // For all vehicles (including EV cars if no reserved slot is available)
        const availableSlots: Array<ISlot> = [];
        floors.forEach((floor) => {
            let slots = floor.getAvailableSlots(vehicle.type);
            
            // For EV cars, if no EV slots available, also check CAR slots
            if (vehicle.type === VehicleType.EV_CAR && slots.length === 0) {
                slots = floor.getAvailableSlots(VehicleType.CAR);
            }
            
            // For non-EV vehicles, exclude EV reserved slots
            const suitableSlots = vehicle.type === VehicleType.EV_CAR 
                ? slots 
                : slots.filter(slot => !slot.isReservedForEV);
            availableSlots.push(...suitableSlots);
        });

        if (availableSlots.length === 0){
            return null;    
        }

        const randomSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
        return randomSlot;
    }
}

export default RandomParkingStrategy;