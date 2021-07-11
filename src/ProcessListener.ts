import { spawn } from "child_process";
import { EventEmitter } from "events";
import { platform } from "os";
import { join } from "path";
import { GazeData } from "./GazeData";


export class ProcessListener extends EventEmitter {
    process: import("child_process").ChildProcessWithoutNullStreams | null = null;

    constructor() {
        super();

    }
    private get binPath(): string | null {
        const binMap: { [key in NodeJS.Platform | string]: string } = {
            "win32": join(__dirname, '/../bin/win/GazePointLogger.exe')
        }
        return binMap[platform()]

    }
    start() {
        if (this.process) {
            throw new Error('process already started')
        }
        if (this.binPath == null) {
            throw new Error('this platform doesn\'t support')
        }
        this.process = spawn(this.binPath)
        this.process.stdout.on('data', (chunk) => {
            this.chunkHandler(chunk)
        })
        this.process.on('close', () => {
            this.closeHandler();
        })
    }
    private closeHandler() {
        this.process = null;
        this.emit('restart')
        this.start()
    }
    private chunkHandler(chunk: Buffer) {
        const input = chunk.toString();
        const [x, y, ts] = input.split(',').map(n => parseFloat(n))

        this.emit('point', { x, y, ts } as GazeData)
    }
}
