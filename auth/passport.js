const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongodb = require('../db/connect');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const usersCollection = mongodb.getDb().collection('users');

        let user = await usersCollection.findOne({ email: profile.emails[0].value });
        if (!user) {
          const newUser = {
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user'
          };
          const result = await usersCollection.insertOne(newUser);
          newUser._id = result.insertedId;
          user = newUser;
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
