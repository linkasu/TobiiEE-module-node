import { TobiiProcess } from ".";

const tobii = new TobiiProcess()

tobii.start()

tobii.on("point", ({ x, y, ts }) => {
    console.log("Eye point is " + x + ", " + y);
})