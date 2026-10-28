/**
 * A simple pug app that fetches data from the countries API
 * and displays all countries on one page, countries with a
 * population over 50 million on another, and regional country
 * information on a third page.
 */

const express = require("express");
const app = express();

app.set("view engine", "pug");
app.use(express.static("public"));
const port = 3000;
const url = "http://localhost";
const apiKey = process.env.REST_COUNTRIES_KEY;
if (!apiKey)
  throw new Error("REST_COUNTRIES_KEY is not set. Did you create .env?");
let cachedCountries = null;

// How long to wait on each API request before giving up
const requestTimeoutMs = 10_000;

/**
 * @typedef {Object} Leader
 * @property {string} [name]
 * @property {string} [title]
 */

/**
 * @typedef {Object} Country
 * @property {{ common: string, official: string }} names
 * @property {{ name: string }[]} capitals
 * @property {Leader[]} [leaders]
 * @property {string} region
 * @property {number} population
 * @property {{ url_png: string, url_svg: string }} flag
 */

/**
 * Fetches every country from the REST Countries API, paging 100 at a time.
 * Results are cached in memory after the first call.
 *
 * {Promise<Country[]>} All countries returned by the API.
 */
const getAllCountries = async function fetchAllCountriesFromAPI() {
  if (cachedCountries) {
    return cachedCountries;
  }
  const allCountries = [];

  // The free tier of this API limits each call to a maximum
  // of 100 countries per request, so we will need to update
  // an offset on successive requests to get all countries
  let offset = 0;

  // We will continue to update the offset until the meta.more
  // attribute in the response is false. This is how we know that
  // there are no countries remaining to fetch
  let more = true;

  while (more) {
    const response = await fetch(
      `https://api.restcountries.com/countries/v5?limit=100&offset=${offset}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },

        // Without a timeout a hung API would leave the page loading forever.
        // When the timeout fires, fetch rejects and the error handler takes over
        signal: AbortSignal.timeout(requestTimeoutMs),
      },
    );

    // Error responses (bad key, rate limit, outage) don't include
    // the data attribute, so fail here with a useful message
    if (!response.ok) {
      throw new Error(
        `REST Countries API request failed: ${response.status} ${response.statusText}`,
      );
    }
    const json = await response.json();
    allCountries.push(...json.data.objects);
    more = json.data.meta.more;
    offset += 100;
  }
  cachedCountries = allCountries;
  return allCountries;
};

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("home", { title: "Home" });
});

app.get("/countries", async (req, res) => {
  const countries = await getAllCountries();

  const list = countries
    .map((country) => {
      const leaderNames = (country.leaders ?? [])
        .filter((leader) => leader.name)
        .map((leader) => `${leader.title} ${leader.name}`);

      return {
        name: country.names.common,
        capital: country.capitals?.[0]?.name ?? "No capital",
        leader:
          leaderNames.length > 0
            ? leaderNames.join(", ")
            : "Leader unavailable",
      };
    })

    // We use localeCompare because standard comparision operators
    // will simply compare their Unicode values
    .sort((a, b) => a.name.localeCompare(b.name));

  res.render("countries", { title: "Countries", countries: list });
});

app.get("/populous", async (req, res) => {
  const countries = await getAllCountries();

  const list = countries
    .filter((country) => country.population >= 50_000_000)

    // Sort descending so the most populous country comes first
    .sort((a, b) => b.population - a.population)
    .map((country) => ({
      name: country.names.common,
      population: country.population.toLocaleString("en-US"),

      // Some countries come back with empty flag urls, so fall
      // back to the png and then to no flag at all
      flag: country.flag?.url_svg || country.flag?.url_png || null,
    }));

  res.render("populous", { title: "Populous", countries: list });
});

app.get("/regions", async (req, res) => {
  const countries = await getAllCountries();

  // Group country names by region. Countries missing a region
  // are kept under a fallback key instead of being dropped
  const groups = countries.reduce((acc, country) => {
    const region = country.region?.trim() || "Unknown region";
    const name = country.names?.common ?? "Unnamed country";
    (acc[region] ??= []).push(name);
    return acc;
  }, {});

  const regions = Object.entries(groups)
    .map(([name, countryNames]) => ({
      name,
      count: countryNames.length,
      countries: countryNames.sort((a, b) => a.localeCompare(b)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  res.render("regions", { title: "Regions", regions });
});

// Runs only when no route above matched the request
app.use((req, res) => {
  res.status(404).render("error", {
    title: "Not Found",
    message: `The page ${req.originalUrl} does not exist.`,
  });
});

// Express 5 forwards errors thrown in async routes here automatically.
// The four arguments are how Express recognizes an error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("error", {
    title: "Server Error",
    message: "Something went wrong loading country data. Please try again later.",
  });
});

app.listen(port, () => console.log(`${url}:${port}`));
