"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var tobii = new _1.TobiiProcess();
tobii.start();
tobii.on("point", function (_a) {
    var x = _a.x, y = _a.y, ts = _a.ts;
    console.log("Eye point is " + x + ", " + y);
});
//# sourceMappingURL=example.js.map