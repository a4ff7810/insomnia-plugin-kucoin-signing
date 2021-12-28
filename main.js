const CryptoJS = require('crypto-js');

const kucoinUrl = 'https://api.kucoin.com';

// ===================================

// Adapted from https://stackoverflow.com/a/27695236/2010258
function encryptAndBase64Encode(msg, key){
    const hash = CryptoJS.HmacSHA256(msg, key)
    const hex = CryptoJS.enc.Hex.stringify(hash)
    
    return Buffer.from(hex, 'hex').toString('base64')
}

// From https://docs.kucoin.com/?lang=en_US#authentication:
//
//    "Use API-Secret to encrypt the prehash string {timestamp+method+endpoint+body} with sha256 HMAC.
//     The request body is a JSON string and need to be the same with the parameters passed by the API."
function computeSignature(request, timestamp) {

    // Get all parameters from the request and generate a query string
    var bodyText = request.getBodyText();
    var minBodyText = "";
    if (bodyText != '') {
        minBodyText = JSON.stringify(JSON.parse(bodyText))
    }

    var signatureString = `${timestamp}${request.getMethod()}${request.getUrl().replace(kucoinUrl, '')}${minBodyText}`;

    return encryptAndBase64Encode(
        signatureString,
        request.getEnvironmentVariable('kucoin_api_secret')
    )
}

// From https://docs.kucoin.com/?lang=en_US#authentication:
//
//     "Encrypt passphrase with HMAC-sha256 via API-Secret --> Encode contents by base64 before you pass the request."
function computePassphrase(request) {
    return encryptAndBase64Encode(
        request.getEnvironmentVariable('kucoin_api_passphrase'),
        request.getEnvironmentVariable('kucoin_api_secret')
    )
}

module.exports.requestHooks = [
    (context) => {

        // Validate context object
        if (context === null || context === undefined) {
            console.log('Invalid context.');
            return;
        }

        // Validate request
        if (
            !context.hasOwnProperty('request') ||
            context['request'] === null ||
            context['request'] === undefined ||
            context['request'].constructor.name != 'Object'
        ) {
            console.log('Invalid request.');
            return;
        }

        const request = context.request;

        // Check the URL points to the KuCoin API
        if (
            !request.hasOwnProperty('getUrl') ||
            request['getUrl'] == null ||
            request['getUrl'].constructor.name != 'Function' ||
            !request.getUrl().startsWith(kucoinUrl)
        ) {
            console.log('Not a KuCoin API URL');
            return;
        }

        // Check for all required parameters
        const required_parameters = [
            "kucoin_api_key",
            "kucoin_api_secret",
            "kucoin_api_passphrase"
        ]

        for (const parameter of required_parameters) {
            const parameter_value = request.getEnvironmentVariable(parameter);
            if (parameter_value == null) {
                console.log(
                    'Could not find environment variable `' + parameter + '`. Cannot sign message.'
                );
                throw new Error(
                    'Could not find environment variable `' + parameter + '`. Cannot sign message.'
                );
            }
        }

        const now = Date.now()

        // Set headers
        request.setHeader('KC-API-SIGN', computeSignature(request, now))
        request.setHeader('KC-API-TIMESTAMP', now)
        request.setHeader('KC-API-KEY', request.getEnvironmentVariable('kucoin_api_key'))
        request.setHeader('KC-API-PASSPHRASE', computePassphrase(request))
        request.setHeader('KC-API-KEY-VERSION', "2")

        console.log('Done signing KuCoin request.');
    }
]