import { Ship } from './battleship.js';

describe('test Ship factory function', () => {
    const testShip = Ship(4);

    test(`determine if ship is considered intact if there's at least one part intact`, () => {
        testShip.markHit(2);
        expect(testShip.checkSunk()).toBe(false);
    });

    test(`determine if ship sinks if all parts are hit`, () => {
        testShip.markHit(1);
        testShip.markHit(2);
        testShip.markHit(3);
        testShip.markHit(4);
        expect(testShip.checkSunk()).toBe(true);
    });
});