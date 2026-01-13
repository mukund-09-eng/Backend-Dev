const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {

  // parse URL and query parameters
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  // HOME ROUTE → plain text
  if (path === "/" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/plain"
    });
    res.end("Welcome to the Home Page");

  // ABOUT ROUTE → HTML response
  } else if (path === "/about" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.end("<h1>About Page</h1><p>This is a simple HTML response.</p>");

  // USER ROUTE → JSON response using query params
  } else if (path === "/user" && req.method === "GET") {
    const name = query.name;
    const age = query.age;

    const userData = {
      name: name || "Not provided",
      age: age || "Not provided"
    };

    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    res.end(JSON.stringify(userData));

  // INVALID ROUTES → 404
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain"
    });
    res.end("404 Page Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
