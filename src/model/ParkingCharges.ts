import { IParkingCharges, VehicleType } from "../types";

/**
 * ParkingCharges utility class to handle parking fee calculations
 */
class ParkingCharges {
    private static charges: IParkingCharges = {
        [VehicleType.CAR]: 20,      // 20 units/hour for Cars
        [VehicleType.EV_CAR]: 25,   // 25 units/hour for EV Cars
        [VehicleType.TRUCK]: 30,    // 30 units/hour for Trucks
        [VehicleType.BIKE]: 10      // 10 units/hour for Bikes
    };

    static calculateFee(vehicleType: VehicleType, durationInHours: number): number {
        const hourlyRate = this.charges[vehicleType];
        return hourlyRate * durationInHours;
    }

    static getHourlyRate(vehicleType: VehicleType): number {
        return this.charges[vehicleType];
    }

    static updateCharges(newCharges: Partial<IParkingCharges>): void {
        this.charges = { ...this.charges, ...newCharges };
    }
}

export default ParkingCharges;
