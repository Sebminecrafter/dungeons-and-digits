import express from "express";
import helpers from "./helpers.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.get("/", (_request, response) => {
    response.send("<h1>Dungeons and Digits</h1>");
});

app.use(async (_request, response) => {
    response.status(404).send(await helpers.getStatic("404.html"));
});

app.use(async (error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    console.error("Server error.", error);
    response.status(500).send(await helpers.getStatic("500.html"));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});