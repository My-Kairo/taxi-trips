let assert = require("assert");
let TaxiTrips = require("../taxi-trips");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/taxi_trips';

const pool = new Pool({
    connectionString
});

describe('Taxi Trips', function () {

    // beforeEach(async function () {
        
    // });

    it('should find how many trips all the taxis made', async function () {

        const taxiTrips = TaxiTrips(pool);

        assert.equal(1, await taxiTrips.totalTripCount());
    

    });

    it('should find all the regions', async function () {

        const regions = TaxiTrips(pool);

        assert.deepStrictEqual([{'name': 'Durban'}, {'name': 'Cape Town'}, {'name': 'Gauteng'}], await regions.findAllRegions());

    });

    it('should find all the taxis for a region', async function () {
        const taxis = TaxiTrips(pool);

        assert.deepStrictEqual([], await taxis.findTaxisForRegion('Durban'));
        assert.deepStrictEqual([], await taxis.findTaxisForRegion('Cape Town'));
        assert.deepStrictEqual([], await taxis.findTaxisForRegion('Gauteng'));

    })

    it('should find all the trips for a reg number', async function () {

        const taxiTrips = TaxiTrips(pool);
        
        assert.deepStrictEqual(['Bellville, Langa, Gugulethu'], await taxiTrips.findTripsByRegNumber('CA 123-456'));
        assert.deepStrictEqual([], taxiTrips.findTripsByRegNumber('***'));

    });

    it('should find the total number of trips by region', async function () {

        const taxiTrips = TaxiTrips(pool);

        assert.deepStrictEqual([], taxiTrips.findTripsByRegion('Cape Town').length);
        assert.deepStrictEqual([], taxiTrips.findTripsByRegion('Gauteng').length);
        assert.deepStrictEqual([], taxiTrips.findTripsByRegion('Gauteng').length);

    });

    it('find the total income for a given reg number', async function () {

        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual(0, taxiTrips.findIncomeByRegNumber('...').length);
        assert.deepStrictEqual(0, taxiTrips.findIncomeByRegNumber('***').length);

    });

    it('find the total income for each taxi', async function () {

        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual([{}, {}, {}], taxiTrips.findTotalIncomePerTaxi());

    });

    it('find the total income for all the taxis', async function () {
        const taxiTrips = TaxiTrips(pool);
        assert.deepStrictEqual(0.00, taxiTrips.findTotalIncome());
    });


    after(function () {
        pool.end();
    });

});