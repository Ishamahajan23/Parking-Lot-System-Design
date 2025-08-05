import Ticket from "../model/Ticket";
import { ITicket, IVehicle } from "../types";

class TicketController {
    // Singleton Design Pattern

    private static instance: TicketController | null;
    
    static tickets = new Map<string, ITicket>();

    private constructor() {}
    static getInstance(): TicketController {
        if (!TicketController.instance) {
            TicketController.instance = new TicketController();
        }
        return TicketController.instance;
    }

    static generateTicket(lotId:string, slotId:string|number, floorId:string|number, vehicle:IVehicle){
        const ticketId = `${lotId}_${floorId}_${slotId}`;
        const ticket = new Ticket(ticketId, vehicle);
        TicketController.tickets.set(ticketId, ticket);
        return ticket;
    }

    static getTicketWithId(ticketId:string):ITicket|undefined{
        return TicketController.tickets.get(ticketId);
    }

    static deleteTicket(ticketId:string){
        return TicketController.tickets.delete(ticketId);
    }
}

export default TicketController;