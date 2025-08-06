# Prerequisites

1. Node version: v22.18.0

2. In order to call openweatherapi, you will need to create .env.local file with following information:

NEXT_PUBLIC_WEATHERMAP_API_KEY=623cc9d77f45d491c038d882735cb518
NEXT_PUBLIC_BASE_URL=https://api.openweathermap.org/data

## Getting Started

First, install all your dependency
```bash
npm install
```

Secondly, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Run test
1.Get cypress ready for Node ver22.18.0: https://docs.cypress.io/app/get-started/install-cypress

2.Run
```bash
npm run test:e2e;
npx cypress open
```