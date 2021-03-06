import { Ship, makeShipByName } from './battleship.js';
import { Gameboard } from './gameboard.js';

describe('test ship placement method', () => {
    test('places ship vertically on a valid coordinates', () => {
        const testBoard = Gameboard();
        const verticalShip = makeShipByName('destroyer');
        testBoard.placeShip(verticalShip, 'vertical', 2, 4);
        const testCoordsX = testBoard.boardInfo.occupiedCoords[1].x;
        const testCoordsY = testBoard.boardInfo.occupiedCoords[1].y;
        const testCoords = { x: testCoordsX, y: testCoordsY };
        expect(testCoords).toEqual({x: 2, y: 5});
    });

    test('places ship horizontally on a valid coordinates', () => {
        const testBoard = Gameboard();
        const horizontalShip = makeShipByName('destroyer');
        testBoard.placeShip(horizontalShip, 'horizontal', 1, 1);
        const testCoordsX = testBoard.boardInfo.occupiedCoords[1].x;
        const testCoordsY = testBoard.boardInfo.occupiedCoords[1].y;
        const testCoords = { x: testCoordsX, y: testCoordsY };
        expect(testCoords).toEqual({x: 2, y: 1});
    });
});

describe('test determineAllSunk()', () => {
    test('checks if all ships on the board are sunk', () => {
        const testBoard = Gameboard();
        const testShip = Ship('foo', 2);
        testBoard.placeShip(testShip, 'vertical', 2, 4);
        testBoard.receiveAttack(2, 4);
        testBoard.receiveAttack(2, 5);
        const sunkStatus = testBoard.determineAllSunk();
        expect(sunkStatus).toEqual(true);
    });

    test('checks if all ships on the board are not sunk', () => {
        const testBoard = Gameboard();
        const testShip = Ship('bar', 2);
        testBoard.placeShip(testShip, 'vertical', 2, 4);
        testBoard.receiveAttack(2, 4);
        testBoard.receiveAttack(2, 6);
        const sunkStatus = testBoard.determineAllSunk();
        expect(sunkStatus).toBe(false);
    });
});

describe('test gameboard attack response', () => {
    const testBoard = Gameboard();
    const testShip = Ship('foobar', 2);
    testBoard.placeShip(testShip, 'vertical', 2, 4);

    test('receives hits', () => {
        const result = testBoard.receiveAttack(2, 5);
        expect(result).toEqual('hit');
    });

    test('records missed hits', () => {
        const result = testBoard.receiveAttack(2, 6);
        expect(result).toEqual('miss');
    });
});
