
describe('Exmples', () => {

    let x = 0;
    beforeEach(() => {
        x = 15;
    });

    it('Test asserts', function () {
        expect(x).toBe(15);
        expect(x).not.toBe(0);
    });

    it('Test asserts', function () {
        const negNelly = false;
        const nullNelly = null;
        const posPete = 23;

        expect(negNelly).toBeFalsy();
        expect(nullNelly).toBeFalsy();
        expect(posPete).not.toBeFalsy();
        expect(posPete).toBeTruthy();
    });


    it('Tests objects', function () {

        const x1 = { id: 1, name: 'jake' };
        const y1 = { id: 1, name: 'jake' };
        expect(x1).toEqual(y1);
    });


    it('Can Check for undefined', function () {
        const x1 = { id: 1, name: 'jake' };

        expect(x1.id).not.toBeUndefined();
        expect(x1['foof']).toBeUndefined();
    });



    it('Test regular expressions', function () {
        const message = 'alpha beta delta';
        expect(message).toMatch(/alpha/);
        expect(message).toMatch('beta');
        expect(message).not.toMatch(/gamma/);
    });


    it('test throws an exception or not', function () {
        let fooCall = function () {
            return 1 + 2;
        };
        let barCall = function () {
            return a + 1;
        };
        let bazCall = function () {
            throw 'what';
        };

        expect(fooCall).not.toThrow();
        expect(barCall).toThrow();
        expect(bazCall).toThrow('what');
    });

});
 