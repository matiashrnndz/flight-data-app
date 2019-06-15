import * as Pipeline from './pipeline/pipeline';
import { filterFieldNotEmpty } from "./filters/filterFieldNotEmpty";
import { dateFormatter } from './transformations/dateFormatter';
import { filterPrint } from './filters/filterPrint';
import { outputFields } from './output-fields/outputFields';
import Consumer from './router/consumer';

this.consumer = new Consumer();
this.consumer.consume();

var pipeline = new Pipeline();

let test = {
    config: {
        options: { 
            idCliente: '1',
            airline: '',
            ip: 'localhost',
            port: '8095',
            protocol: 'json'
        },
        filters: [
            {
                type: 'filterFieldNotEmpty',
                field: 'CANCELLATION_REASON'
            }
        ],
        transformations: [
            {
                type: 'dateFormatter',
                format: 'DD-MM-YYYY'
            }
        ],
        outputFields: [
                'DATE',
                'CANCELLATION_REASON'
        ]
    },
    YEAR: '2019',
    MONTH: '5',
    DAY: '22',
    CANCELLATION_REASON: '2',
    CANCELED: '1'
}

pipeline.useFilter(filterFieldNotEmpty);
pipeline.useFilter(filterPrint);
pipeline.useTransformation(dateFormatter);
pipeline.useOutputFields(outputFields);

pipeline.run(test);

pipeline.on('error', (err) => {
    console.log(`The error is ${err}`);
});

pipeline.on('end', (result) => {
    console.log(`The result is ${JSON.stringify(result)}`);
});