# TobiiEE-module-node

Library for using tobii eye devices with node js

## Usage

```js
import { TobiiProcess } from "tobiiee";

const tobii = new TobiiProcess()

tobii.start()

tobii.on("point", ({ x, y, ts }) => {
    console.log("Eye point is " + x + ", " + y);
})
```
