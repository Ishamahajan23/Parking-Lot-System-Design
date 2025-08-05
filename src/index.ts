import fs from 'fs';
import { join } from 'path';
import readLine from 'readline';
import CommandController from './controller/CommandController';
import { ParkingLotController } from './controller/ParkingLotController';

function readCommand() {
    const fileName = process.argv[2];
    const file = join(process.cwd(), fileName);
    if (!fs.existsSync(file)) {
        throw new Error(`${file} File not found`);
    }

    const rl = readLine.createInterface({
        input: fs.createReadStream(file)
    })
    const parkingLotController = new ParkingLotController();
    const commandController = new CommandController(parkingLotController);
    rl.on('line', (data) => {
        const [command, ...args] = data.split(' ');
        if (command === 'exit') {
            console.log('Exiting!!');
            return rl.close();
        }
        let resp = '';
        try {
            resp = commandController.executeCommand(command, ...args);
        } catch (e) {
            resp = 'Unknow Error';
            if (e instanceof Error) {
                resp = e.message
            }
        } finally {
            console.log('RESPONSE>>', resp);
        }
        
    });
}

readCommand();