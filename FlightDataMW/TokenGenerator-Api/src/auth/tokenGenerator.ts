import { generateUUID } from "../generateUUID";
import { sign } from "../auth/jwt-adapter";
import { Logger } from '../logger/loggerApi';

export function generate(IATA_CODE) {

    let generatedUUID = generateUUID();
    let SERVICE_ID = `airline-${IATA_CODE}-${generatedUUID}`;
    let payload = {
        IATA_CODE: IATA_CODE,
        SERVICE_ID: SERVICE_ID
    }

    let issuer 	= 'AS_Obl';
    let subject = IATA_CODE;
    let audience = 'http://localhost:8097';

    let signOptions = {
        issuer: issuer,
        subject: subject,
        audience: audience,
        algorithm: "RS256"
    };

    let token = sign(payload, signOptions);

    Logger.info(`token generated : for Service ID: ${SERVICE_ID} - IATA_CODE: ${IATA_CODE} - TOKEN: ${token}`);

    return {
        SERVICE_ID: SERVICE_ID,
        IATA_CODE: IATA_CODE,
        TOKEN: token
    }
}
