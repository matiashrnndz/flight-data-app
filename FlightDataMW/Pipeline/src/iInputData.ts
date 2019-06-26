export interface IInputData {
    config: IInputDataConfig,
    id: string,
    YEAR: string,
    MONTH: string,
    DAY: string,
    DAY_OF_WEEK: string,
    FLIGHT_NUMBER: string,
    TAIL_NUMBER: string,
    SCHEDULED_DEPARTURE: string,
    DEPARTURE_TIME: string,
    DEPARTURE_DELAY: string,
    TAXI_OUT: string,
    WHEELS_OFF: string,
    SCHEDULED_TIME: string,
    ELAPSED_TIME: string,
    AIR_TIME: string,
    DISTANCE: string,
    WHEELS_ON: string,
    TAXI_IN: string,
    SCHEDULED_ARRIVAL: string,
    ARRIVAL_DELAY: string,
    DIVERTED: string,
    CANCELLED: string,
    CANCELLATION_REASON: string,
    AIR_SYSTEM_DELAY: string,
    SECURITY_DELAY: string,
    AIRLINE_DELAY: string,
    LATE_AIRCRAFT_DELAY : string,
    WEATHER_DELAY: string ,
    AIRLINE: string,
    AIRLINE_NAME: string,
    ORIGIN_AIRPORT: string,
    ORIGIN_AIRPORT_NAME: string,
    DESTINATION_AIRPORT: string,
    DESTINATION_AIRPORT_NAME: string
}

export interface IInputDataConfig {
    options: IInputDataConfigOptions,
    filters?: IInputDataConfigFilters[],
    transformations?: IInputDataConfigTransformations[],
    outputFields?: string[],
    //validations?: IInputDataConfigValidations[]
}

export interface IInputDataConfigOptions {
    idClient: string,
    airline: string,
    ip: string,
    port: string,
    protocol: string
}

export interface IInputDataConfigFilters {
    type: string,
    field?: string,
    params?: any[]
}

export interface IInputDataConfigTransformations {
    type: string,
    field?: string,
    params?: any[]
}

/*
export interface IInputDataConfigValidations {
    type: string,
    field?: string,
    params?: string[]
}
*/
