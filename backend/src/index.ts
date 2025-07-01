import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authRoutes from './routes/auth';

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:4173',
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'lax',
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.CALLBACK_URL!,
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

app.get("/", (_req, res) => {
  res.send("Backend API is working!");
});

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
