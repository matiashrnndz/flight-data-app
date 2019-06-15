export default class Setup {

    constructor() {

    }

    async setup(data) {

        let config = {
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
        }

        data.config = config;
        
        console.log(JSON.stringify(data));
    }

}
