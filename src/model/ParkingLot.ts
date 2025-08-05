import TicketController from "../controller/TicketController";
import { IFloor, IParkingStrategy, ISlot, IVehicle, VehicleType } from "../types";
import Floor from "./Floor";
import Ticket from "./Ticket";
import ParkingCharges from "./ParkingCharges";

export class ParkingLot{
    id:string;
    floors:Array<IFloor>;
    private parkingStrategy:IParkingStrategy;

    constructor(id:string, parkingStrategy:IParkingStrategy){
        this.id = id;
        this.parkingStrategy = parkingStrategy;
        this.floors = [];
    }


    addFloors(floorsToAdd:number){
        for(let i=1;i<=floorsToAdd;i++){
            this.floors.push(new Floor(i));
        }
    }

    setParkingStrategy(parkingStrategy:IParkingStrategy){
        this.parkingStrategy = parkingStrategy;
    }

    parkVehicle(vehicle:IVehicle){
        const slotToBook = this.parkingStrategy.park(this.floors, vehicle);
        if(slotToBook){
            slotToBook.occupy();
            const ticket = TicketController.generateTicket(this.id, slotToBook.id, slotToBook.floorId, vehicle);

            return ticket;
        }

        throw new Error("No slots available");

    }

    getFreeSlots(vehicleType: VehicleType, showSlots: boolean = false) {
        const floors = this.floors;
        const freeSlots: { [x: string]: ISlot[] | number } = {};
        
        floors.forEach(floor => {
            const availableSlots = floor.getAvailableSlots(vehicleType);
            freeSlots[floor.id] = showSlots ? availableSlots : availableSlots.length;
        });
        return freeSlots;
    }

    getOccupiedSlots(vehicleType: VehicleType) {
        const floors = this.floors;
        const occupiedSlots: { [x: string]: ISlot[] | number } = {};
        
        floors.forEach(floor => {
            occupiedSlots[floor.id] = floor.getOccupiedSlots(vehicleType);
        });
        return occupiedSlots;
    }

    unParkVehicle(ticketId:string){
        const ticket = TicketController.getTicketWithId(ticketId);

        if(ticket){
            const [parkingLotId, floorId, slotId] = ticketId.split('_');

            const floor = this.floors[Number(floorId)-1];
            const slot = floor.slots[Number(slotId)-1];
            slot.release();
            
            (ticket as Ticket).setExitTime();
            const duration = (ticket as Ticket).getParkingDurationInHours();
            const totalFee = ParkingCharges.calculateFee(ticket.vehicle.type, duration);
            
            TicketController.deleteTicket(ticketId);

            return `Unparked vehicle with Registration Number: ${ticket.vehicle.regNo} and Color: ${ticket.vehicle.color}. Parking Charges: ${totalFee} units (${duration} hour${duration > 1 ? 's' : ''} at ${ParkingCharges.getHourlyRate(ticket.vehicle.type)} units/hour)`;
        }

        throw new Error("Invalid Ticket!!");
    }

}

export default ParkingLot;