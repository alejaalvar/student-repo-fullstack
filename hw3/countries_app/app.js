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
async function getAllCountries() {
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
      { headers: { Authorization: `Bearer ${apiKey}` } },
    );
    const json = await response.json();
    allCountries.push(...json.data.objects);
    more = json.data.meta.more;
    offset += 100;
  }
  cachedCountries = allCountries;
  return allCountries;
}

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
        capital: country.capitals[0]?.name ?? "No capital",
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

app.get("/populous", (req, res) => {
  res.render("populous", { title: "Populous" });
});

app.get("/regions", (req, res) => {
  res.render("regions", { title: "Regions" });
});

app.listen(port, () => console.log(`${url}:${port}`));
