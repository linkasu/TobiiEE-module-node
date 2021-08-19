/// <reference types="node" />
import { EventEmitter } from "events";
export declare class TobiiProcess extends EventEmitter {
    process: import("child_process").ChildProcessWithoutNullStreams | null;
    options: TobiiOptions | undefined;
    constructor(options?: TobiiOptions);
    private get binPath();
    start(): void;
    private closeHandler;
    private chunkHandler;
}
interface TobiiOptions {
    path?: string;
}
export {};
//# sourceMappingURL=index.d.ts.map