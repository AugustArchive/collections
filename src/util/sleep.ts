/**
 * Asynchronously make the program "sleep"
 * @param ms The amount of milliseconds to "sleep"
 * @returns A promise that is resolved when the timer has reached it's end
 */
export default (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
