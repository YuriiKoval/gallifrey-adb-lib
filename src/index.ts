import { exec } from 'shelljs'
function convertToBoolean(input: string): boolean {
    try {
        return JSON.parse(input);
    }
    catch (e) {
        return false;
    }
}


var PSRunner = {
    send: function (command: string): adbresult {

        return exec(command);
    },
    installApk: function (path: string): adbresult {
        return exec('adb install ' + path);
    },
    battery: function (): batteryRes {
        const { stdout, stderr } = exec('adb shell dumpsys battery', { silent: true })
            const tmp: string = String(stdout);
            return {
                poweredAC: convertToBoolean(/AC powered:\s*(\S+)/.exec(tmp)![1]),
                poweredUSB: convertToBoolean(/USB powered:\s*(\S+)/.exec(tmp)![1]),
                poweredWireless: convertToBoolean(/Wireless powered:\s*(\S+)/.exec(tmp)![1]),
                maxChargingCurrent: Number(/Max charging current:\s*(\S+)/.exec(tmp)![1]),
                maxChargingVoltage: Number(/Max charging voltage:\s*(\S+)/.exec(tmp)![1]),
                chargeCounter: Number(/Charge counter:\s*(\S+)/.exec(tmp)![1]),
                status: Number(/status:\s*(\S+)/.exec(tmp)![1]),
                health: Number(/health:\s*(\S+)/.exec(tmp)![1]),
                present: convertToBoolean(/present:\s*(\S+)/.exec(tmp)![1]),
                level: Number(/level:\s*(\S+)/.exec(tmp)![1]),
                scale: Number(/scale:\s*(\S+)/.exec(tmp)![1]),
                voltage: Number(/voltage:\s*(\S+)/.exec(tmp)![1]),
                temperature: Number(/temperature:\s*(\S+)/.exec(tmp)![1]),
                technology: /technology:\s*(\S+)/.exec(tmp)![1]
            }
    }
};



var test = PSRunner.battery();
// var test = PSRunner.installApk('C:/Users/kleri/Downloads/pokemon-go-0-125-2.apk')
console.log(test);

interface adbresult {
    stderr: string;
    code: number;
}

interface batteryRes {
    poweredAC?: boolean;
    poweredUSB?: boolean;
    poweredWireless?: boolean;
    maxChargingCurrent?: number;
    maxChargingVoltage?: number;
    chargeCounter?: number;
    status?: number;
    health?: number;
    present?: boolean;
    level?: number;
    scale?: number;
    voltage?: number;
    temperature?: number;
    technology?: string;
}