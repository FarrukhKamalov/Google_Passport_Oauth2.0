const express = require("express");
const res = require("express/lib/response");
const passport = require("passport");
const googleStrategy = require("passport-google-oauth20")
const app = express();
require("dotenv").config()


passport.use(new googleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "/auth/google/callback"
},(accessToken, refreshToken, profile, done)=>{
    console.log(accessToken)
    console.log(refreshToken)
    console.log(profile)
}))

app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}))
app.get("/auth/google/callback", passport.authenticate("google"))


app.use((req,res)=> res.redirect("/auth/google"))
app.listen(process.env.PORT || 3000, ()=>{
    console.log('Hello Pasport')
})