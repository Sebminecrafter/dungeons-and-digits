import express from "express";
import helpers from "./helpers.js";

const app = express();
const port = Number(process.env.PORT) || 80;

app.use("/static", express.static(helpers.STATIC_DIR));

app.get("/", async (_request, response) => {
    response.send(
        await helpers.getStaticHtml(
            "home.html",
            "Dungeons and Digits"
        )
    );
});

app.use(async (_request, response) => {
    response.status(404).send(
        await helpers.getStaticHtml(
            "404.html",
            "404 Not Found"
        )
    );
});

app.use(async (error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    console.error("Server error.", error);
    response.status(500).send(
        await helpers.getStaticHtml(
            "500.html",
            "500 Internal Server Error"
        )
    );
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});