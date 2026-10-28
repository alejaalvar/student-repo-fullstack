# Homework 3 - Express and Templating Engines

This directory contains three projects:

| Directory | Description |
| --- | --- |
| [`countries_app/`](#countries-app) | Express + Pug app that displays data from the REST Countries API |
| [`socketio/`](#socketio-chat) | Real-time chat app built with Express and Socket.IO |
| [`typescript/`](#typescript-exercises) | TypeScript exercises 1-8 |

## Requirements

- [Node.js](https://nodejs.org/) **v22.18 or newer** (developed on v24). The TypeScript exercises rely on Node's built-in TypeScript support, and the countries app uses `--env-file`.
- npm (included with Node.js)

> **Note:** Both `countries_app` and `socketio` run on port **3000**, so stop one (`Ctrl+C`) before starting the other.

---

## Countries App

An Express app using Pug templates that fetches country data from the [REST Countries API](https://restcountries.com/).

### Routes

| Route | Description |
| --- | --- |
| `/home` | Welcome page (`/` redirects here) |
| `/countries` | All countries in alphabetical order, with their capitals and leaders (with title) |
| `/populous` | Countries with a population of at least 50 million, most populous first, with their flags |
| `/regions` | Number of countries and the names of each country in every region |

Any other route shows a 404 page. If the API request fails or times out, an error page is shown instead.

### Setup

1. Get an API key from [restcountries.com](https://restcountries.com/).
2. Install dependencies and create the `.env` file from the example:

   ```bash
   cd countries_app
   npm install
   cp .env.example .env
   ```

3. Open `.env` and replace `your_key_here` with your API key:

   ```
   REST_COUNTRIES_KEY=your_key_here
   ```

### Run

```bash
npm start
```

Then open <http://localhost:3000>.

The first page that needs country data may take a moment to load while all countries are fetched from the API. After that, the results are cached in memory until the server restarts.

---

## Socket.IO Chat

A simple chat application based on the [Socket.IO tutorial](https://socket.io/docs/v4/tutorial/introduction). Messages sent by one client are broadcast to every connected client.

### Setup

```bash
cd socketio
npm install
```

### Run

```bash
npm start
```

Then open <http://localhost:3000> in **two or more browser tabs** and send a message from one of them. It appears in every tab. Any route other than `/` shows a 404 page.

---

## TypeScript Exercises

Exercises 1-8 from [TypeScript Exercises](https://typescript-exercises.github.io/). Each exercise is a single `index.ts` file in its own directory, and there are no dependencies to install.

### Run

From the `typescript` directory, run any exercise with Node:

```bash
cd typescript
node exercise-01/index.ts
```

Replace `exercise-01` with `exercise-02` through `exercise-08` to run the others. Each one prints its results to the console.
