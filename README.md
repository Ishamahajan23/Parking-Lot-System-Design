# Parking Lot System Design

A comprehensive parking lot management system implemented in TypeScript that supports multiple vehicle types, parking strategies, and advanced features like EV slot reservation and hourly billing.

## Features Implemented

### 1. **New Parking Strategy: ClosestFirstParkingStrategy**

- Parks vehicles in the closest available slot starting from the first floor and first slot
- Prioritizes EV reserved slots for EV cars
- Falls back to regular slots when reserved slots are full

### 2. **New Vehicle Types**

- **EV_CAR**: Electric vehicles with special parking privileges
- **CAR**: Standard non-electric vehicles
- **TRUCK**: Large vehicles (original)
- **BIKE**: Two-wheeler vehicles (original)

### 3. **Reserved EV Slots**

- At least one slot per floor is reserved exclusively for EV cars
- EV cars get priority access to these reserved slots
- When EV reserved slots are full, EV cars can park in regular CAR slots
- Regular cars cannot park in EV reserved slots

### 4. **Hourly Parking Charges**

- **Cars**: 20 units/hour
- **EV Cars**: 25 units/hour
- **Trucks**: 30 units/hour
- **Bikes**: 10 units/hour
- Automatic calculation based on entry and exit time
- Minimum 1-hour charge, rounded up to the nearest hour

## Architecture

### Project Structure

```
src/
├── types.ts              # Type definitions and interfaces
├── index.ts              # Main entry point
├── controller/
│   ├── CommandController.ts     # Command parsing and routing
│   ├── ParkingLotController.ts  # Business logic controller
│   └── TicketController.ts      # Ticket management
└── model/
    ├── ParkingLot.ts           # Main parking lot model
    ├── Floor.ts                # Floor management
    ├── Slot.ts                 # Individual parking slot
    ├── Vehicle.ts              # Vehicle model
    ├── Ticket.ts               # Parking ticket with timing
    ├── ParkingCharges.ts       # Billing calculation
    ├── DefaultParkingStrategy.ts    # Original strategy
    ├── RandomParkingStrategy.ts     # Random slot allocation
    └── ClosestFirstParkingStrategy.ts # New closest-first strategy
```

### Key Design Patterns

- **Strategy Pattern**: Pluggable parking strategies
- **Singleton Pattern**: Ticket management
- **Factory Pattern**: Vehicle and slot creation
- **Interface Segregation**: Clean separation of concerns

## Installation and Setup

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Build the project:**

```bash
npm run build
```

3. **Run with command file:**

```bash
npm start <command_file.txt>
```

## Usage Examples

### Command File Format

```
create_parking_lot <lot_id> <floors> <slots_per_floor>
park_vehicle <vehicle_type> <registration_number> <color>
unpark_vehicle <ticket_id>
display <display_type> <vehicle_type>
exit
```

### Sample Commands

```
create_parking_lot MasaiLot 3 6
park_vehicle CAR KA-01-DB-1234 black
park_vehicle EV_CAR KA-02-EV-5678 white
park_vehicle BIKE KA-03-BK-9012 red
display free_count CAR
display occupied_slots EV_CAR
unpark_vehicle MasaiLot_1_4
exit
```

### Sample Output

```
Created parking lot 3 floors and 6 slots per floor
Parked vehicle. Ticket ID: MasaiLot_1_5
Parked vehicle. Ticket ID: MasaiLot_1_4
Parked vehicle. Ticket ID: MasaiLot_1_2
Free slots for CAR on Floor 1: 1
Free slots for CAR on Floor 2: 2
Free slots for CAR on Floor 3: 2
Occupied slots for EV_CAR on Floor 1: 4
Unparked vehicle with Registration Number: KA-02-EV-5678 and Color: white. Parking Charges: 25 units (1 hour at 25 units/hour)
```

## Design Decisions and Assumptions

### 1. **EV Slot Allocation**

- **Decision**: Create dedicated EV_CAR slots rather than just reserving CAR slots
- **Rationale**: Better separation of concerns and clearer slot management
- **Assumption**: Each floor has exactly one EV slot (slot #4 in our 6-slot configuration)

### 2. **EV Overflow Handling**

- **Decision**: Allow EV cars to park in regular CAR slots when EV slots are full
- **Rationale**: Prevents EV cars from being completely blocked when dedicated slots are occupied
- **Assumption**: EV cars have charging capabilities that make regular slots usable

### 3. **Parking Charges**

- **Decision**: Round up to the nearest hour for billing
- **Rationale**: Simplifies billing and is industry standard
- **Assumption**: Entry and exit times are accurately tracked

### 4. **Floor Numbering**

- **Decision**: Floors are numbered starting from 1
- **Rationale**: More intuitive for users
- **Assumption**: Ground floor is floor 1

### 5. **Slot Configuration per Floor**

- **Slot 1**: TRUCK
- **Slots 2-3**: BIKE
- **Slot 4**: EV_CAR (reserved)
- **Slots 5-6**: CAR

## Testing

The system includes comprehensive test files:

- `test_commands_v2.txt`: Basic functionality testing
- `test_ev_overflow.txt`: EV slot overflow scenarios

Run tests with:

```bash
npm run build && node dist/index.js test_commands_v2.txt
```

## Future Enhancements

1. **Dynamic Pricing**: Time-based or demand-based pricing
2. **Reservation System**: Pre-booking of slots
3. **Multiple Parking Strategies**: Load balancing across floors
4. **Payment Integration**: Credit card and digital wallet support
5. **Analytics Dashboard**: Usage statistics and revenue tracking

## Error Handling

- Invalid commands return appropriate error messages
- Ticket validation prevents invalid unpark operations
- Slot availability checks prevent double occupancy
- Graceful handling of edge cases (full parking lot, invalid vehicle types)

---

_This implementation demonstrates clean architecture principles, extensibility, and real-world parking lot management requirements._
