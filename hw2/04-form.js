/**
 * Exercise 04 - Form Exercise
 */

const path = require("path");
const express = require("express");

const app = express();
const port = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: false }));

/**
 * Escapes characters that have special meaning in HTML so user input can be
 * safely inserted into a response page. Without this, a user could submit
 * something like <script>...</script> and have it run in the browser (XSS).
 *
 * @param {string} value - The raw, untrusted string
 * @returns {string} The string with HTML special characters escaped
 */
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;") // must run first, or it would re-escape the others
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/**
 * Returns a display-ready value for a form field, falling back to "n/a" when
 * the field is missing or contains only whitespace.
 *
 * @param {string} [value] - The submitted field value
 * @returns {string} The escaped value, or "n/a" if empty
 */
const displayValue = (value) => {
  if (typeof value !== "string" || value.trim() === "") {
    return "n/a";
  }
  return escapeHtml(value.trim());
};

// This is to satisfy the specification that when you open
// local host you land on the form page
app.get("/", (req, res) => {
  res.redirect("/form");
});

// return a form with input elements for username, email, comments, newsletter sign up, and submit button.
app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "form.html"));
});

// /submit should return all the data the user entered
app.post("/submit", (req, res) => {
  const { username, email, comments, newsletter } = req.body || {};

  // A checkbox is only included in the request when it is checked, so its
  // presence alone tells us whether the user signed up.
  const signedUp = newsletter !== undefined ? "Yes" : "No";

  // Now we return the data back to the user
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.send(`
    <h1>Submission Received</h1>
    <ul>
      <li><strong>Username:</strong> ${displayValue(username)}</li>
      <li><strong>Email:</strong> ${displayValue(email)}</li>
      <li><strong>Comments:</strong> ${displayValue(comments)}</li>
      <li><strong>Newsletter:</strong> ${signedUp}</li>
    </ul>
    <a href="/form">Submit another response</a>
  `);
});

// This will catch any unspecified route
app.use((req, res) => {
  res.status(404);
  res.set({ "Content-Type": "text/html" });
  res.send("<h1>404 - Not Found</h1>");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
