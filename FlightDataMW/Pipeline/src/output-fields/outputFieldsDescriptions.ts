export var outputFieldsDescriptions = () : string => {
    let outputFieldsDescriptions =
    ` 
--------- Start of OutputFields available ---------

Select one or more from this array and use :

[
    TIMESTAMP,
    YEAR,
    MONTH,
    DAY,
    DAY_OF_WEEK,
    FLIGHT_NUMBER,
    TAIL_NUMBER,
    SCHEDULED_DEPARTURE,
    DEPARTURE_TIME,
    DEPARTURE_DELAY,
    TAXI_OUT,
    WHEELS_OFF,
    SCHEDULED_TIME,
    ELAPSED_TIME,
    AIR_TIME,
    DISTANCE,
    WHEELS_ON,
    TAXI_IN,
    SCHEDULED_ARRIVAL,
    ARRIVAL_DELAY,
    DIVERTED,
    CANCELLED,
    CANCELLATION_REASON,
    AIR_SYSTEM_DELAY,
    SECURITY_DELAY,
    AIRLINE_DELAY,
    LATE_AIRCRAFT_DELAY,
    WEATHER_DELAY,
    AIRLINE,
    AIRLINE_NAME,
    ORIGIN_AIRPORT,
    ORIGIN_AIRPORT_NAME,
    DESTINATION_AIRPORT,
    DESTINATION_AIRPORT_NAME
]
    `
    return outputFieldsDescriptions;
};