enum VehicleType {
    CAR = 'CAR',
    EV_CAR = 'EV_CAR',
    TRUCK = 'TRUCK',
    BIKE = 'BIKE'
}

interface IVehicle {
    type: VehicleType;
    regNo: string;
    color: string;
}

interface ISlot{
    id:number;
    type: VehicleType;
    isOccupied: boolean;
    floorId: number;
    isReservedForEV: boolean;
    occupy():void;
    release():void;
}

interface IFloor{
    id:number;
    slots:Array<ISlot>;
    addSlot(vehicleType:VehicleType, isReservedForEV?:boolean):void;
    getAvailableSlots(vehicleType?:VehicleType):Array<ISlot>;
    getOccupiedSlots(vehicleType?:VehicleType):Array<ISlot>;
}

interface ITicket{
    id:string;
    vehicle:IVehicle;
    entryTime: Date;
    exitTime?: Date;
}

interface IParkingStrategy{
    park(floors:Array<IFloor>, vehicle:IVehicle):ISlot|null;
}

interface IParkingCharges {
    [VehicleType.CAR]: number;
    [VehicleType.EV_CAR]: number;
    [VehicleType.TRUCK]: number;
    [VehicleType.BIKE]: number;
}

export {
    VehicleType,
    IVehicle,
    ISlot,
    IFloor,
    ITicket,
    IParkingStrategy,
    IParkingCharges};