# Downsight

Node (Express.js) app utilising Puppeteer and node-cron to check a website is live daily.

## Usage

Clone the repo locally.

```
https://github.com/ChrisCooper0/downsight.git
```

Add a .env file at the root level with the following environment variables.

```
EMAIL_FROM=
EMAIL_PASS=
EMAIL_TO=
WEBSITE_TO_CHECK=
PORT=
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
