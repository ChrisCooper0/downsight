# Downsight

Node (Express.js) app utilising Puppeteer and node-cron to perform a daily check if a website page has specific text.

If the check fails, an email is sent alerting the user of the failure.

## Usage

Clone the repo locally.

```
https://github.com/ChrisCooper0/downsight.git
```

Add a .env file at the root level with the following environment variables.

```
PORT=

EMAIL_FROM=
EMAIL_PASS=
EMAIL_TO=

WEBSITE_TO_CHECK=
TEXT_TO_CHECK=
```

Run locally via npm or yarn package managers.

```bash
npm run dev
```

```bash
yarn dev
```

Alternativly, run on a server.

```bash
npm run start
```

```bash
yarn start
```
