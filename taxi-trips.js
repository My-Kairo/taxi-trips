module.exports = function TaxiTrips(pool) {

    // return the total number of trips made
    async function totalTripCount(){
        var trips = await pool.query('select count(*) from trip');
        return trips.rows[0].count;
    }

    // find all the regions
    async function findAllRegions(){
        var regions = await pool.query('select name from region');
        return regions.rows;
    }

    async function findTaxisForRegion(region){
        var taxi = await pool.query('select * from taxi where regNumber = $1', [region]);
        return taxi.rows;

    }

    async function findTripsByRegNumber(reg_number){
        var trip = await pool.query('select * from trip where taxi_id = $1', [reg_number]);
        return trip.rows;
    }

    async function findTripsByRegion(){

    }

    async function findIncomeByRegNumber(){

    }

    async function findTotalIncome(){

    }

    async function findTotalIncomeByRegion(){

    }

    return {
        totalTripCount,
        findAllRegions,
        findTaxisForRegion,
        findTripsByRegNumber,
        findTripsByRegion,
        findIncomeByRegNumber,
        findTotalIncome,
        findTotalIncomeByRegion
    }
	
}