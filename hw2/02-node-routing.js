const http = require("http");
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    "welcome",
    "redirect",
    "redirected",
    "cache",
    "cookie",
    "other",
  ];
  const { method, url } = req;

  // welcome
  if (method === "GET" && url === `/${routes[0]}`) {
    res.writeHead(200, { "content-type": "text/html" });
    return res.end("<h1>Welcome to hell!</h1>");
  }

  // redirect
  if (method === "GET" && url === `/${routes[1]}`) {
    res.writeHead(302, { location: `/${routes[2]}` });
    return res.end();
  }

  // redirected
  if (method === "GET" && url === `/${routes[2]}`) {
    res.writeHead(200, { "content-type": "text/html" });
    return res.end("<h1>Redirected back to hell. There is no escape.</h1>");
  }

  // cache
  if (method === "GET" && url === `/${routes[3]}`) {
    res.writeHead(200, {
      "content-type": "text/html",
      "cache-control": "public, max-age=86400",
    });
    return res.end("<h1>This resource was cached.</h1>");
  }

  // cookie
  if (method === "GET" && url === `/${routes[4]}`) {
    res.writeHead(200, {
      "content-type": "text/plain",
      "set-cookie": "hello=world",
    });
    return res.end("cookies... yummm");
  }

  // This will catch any unspecified route
  res.writeHead(404, { "content-type": "text/html" });
  res.end("<h1>404 - Whoops! Page not found!</h1>");
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
