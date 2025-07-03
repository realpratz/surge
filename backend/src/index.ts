import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authRoutes from './routes/auth';
import { prisma } from './db';
import { User } from "@prisma/client";
import accountRoutes from './routes/account';
import leaderboardRoutes from './routes/leaderboard'
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
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails![0].value;
    const name = profile.displayName;
    const pfpUrl = profile.photos![0].value;
    const user = await prisma.user.upsert({
      where: {
        email: email,
      },
      update: {
        name: name,
        pfpUrl: pfpUrl,
      },
      create: {
        email: email,
        name: name,
        pfpUrl: pfpUrl,
      },
    });
    return done(null, user);
  } catch (error) {
    console.error("Error during Google authentication:", error);
    return done(new Error("Authentication failed"));
  }
}));

passport.serializeUser((user, done) => {
  const prismaUser = user as User;
  done(null, prismaUser.id);
});

passport.deserializeUser(async (userId: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    done(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    done(new Error("Could not deserialize user"), null);
  }
});

app.get("/", (_req, res) => {
  res.send("Backend API is working!");
});

app.use('/auth', authRoutes);
app.use('/account',accountRoutes);
app.use('/leaderboard',leaderboardRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
