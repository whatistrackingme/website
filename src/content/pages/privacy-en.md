---
title: "Privacy Policy"
description: "What data WhatIsTracking.Me collects, how it is used, and your rights."
locale: "en"
---

This policy explains clearly and simply what data we collect, how we use it, and what your rights are.
All data is encrypted in transit via TLS.

---

## Website — whatistracking.me

We do not collect any data ourselves. The site is hosted on [GitHub Pages](https://pages.github.com/), so the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement) applies.

---

## Application

**Staging / Testing:** app.staging.whatistracking.me
**Production:** app.whatistracking.me

### What we store

| Data | Where | Notes |
|------|-------|-------|
| Your Ed25519 public key | Our server | Used as your anonymous identifier — no name, email, or password |
| Pseudo-identifiers | Our server | Random 30-character strings we generate for you; embedded in your QR codes |
| Interaction records | Our server | IP address of the scanner, timestamp, and raw collector data |
| Your private key | Your device only | Generated locally and never transmitted to our servers |
| Your GPS location | Your device only | Stored in your browser and never sent to our servers |

Interaction data is **not encrypted at the database level**. It is pseudonymised by design — the server only sees random identifiers, not your identity.

The timestamp inside each QR code is AES-encrypted using a key derived from your private key. Only your device can decrypt it; our server never knows the exact time of a scan.

### Data retention and deletion

- Interactions are marked for deletion as soon as you download them and are permanently deleted within approximately 7 days by our automated cleanup process.
- You can delete your account at any time via Settings. This immediately removes your public key and pseudo-identifiers; interaction records are purged within approximately 7 days.
- **Staging only:** interaction data is not backed up and may be randomly deleted at any time.

### Optional: IP geolocation enrichment

You can opt in to enriching interaction IP addresses with geolocation and ASN information. When enabled, the IP address of each interaction is sent to [ipapi.co](https://ipapi.co/), so their [Privacy Policy](https://ipapi.co/privacy/) applies to that data.

### Optional: anonymised data donation

You can opt in to contributing anonymised data for privacy research. If enabled, a subset of your data may be manually extracted to an offline research dataset. Donated data is anonymised before any analysis (neighbourhood-level location, weekly aggregates, venue categories — never exact coordinates or times).

To request deletion of your data from the research dataset, send a digitally signed request (signed with your Ed25519 private key) to [privacy@whatistracking.me](mailto:privacy@whatistracking.me) with your public key identifier in the subject line.

Anonymised datasets may be published publicly or shared with accredited university researchers under a data-use agreement.

---

## Collector

**Staging / Testing:** tracking-collector-staging.com
**Production:** tracking-collector.com

This service records interactions when your QR codes are scanned. For each interaction it stores:

- The full subdomain (which contains your pseudo-identifier and an encrypted timestamp)
- The scanner's IP address, ASN name, ASN number, and network range
- The timestamp of the scan
- **HTTP interactions additionally:** the full raw HTTP request, including all headers (e.g. `User-Agent`, `Accept-Language`, `Referer`) and any request body
- **DNS interactions additionally:** the DNS query type (e.g. `A`, `AAAA`) and the querying resolver's IP address

Interactions that do not match any registered user's pseudo-identifier are deleted after **90 days**.
Matched interactions are made available to the corresponding user via the application and follow the retention policy above.

The collector is powered by [interactsh](https://github.com/projectdiscovery/interactsh).
