import express from "express";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.get("/", (_request, response) => {
    response.send("<h1>Dungeons and Digits</h1>");
});

app.use((_request, response) => {
    response.status(404).send("<h1>404 - Page not found.</h1>");
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    console.error("Server error.", error);
    response.status(500).send("<h1>500 - Internal server error.</h1>");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});