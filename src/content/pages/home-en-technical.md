---
title: "Technical Breakdown"
description: "Technical details of the WhatIsTracking.Me project."
locale: "en"
---

## Technical Breakdown

It starts with the fact that we have deployed several servers that will track any interaction
with them. This means any DNS, HTTP, or HTTPS request aimed at these will be logged, analyzed, and processed.
The technology used is known from something called Out-Of-Band testing (OOB), which is part of the workflow
of security engineers, consultants and researchers. If you want to learn more about this part of the stack
we would like to point you to the [ProjectDiscovery](https://github.com/projectdiscovery) organization that
created the [interactsh](https://github.com/projectdiscovery/interactsh) project.

We built on top of this and extended it with a processing and matching service, a user-facing API that allows
you to register user identifiers and subscribe to events that are associated with unique identifier subdomains, a database
that keeps the interactions until the user downloads them, and a user-facing client application.
We have all of this code open source and you can learn more about technical details in our [repository](https://github.com/whatistrackingme/poc).

You register yourself on [app.whatistracking.me](https://app.whatistracking.me) without providing any information
about yourself. You will get a bunch of public identifiers that will be used to create unique subdomains that allow
us to associate interactions with you. Let us assume one of them is `totallyrandomidentifier`.

Visiting `https://totallyrandomidentifier.tracking-collector.com` will create at minimum two interaction events.
The first one is a DNS query to figure out where this (sub)domain is located and the second one is loading the content served
on the webserver on this address via HTTP(S).

You can now create a QR code to this domain and print it, wear it and get notified whenever there is some interaction.
But this won't tell you where and when, just that it happened. To get this deeper insight, you need a more advanced solution.

The app will create a QR code with the link to the above domain but also append an encrypted timestamp that will be updated
on an interval basis. This will regenerate a new QR code for each interval. The app also optionally tracks your location (fully local!)
and will be able to match these timestamps with your location if some interaction happens even weeks or months after you went outside.

We also created an open-source physical device based on an e-paper toolkit from [soldered](https://docs.soldered.com/inkplate/10/overview/).
This is due to the physical limitations of a smartphone display or a badge/sticker printout.
This allows us to display the QR code on a 10" e-paper display that is easier to scan from a distance.
The display choice also allows us to wear this device without additional equipment for weeks and months without needing to charge.
You can find the full implementation in the `/Inkplate` subfolder in the [repository](https://github.com/whatistrackingme/poc/tree/main/inkplate-10).

With this location, timestamp encoded in the subdomain, and the metadata from the interaction itself, you will be able to understand when, where, and
likely what tracked you. The app has a map feature that shows you interactions mapped to locations to get a more visual picture.
