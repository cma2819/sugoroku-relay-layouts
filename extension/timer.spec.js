"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const timer_1 = require("./timer");
(0, globals_1.describe)("Testing timer", () => {
    (0, globals_1.describe)("when initialize timer", () => {
        const timer = (0, timer_1.Timer)({
            start: new Date(Date.parse("2024-04-08T10:00:00Z")),
            end: new Date(Date.parse("2024-04-15T21:00:00Z")),
        });
        (0, globals_1.it)("should be get current time 0", () => {
            (0, globals_1.expect)(timer.getCurrentTimeInSeconds()).toBe(0);
        });
        (0, globals_1.it)("should both of display times are set", () => {
            (0, globals_1.expect)(timer.getDisplayTime()).toEqual({
                up: "00:00",
                down: "179:00:00",
            });
        });
    });
    (0, globals_1.describe)("when tick with 1000 ms after", () => {
        const timer = (0, timer_1.Timer)({
            start: new Date(Date.parse("2024-04-08T10:00:00Z")),
            end: new Date(Date.parse("2024-04-15T21:00:00Z")),
        });
        const tickTime = new Date(Date.parse("2024-04-08T10:00:00Z") + 1000);
        timer.tick(tickTime);
        (0, globals_1.it)("should be get current time as 1s after", () => {
            (0, globals_1.expect)(timer.getCurrentTimeInSeconds()).toBe(1);
        });
        (0, globals_1.it)("should display time as 1s after", () => {
            (0, globals_1.expect)(timer.getDisplayTime().up).toBe("00:01");
            (0, globals_1.expect)(timer.getDisplayTime().down).toBe("178:59:59");
        });
    });
    (0, globals_1.describe)("when reach end time", () => {
        const timer = (0, timer_1.Timer)({
            start: new Date(Date.parse("2024-04-08T21:00:00Z")),
            end: new Date(Date.parse("2024-04-09T21:00:00Z")),
        });
        const tickTime = new Date(Date.parse("2024-04-09T22:23:45Z"));
        timer.tick(tickTime);
        (0, globals_1.it)("should be get current time as behind time", () => {
            (0, globals_1.expect)(timer.getCurrentTimeInSeconds()).toBe(3600 * 25 + 60 * 23 + 45);
        });
        (0, globals_1.it)("should display time behind time", () => {
            (0, globals_1.expect)(timer.getDisplayTime().up).toBe("25:23:45");
            (0, globals_1.expect)(timer.getDisplayTime().down).toBe("-1:23:45");
        });
    });
});
