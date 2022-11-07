# fastify-easy-react-ssr <!-- omit in toc -->

- [Context](#context)
- [Quickstart](#quickstart)
  - [Step 1 - Install and register the plugin](#step-1---install-and-register-the-plugin)
  - [Step 2 - Install required dependencies](#step-2---install-required-dependencies)
  - [Step 3 - Configuration (Vite)](#step-3---configuration-vite)
  - [Step 4 - Conventions](#step-4---conventions)
  - [Step 5 - Build for production](#step-5---build-for-production)
    - [When in "development"](#when-in-development)
    - [When in "production"](#when-in-production)
- [Routing](#routing)

This plugin makes it easy to create a performant fullstack application with server side rendering and frontend hydration.

## Context

It's still not easy enough to achieve SSR without committing to a full framework line Next or Remix.  
This plugin makes it easier by implementing the [SSR guide defined on Vite's documentation](https://vitejs.dev/guide/ssr.html) and enforcing convention over configuration as much as possible.

## Quickstart

Jump to the [basic example](./examples/basic/src/index.js)

### Step 1 - Install and register the plugin

```bash
npm i fastify-easy-react-ssr
```

```js
import fastifyEasyReactSSR from 'fastify-easy-react-ssr'

// Register this plugin after your API routes
// If no matches is found in page routes definition it'll redirect
// to /not-found page using a "catch all" route
await fastify.register(fastifyEasyReactSSR)
```

### Step 2 - Install required dependencies

Make sure that you have the required peer dependencies installed:

```js
  "dependencies": {
    "fastify": "^4.9.2",
    "fastify-easy-react-ssr": "../../",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.3"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^2.2.0",
    "vite": "^3.2.3"
  }
```

### Step 3 - Configuration (Vite)

Checkout:

* [vite.config.js](examples/basic/vite.config.js)
* [index.html](examples/basic/index.html)

These files need to be present in your project too.  
This is Vite's configuration required for building our React application for both `development` and `production`.

### Step 4 - Conventions

You need to have to files called:

* [entry-client.{jsx|.tsx}](examples/basic/src/entry-client.jsx)
* [entry-server.{jsx|.tsx}](examples/basic/src/entry-server.jsx)

Look in the sample application how both these files use React Router to render all the pages for client and server.
This plugin expects to find these 2 files in `/`, `/src` or `/lib`.

### Step 5 - Build for production

I wish this was simpler...

#### When in "development"

`npm run dev` will start your server with Vite running as a Fastify middleware.

#### When in "production"

`npm run build` needs to be executed before `NODE_ENV=production npm start`:

```json
"build": "npm run build:client && npm run build:server",
"build:client": "vite build --outDir dist/client",
"build:server": "vite build --ssr src/entry-server.jsx --outDir dist/server",
```

While this added step is a bit annoying, it ensures that you are not shipping and running Vite in Production.

## Routing

This plugin focuses on only React SSR and unlike Next it doesn't apply filesystem routing.
While this could be something worth discussing in the future, I am personally a fan of filenames that are informative about what they contain and I get confused easily when for example in PR I see a lot of changes to files called with the same name (for example `[id].jsx`).  
Hence [react-router](https://reactrouter.com/en/main/guides/ssr) is used, [check the example](examples/basic/src/app.jsx).
