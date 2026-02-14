# WhatIsTracking.ME

What is tracking me?

Many have this question, but there are no definitive answers.

In the age of no-consent scraping, we surrender all our digital data to AI companies.
But what about our offline interactions in daily life?
Are these also surrendered, or do we still have the privilege of consent?

## Intro

You leave your home, go outside, other people or companies take pictures of you
without your consent or sometimes even knowledge.

This is normalized in our current society and previously these pictures
were never exposed to anyone, except if the person consciously shared them
on social media or in person.

This has changed.

To keep the AI train running and to sell more personalized ads, companies chose to process and automatically
upload the pictures and videos you gladly offered to them for a free service.
In most cases they will aggresively coerce you to sign a hundred pager of terms of services, where you surrender your rights.
If you don't agree you can't use their service and everyone just agrees as they don't see a choice.

A prominent example is Meta.
> If you see a "cloud processing" pop-up on Facebook and tap Allow, you're agreeing to Meta's AI Terms of Service and permitting your "media and facial features" to be analyzed by Meta's AI.
> Once enabled, Facebook continuously uploads photos from your camera roll to Meta's cloud to surface "hidden gems" and suggest creative edits or collages.
> [source: https://www.zdnet.com/article/is-meta-secretly-scanning-your-phones-camera-roll-check-this-setting-to-find-out-asap/](https://www.zdnet.com/article/is-meta-secretly-scanning-your-phones-camera-roll-check-this-setting-to-find-out-asap/)

But it does not end with a single company.
To make things worse, regulators in several countries introduced requirements to certain companies to scan pictures on your
phone for illegal content, regardless of their business terms of services.
This opened the doors of acceptance for on-device scanning and processing of your personal data.

## What Now?

This project aims to help you and us to understand where, when, what and maybe who is digitally tracking
you in the real life. Even if you don't own or participate with technology.

We approach this in a technical way, but cannot succeed without the collaboration with the community.
Therefore we are dependant on people using our project and donating their (anonymized) data as a conscious decision.
Help us to find answers, or at least get closer.
Maybe it will also be useful in a regulatory debate to make sure we retain or gain
the privilege of consent in the real life, which we lost in digital life.

## The High Level Approach

1. You go outside
2. You wear a badge, a sticker, a device, a piece of paper or anything that shows a QR code from our [app](https://app.whatistracking.me)
3. Someone takes a picture or video of you
4. You get notified when someone or something interacts with the QR code, even after weeks or months
5. We collect anonymized aggregated dtata and show an interactive map of tracking to everyone

## The Technical Approach

This time it starts with the fact that we have deployed several servers that will track any interaction
with them. This implies any DNS, HTTP or HTTPS request aimed at these will be logged, analyzed and processed.
The technology used is known from something called Out-Of-Band testing (OOB), that is part of the workflow
of security engineers, consultants and researchers. If you want to learn more about this part of the stack
we would like to point you to the [ProjectDiscovery](github.com/projectdiscovery) organization that
created the [interactsh](github.com/projectdiscovery/interactsh) project.

We built on top of this and extended it with a processing and matching service, a user facing API that allows
to register user identifiers and subscribe to events that are associated to these identifier subdomains, a database
that keeps the interactions until the user downloaded them and a user facing client application.
We have all of this code open source and you can learn more about technical details in our [repository](https://github.com/whatistrackingme/poc)

You register yourself on [app.whatistracking.me](https://app.whatistracking.me) without providing any information
about yourself. You will get a bunch of public identifiers that will be used to create unique subdomains that allow
us to associate interactions with you. Let us assume one of them is `totallyrandomidentifier`.
For example visiting `https://totallyrandomidentifier.tracking-collector.com` will create at minimum two interaction events.
The first one is a DNS query to figure out where this (sub)domain is located and the second one is loading the content served
on the webserver on this address via HTTP(S).

You can now create a QR code to this domain and print it, wear it and get notified whenever there is some interaction.
But this won't tell you where and when, just that it happened. To get this deeper insight, you need a more advanced solution.

The app will create a QR code with the link to the above domain but also append an encrypted timestamp that will be updated
on an interval basis. This will re-generate a new QR code for each interval. The app also optionally tracks your location (fully local!)
and will be able to match these timestamps with your location if some interaction happens even weeks or months after you went outside.

We also created an open source physical device based on an epaper toolkit from [soldered](https://docs.soldered.com/inkplate/10/overview/).
This is due to the physical limiations of a smartphone display or a badge/sticker or paper printout.
This allows us to display the QR code on a 10" epaper display, that will be easier to scan from a distance.
The display choice also allows us to wear this device without additional equipment for weeks and months without needing to charge.
You can find the full implementation in the `/Inkplate` subfolder in the [repository](https://github.com/whatistrackingme/poc/tree/main/inkplate-10).

With this location, timestamp encoded in the subdomain and the metadata from the interaction itself you will be able to understand when, where, and
likely what tracked you. The app has a map feature that shows you interactions mapped to locations to get a more visual picture.


## Common Questions

### Will This Expose All of The Trackers?

No. It will only show part of the surface.

### Why Does This Even Work?

Because companies are data hungry.
They want to scrape any new data that they haven't seen before.
They will decode the QR code and will scrape the content to train their next generation AI or ad profiling tool.
This can happen instantly or delayed even after weeks or months. Our service will be able to notify you as soon as we were able track an interaction.

### Does Participation Hurt Me in Any Way?

Yes, you will stand out from the crowd until everyone adopts it.
The QR code will make you easier to track with our current technological capabilities.

### Why Should I Donate MY DATA?

The donated data will be used for the benefit of everyone and will
allow our collective society to prove that regulations and changes are needed.
You are not obligated to donate the interaction data and your anonymized local data.

### Why Did You Create This?

This was born out of curiosity during security testing of AI infrastructure.

### How Can I Collaborate

Use our app in the wild and donate data or become involved
in the community and development of the project.
We accept PRs and welcome new members.

### What About AI Usage?

We do not reject AI and use it in our daily work.
The code surrounding this project was also mostly vibe 
coded and only few parts are completely hand written.

We still think that manual review and proper understanding is important
and try to limit the code and features to maintain to a reasonable degree,
where we can still handle the project without any AI usage.


