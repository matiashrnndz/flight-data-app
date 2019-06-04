export default class airport {

    public IATA_CODE : string;
    public AIRPORT : string;
    public CITY : string;
    public STATE : string;
    public COUNTRY : string;
    public LATITUDE : number;
    public LONGITUDE : number;

    
    public constructor(IATA_CODE:string, AIRPORT:string, CITY:string, STATE:string, COUNTRY:string, LATITUDE:number, LONGITUDE:number) {
        this.IATA_CODE = IATA_CODE;
        this.AIRPORT = AIRPORT;
        this.CITY = CITY;
        this.STATE = STATE;
        this.COUNTRY = COUNTRY;
        this.LATITUDE = LATITUDE;
        this.LONGITUDE = LONGITUDE;
    }
}