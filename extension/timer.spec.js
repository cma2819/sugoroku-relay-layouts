"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const timer_1 = require("./timer");
(0, globals_1.describe)('Testing timer', () => {
    (0, globals_1.describe)('when initialize timer', () => {
        const timer = (0, timer_1.Timer)({
            start: new Date(Date.parse('2024-04-08T10:00:00Z')),
            end: new Date(Date.parse('2024-04-15T21:00:00Z')),
            isCountdown: true,
        });
        (0, globals_1.it)('should be get current time 0', () => {
            (0, globals_1.expect)(timer.getCurrentTimeInSeconds()).toBe(0);
        });
        (0, globals_1.it)('should display time as "00:00"', () => {
            (0, globals_1.expect)(timer.getDisplayTime()).toBe('00:00');
        });
    });
    (0, globals_1.describe)('when tick with 1000 ms after', () => {
        const timer = (0, timer_1.Timer)({
            start: new Date(Date.parse('2024-04-08T10:00:00Z')),
            end: new Date(Date.parse('2024-04-15T21:00:00Z')),
            isCountdown: true,
        });
        const tickTime = new Date(Date.parse('2024-04-08T10:00:00Z') + 1000);
        timer.tick(tickTime);
        (0, globals_1.it)('should be get current time as 1s after', () => {
            (0, globals_1.expect)(timer.getCurrentTimeInSeconds()).toBe(644400 - 1);
        });
        (0, globals_1.it)('should display time as 1s after', () => {
            (0, globals_1.expect)(timer.getDisplayTime()).toBe('178:59:59');
        });
    });
    (0, globals_1.describe)('when reach end time with countdown', () => {
        const timer = (0, timer_1.Timer)({
            start: new Date(Date.parse('2024-04-08T21:00:00Z')),
            end: new Date(Date.parse('2024-04-09T21:00:00Z')),
            isCountdown: true,
        });
        const tickTime = new Date(Date.parse('2024-04-09T22:23:45Z'));
        timer.tick(tickTime);
        (0, globals_1.it)('should be get current time as behind time', () => {
            (0, globals_1.expect)(timer.getCurrentTimeInSeconds()).toBe(0 - (3600 + 60 * 23 + 45));
        });
        (0, globals_1.it)('should display time behind time', () => {
            (0, globals_1.expect)(timer.getDisplayTime()).toBe('-1:23:45');
        });
    });
    (0, globals_1.describe)('when reach end time with counting', () => {
        const timer = (0, timer_1.Timer)({
            start: new Date(Date.parse('2024-04-08T21:00:00Z')),
            end: new Date(Date.parse('2024-04-09T21:00:00Z')),
            isCountdown: false,
        });
        const tickTime = new Date(Date.parse('2024-04-09T22:23:45Z'));
        timer.tick(tickTime);
        (0, globals_1.it)('should be get current time as behind time', () => {
            (0, globals_1.expect)(timer.getCurrentTimeInSeconds()).toBe(86400 + (3600 + 60 * 23 + 45));
        });
        (0, globals_1.it)('should display time', () => {
            (0, globals_1.expect)(timer.getDisplayTime()).toBe('25:23:45');
        });
    });
});
