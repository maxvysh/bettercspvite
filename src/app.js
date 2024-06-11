import express from "express";
import authRouter from "./routes/oauth.js";
import requestRouter from "./routes/request.js";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, "../dist")));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if your app is on https
  })
);

const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    console.log("Authenticated");
    next();
  } else {
    console.log("Not authenticated");
    res.redirect(303, "http://localhost:3000/");
  }
};

app.use("/oauth", authRouter);
app.use("/request", requestRouter);

app.get("/selectcs", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname + "../dist/index.html"));  
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../dist/index.html"));
});
