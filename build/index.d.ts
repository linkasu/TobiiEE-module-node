/// <reference types="node" />
import { EventEmitter } from "events";
export declare class TobiiProcess extends EventEmitter {
    process: import("child_process").ChildProcessWithoutNullStreams | null;
    constructor();
    private get binPath();
    start(): void;
    private closeHandler;
    private chunkHandler;
}
//# sourceMappingURL=index.d.ts.map