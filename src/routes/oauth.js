import { Router } from "express";
var router = Router();
import { config } from "dotenv";
config();
import { OAuth2Client } from "google-auth-library";

async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();
  //   console.log("data", data);
}

router.get("/", async function (req, res, next) {
  const code = req.query.code;
  try {
    const redirectUrl = "http://127.0.0.1:3000/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl
    );
    const tokenResponse = await oAuth2Client.getToken(code); // renamed variable
    await oAuth2Client.setCredentials(tokenResponse.tokens); // use renamed variable
    console.log("Tokens acquired");
    const user = oAuth2Client.credentials;
    // console.log("credentials", user);
    await getUserData(user.access_token);
    req.session.isAuthenticated = true;
    res.redirect(303, "http://localhost:3000/selectcs");
  } catch (err) {
    console.log("Error with signing in with Google", err);
    res.redirect(303, "http://localhost:3000");
  }
});

export default router;
