import express from "express";
import session from "express-session";
import "./routes/oauth.js";
import passport from "passport";

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const app = express();
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

app.get("/auth/failure", (req, res) => {
  res.send("Failed to authenticate");
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello! ${req.user.displayName}`);
});

app.get("/logout", (req, res, next) => {
  if (req.user) {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.send("Goodbye");
    });
  } else {
    res.send("No user session to logout");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
