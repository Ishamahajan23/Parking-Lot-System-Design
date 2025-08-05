import { ITicket, IVehicle } from "../types";

class Ticket implements ITicket{
    id: string;
    vehicle: IVehicle;
    entryTime: Date;
    exitTime?: Date;

    constructor(id: string, vehicle: IVehicle) {
        this.id = id;
        this.vehicle = vehicle;
        this.entryTime = new Date();
    }

    setExitTime(): void {
        this.exitTime = new Date();
    }

    getParkingDurationInHours(): number {
        const exit = this.exitTime || new Date();
        const durationMs = exit.getTime() - this.entryTime.getTime();
        const durationHours = Math.ceil(durationMs / (1000 * 60 * 60)); // Round up to next hour
        return Math.max(1, durationHours); // Minimum 1 hour charge
    }
}

export default Ticket;