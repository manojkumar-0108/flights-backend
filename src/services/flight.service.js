const { AppError, InternalServerError } = require('../errors/');
const { StatusCodes } = require('http-status-codes');
const { Logger } = require('../config');

const { FlightRepository } = require('../repositories');
const { FlightFilter } = require('../utils/helpers');

const flightRepository = new FlightRepository();

async function createFlight(data) {

    try {
        const response = await flightRepository.create(data);
        return response;
    } catch (error) {

        if (error.name == 'SequelizeValidationError') {

            let explanation = [];

            error.errors.forEach((err) => {
                explanation.push(err.message);
            });


            Logger.error({ message: "Something went wrong doing validation", error: error });

            throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);
        }

        Logger.error({ message: "Cannot update seats in flight", error: error });
        throw new InternalServerError("Cannot update seats in Flight Object");

    }

}


async function getAllFlights(query) {

    try {
        const customFilter = FlightFilter.generateCustomFilter(query);
        const response = await flightRepository.getAllFlights(customFilter);
        return response;

    } catch (error) {


        if (error.name == 'SequelizeValidationError') {

            let explanation = [];

            error.errors.forEach((err) => {
                explanation.push(err.message);
            });


            Logger.error({ message: "Something went wrong doing validation", error: error });

            throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);
        }

        throw new InternalServerError("Cannot get Flights");

    }

}

async function getFlight(id) {

    try {

        const response = await flightRepository.getFlight(id);
        return response;

    } catch (error) {

        if (error.name == 'SequelizeValidationError') {

            let explanation = [];

            error.errors.forEach((err) => {
                explanation.push(err.message);
            });


            Logger.error({ message: "Something went wrong doing validation", error: error });

            throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);
        }

        Logger.error({ message: "Cannot get a flight", error: error });
        throw new InternalServerError("Cannot get Flights");

    }

}

async function updateSeats(data) {

    try {

        const response = await flightRepository.updateReaminigSeats(
            data.flightId,
            data.seats,
            data.decrease);

        return response;

    } catch (error) {

        if (error.name == 'SequelizeValidationError') {

            let explanation = [];

            error.errors.forEach((err) => {
                explanation.push(err.message);
            });


            Logger.error({ message: "Something went wrong doing validation", error: error });

            throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);
        }

        Logger.error({ message: "Cannot update seats in flight", error: error });
        throw new InternalServerError("Cannot update seats in flight");

    }

}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}