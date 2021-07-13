"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TobiiProcess = void 0;
var child_process_1 = require("child_process");
var events_1 = require("events");
var os_1 = require("os");
var path_1 = require("path");
var TobiiProcess = /** @class */ (function (_super) {
    __extends(TobiiProcess, _super);
    function TobiiProcess() {
        var _this = _super.call(this) || this;
        _this.process = null;
        return _this;
    }
    Object.defineProperty(TobiiProcess.prototype, "binPath", {
        get: function () {
            var binMap = {
                "win32": path_1.join(path_1.dirname(__filename), '/../bin/win/GazePointLogger.exe')
            };
            return binMap[os_1.platform()];
        },
        enumerable: false,
        configurable: true
    });
    TobiiProcess.prototype.start = function () {
        var _this = this;
        if (this.process) {
            throw new Error('process already started');
        }
        if (this.binPath == null) {
            throw new Error('this platform doesn\'t support');
        }
        this.process = child_process_1.spawn(this.binPath);
        this.process.stdout.on('data', function (chunk) {
            _this.chunkHandler(chunk);
        });
        this.process.on('close', function () {
            _this.closeHandler();
        });
    };
    TobiiProcess.prototype.closeHandler = function () {
        this.process = null;
        this.emit('restart');
        this.start();
    };
    TobiiProcess.prototype.chunkHandler = function (chunk) {
        var input = chunk.toString();
        var _a = input.split(',').map(function (n) { return parseFloat(n); }), x = _a[0], y = _a[1], ts = _a[2];
        this.emit('point', { x: x, y: y, ts: ts });
    };
    return TobiiProcess;
}(events_1.EventEmitter));
exports.TobiiProcess = TobiiProcess;
//# sourceMappingURL=index.js.map