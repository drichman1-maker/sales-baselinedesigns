# baseline-sales

Source for **sales.baselinedesigns.com** — the Baseline Designs sales landing page (pricing, demo gallery, contact).

Pulled down from the live deploy on 2026-05-23 because the original source on the Mac mini wasn't accessible from this machine. Edits made here can be deployed directly to the `baseline-sales` Vercel project.

## Structure

```
index.html        Single-file site (inline CSS, no build step)
previews/         JPG screenshots used in the "Recent work" cards
.vercel/          Linked to Vercel project baseline-sales
```

## Demos linked from the page

| Card                    | Live demo URL                              | Preview         |
| ----------------------- | ------------------------------------------ | --------------- |
| Shear Edge Cuts         | https://demo-barbershop-tau.vercel.app     | barbershop.jpg  |
| ClimatePro HVAC         | https://test-hvac.vercel.app               | hvac.jpg        |
| TerraScape Landscaping  | https://demo-landscaping.vercel.app        | landscaping.jpg |
| Medical Practice        | https://demo-medical-v2.vercel.app         | medical.jpg     |
| VoltEdge Electric       | https://demo-electrician.vercel.app        | electrician.jpg |
| Pool Services           | https://demo-pool-ivory.vercel.app         | pool.jpg        |

## Regenerating screenshots

Headless Chromium via Puppeteer at 1280×720, JPEG q82. See `scripts/shoot.mjs` (or the inline script used to capture the initial batch).

## Deploy

```bash
cd ~/dev/baseline-sales
vercel deploy --prod
```

Deploys to https://baseline-sales-three.vercel.app.

**Note:** sales.baselinedesigns.com does NOT currently route to this Vercel project — its CNAME points to a different Vercel endpoint (likely deployed from the Mac mini under a different setup). To make this repo the source of truth for sales.baselinedesigns.com:

```bash
vercel domains add sales.baselinedesigns.com baseline-sales
# then update the CNAME in Cloudflare to cname.vercel-dns.com
```
