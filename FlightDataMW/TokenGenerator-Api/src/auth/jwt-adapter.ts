const jwt = require('jsonwebtoken');

export function sign(payload, $Options) {
    var signOptions = {
        issuer: $Options.issuer,
        subject: $Options.subject,
        audience: $Options.audience,
        algorithm: "RS256"
    };

    return jwt.sign(payload, privateKEY, signOptions);
}

export function verify(token, $Option) {
    var verifyOptions = {
        issuer: $Option.issuer,
        subject: $Option.subject,
        audience: $Option.audience,
        algorithm: ["RS256"]
    };
    try {
        return jwt.verify(token, publicKEY, verifyOptions);
    }catch(err){
        return false;
    }
}

export function decode(token) {
    return jwt.decode(token, {complete: true});
}

var privateKEY = 
`-----BEGIN RSA PRIVATE KEY-----
MIIBOQIBAAJAd8eWkiSEcSBbynXvEpRV7zHqe/hct4e7TZp6qWsYpof60hniD+9a
9WqYIvfM9oYRLkJBs+4eKt5lb4toV/N6GQIDAQABAkAsC32HwdvdyXtXaKR/3YH4
Eg/ahEp7xnKOp8aBM/t9iLC2B49YaAVnRALCfE0IYSGjv5q77bDNPB5wnIlkV10B
AiEA3iKGS/PQxM27XggoGM9PXanwhzUc/jCxtKNAhIVSTCECIQCKCliKZKi08pZL
fTMTMEXx38+tsG6EEQZw8msOTgmu+QIgH4da9HDY0vY4f/I8brkOFMdIIojBYrra
nj8Fq0mZEsECIQCJ5sIDJ4H+mqYYre+bSMtnUf6H9szBNLzpktPuS3mTCQIgQYTh
vQQxW1aj5e6ZHzg4kHAG1kZuHGbu0IRtTsBhQ/w=
-----END RSA PRIVATE KEY-----`

var publicKEY = 
`-----BEGIN PUBLIC KEY-----
MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAd8eWkiSEcSBbynXvEpRV7zHqe/hct4e7
TZp6qWsYpof60hniD+9a9WqYIvfM9oYRLkJBs+4eKt5lb4toV/N6GQIDAQAB
-----END PUBLIC KEY-----`