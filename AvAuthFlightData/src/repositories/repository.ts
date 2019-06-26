import * as Config from 'config'
import * as Mongoose from 'mongoose';
import { Flight } from '../models/flight';
import { Airline } from '../models/airline';
import { Airport } from '../models/airport';

const Schema = Mongoose.Schema;

export class Repository {

    static connection: typeof Mongoose;

    static Flight: Mongoose.Model<any, {}>;
    static Airline: Mongoose.Model<any, {}>;
    static Airport: Mongoose.Model<any, {}>;

    private constructor() { }

    static async initRepository() {
        try {
            await this.connect();
            await this.loadCollections();
        } catch (err) {
            console.log(`Error trying to connect to database: ${err}`);
        }
    }

    static async connect() {
        this.connection = await Mongoose.connect(this.getUrl(), { useNewUrlParser: true });
    }

    static async loadCollections() {
        const flightSchema = new Schema(Flight, { id: false });
        flightSchema.set('toObject', {
            transform: function (doc, ret) {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            }
        });
        const airlineSchema = new Schema(Airline, { id: false });
        airlineSchema.set('toObject', {
            transform: function (doc, ret) {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            }
        });
        const airportSchema = new Schema(Airport, { id: false });
        airportSchema.set('toObject', {
            transform: function (doc, ret) {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            }
        });

        this.Flight = Repository.connection.model('Flight', flightSchema);
        this.Airline = Repository.connection.model('Airline', airlineSchema);
        this.Airport = Repository.connection.model('Airport', airportSchema);
    }

    private static getUrl() {
        let connectionUrl = Config.get('repository.url');
        return connectionUrl;
    }

}