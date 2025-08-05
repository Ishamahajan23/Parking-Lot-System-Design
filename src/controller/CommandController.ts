import { ParkingLotController } from "./ParkingLotController";

class CommandController {
    parkingLotController: ParkingLotController;

    constructor(parkingLotController: ParkingLotController) {
        this.parkingLotController = parkingLotController;
    }

    executeCommand(command: string, ...args: Array<string | number>) {
        console.log('\nCOMMAND>>', command, args, '\n');
        const { parkingLotController } = this;
        switch(command) {
            case 'create_parking_lot':
                return parkingLotController.createParkingLot(...args as [string, number, number]);
            case 'park_vehicle':
                return parkingLotController.parkVehicle(...args as [string, string, string]);
            case 'unpark_vehicle':
                return parkingLotController.unparkVehicle(...args as [string]);
            case 'display':
                return parkingLotController.display(...args as [string, string]);
            default: 
                return 'Invalid Command';
        }
    }
}

export default CommandController;