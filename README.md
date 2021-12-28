# KuCoin Request Signing for Insomnia

Heavily based on and inspired by [→ `insomnia_plugin_binance_signing`](https://github.com/matthijssn/insomnia-plugin-bitvavo-signing) by @matthijssn.

Also see [→ `insomnia-plugin-coinbase-apikey-auth`](https://github.com/avallete/insomnia-plugin-coinbase-apikey-auth) by @avallete.

---

**This plugin allows for easy communication with the KuCoin API.**

All private KuCoin API calls require requests to be signed. Insomnia doesn't have a built-in way to do this. See [KuCoin's API documentation](https://docs.kucoin.com/?lang=en_US#authentication) for detailed information.

## Usage

Set up API access by going to https://www.kucoin.com/account/api.

Afterwards, simply add the following variables to your environment:

* `kucoin_api_key` – Your API key
* `kucoin_api_secret` – Your API secret
* `kucoin_api_passphrase` – Your API passphrase

All REST requests will then include the following headers, containing appropriate values determined by the plugin:

* `KC-API-KEY`
* `KC-API-SIGN`
* `KC-API-TIMESTAMP`
* `KC-API-PASSPHRASE`
* `KC-API-KEY-VERSION`

This plugin (when installed) checks all outgoing requests to see if

* the request has valid a context and URL,
* the request is going to [https://api.kucoin.com](https://api.kucoin.com),
* the required environment variables (see above) are set.

---

This plugin comes with absolutely no warranty! It might set your hard disk on fire and/or gobble up your pets! It does what it should _for me_. No promises :).

The icon was created by "KCRSVP" under the [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/deed.en) and uploaded to Wikimedia Commons: https://commons.wikimedia.org/wiki/File:KuCoin-logo.png. I merely cropped it. It thus falls under the same license.