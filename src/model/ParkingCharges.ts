import { IParkingCharges, VehicleType } from "../types";

class ParkingCharges {
    private static charges: IParkingCharges = {
        [VehicleType.CAR]: 20,
        [VehicleType.EV_CAR]: 25,
        [VehicleType.TRUCK]: 30,
        [VehicleType.BIKE]: 10
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
