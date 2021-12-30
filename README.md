# KuCoin Request Signing for Insomnia

**This plugin allows for easy communication with the KuCoin cryptocurrency exchange API.**

All private KuCoin API calls require requests to be signed in a specific way. See [KuCoin's API documentation](https://docs.kucoin.com/?lang=en_US#authentication) for detailed information, if you're curious. Currently, Insomnia doesn't support this out of the box (to my knowledge). That's where this plugin comes in :).

## Usage

First, set up API access by going to https://www.kucoin.com/account/api (also see the aforementioned documentation).

Afterwards, simply add the following variables to your environment:

* `kucoin_api_key` – Your API key
* `kucoin_api_secret` – Your API secret
* `kucoin_api_passphrase` – Your API passphrase

As an example (substitute your own values, of course):

```
{
    "kucoin_api_key": "260b52d1a4c8713db6025160",
    "kucoin_api_secret": "2142051e-5bda-4d4e-a3c6-a82395c66f80",
    "kucoin_api_passphrase": "CorrectHorseBatteryStaple"
}
```

All requests will then include the following headers (as required by the API), containing appropriate values determined by the plugin:

* `KC-API-KEY`
* `KC-API-SIGN`
* `KC-API-TIMESTAMP`
* `KC-API-PASSPHRASE`
* `KC-API-KEY-VERSION`

This plugin checks all outgoing requests to see if

* the request has valid a context and URL,
* the request is going to [https://api.kucoin.com](https://api.kucoin.com),
* the required environment variables (see above) are set.

## Disclaimer

This plugin comes with **absolutely no warranty**! It might set your PC on fire and/or gobble up your pets! It does what it should _for me_ (no burning PCs, no gobbled up pets), but no promises :).

💎🙌🚀🌕. Not financial advice, mind you.

## Development

If something goes wrong, you should hopefully be provided with a (moderately) helpful message. Be sure to check the Developer Tools console, too!

I've not yet messed with any `POST` or `DELETE` requests, so there might be dragons.

Beyond that, feel free to open up an [issue on GitHub](https://github.com/a4ff7810/insomnia-plugin-kucoin-signing/issues) or create a [pull request](https://github.com/a4ff7810/insomnia-plugin-kucoin-signing/pulls). I'll try and keep an eye on those.

## Attribution

This plugin is heavily based on and inspired by [`insomnia_plugin_binance_signing`](https://github.com/matthijssn/insomnia-plugin-bitvavo-signing), created by M. Sint Nicolaas.

Also see [`insomnia-plugin-coinbase-apikey-auth`](https://github.com/avallete/insomnia-plugin-coinbase-apikey-auth), created by Andrew Valleteau, which provides similar functionality for CoinBase.

The icon was created by "KCRSVP" under the [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/deed.en) and uploaded to Wikimedia Commons: https://commons.wikimedia.org/wiki/File:KuCoin-logo.png. I merely cropped it. It thus falls under the same license.
