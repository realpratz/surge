# Surge

The official Competitive Coding website for BITS Pilani, Hyderabad Campus. Surge is a platform to track your Codeforces activity, view contest stats, visualize your progress, and foster CP culture on campus.

## Setup

### Prerequisites

- Docker and Docker Compose
- Working installation of Node v20 or higher

1. **Clone the repository**

   ```bash
   git clone https://github.com/crux-bphc/surge.git
   cd surge
   ```

2. **Create a `.env` file in the root of the project based on the `.env.example` file.**
3. **Install dependencies**

   **Frontend**

   ```bash
   cd frontend
   npm install
   ```

   **Backend**

   ```bash
   cd backend
   npm install
   ```

4. **Start the Dev server**

   ```bash
   docker compose --profile dev up --build
   ```

   If this is your first time setting up this repository:

   - Make sure the backend-dev and postgres containers are running.
   - Run `docker compose exec backend-dev npx drizzle-kit migrate` to run all the migrations.

   To kill the containers before next restart make sure to run

   ```bash
   docker compose --profile dev down
   ```

5. **Building for Prod**

   ```bash
   docker compose --profile prod up --build
   ```

   To kill the prod containers run

   ```bash
   docker compose --profile prod down
   ```

## Contribution

Follow the [Contributing Guide](./CONTRIBUTING.md).

- Use feature branches with clear names
- Follow basic Conventional Commits
- Don’t push to `main`

## API Reference

#### Start Google OAuth login

```http
GET /api/auth/google
```

Redirects the user to Google’s OAuth 2.0 consent screen. No request body or query parameters required.

#### Google OAuth callback

```http
GET /api/auth/google/callback
```

Endpoint Google redirects to after successful/failed login.

#### Logout current user

```http
GET /api/auth/logout
```

Logs out the current authenticated user.

#### Get authenticated user

```http
GET /api/auth/me
```

Returns the currently authenticated user's session information.

#### Initiate Codeforces account verification

```http
POST /api/account/start-verification
```

Starts the verification process by assigning a Codeforces problem and asking the user to make a **compilation error** submission.

| Body Parameter | Type     | Description                                |
| :------------- | :------- | :----------------------------------------- |
| `handle`       | `string` | **Required.** The user's Codeforces handle |

#### Check Codeforces verification status

```http
POST /api/account/check-verification
```

Checks whether the user has made a **compilation error submission** to the assigned problem.

| Body Parameter | Type     | Description                                  |
| :------------- | :------- | :------------------------------------------- |
| `handle`       | `string` | **Required.** Codeforces handle              |
| `contestId`    | `number` | **Required.** Contest ID assigned earlier    |
| `index`        | `string` | **Required.** Problem index assigned earlier |

#### Get rating changes for a user

```http
GET /api/account/:handle/ratings
```

| URL Parameter | Type     | Description                     |
| :------------ | :------- | :------------------------------ |
| `handle`      | `string` | **Required.** Codeforces handle |

| Query Parameter | Type     | Description                                 |
| :-------------- | :------- | :------------------------------------------ |
| `from`          | `number` | Optional. Earliest timestamp (UNIX seconds) |
| `to`            | `number` | Optional. Latest timestamp (UNIX seconds)   |

#### Get Codeforces submissions of a user

```http
GET /api/account/:handle/submissions
```

Returns a list of all Codeforces submissions by the user.

#### Get solved problems by a user

```http
GET /api/account/:handle/solved
```

Returns a list of distinct solved problems with tags, rating, and solve date.

#### Get all contests via the CList API

```http
  GET /api/contests
```

#### Get only upcoming contests via the CList API

```http
  GET /api/contests/upcoming
```

#### Get campus wide leaderboard

```http
  GET /api/leaderboard
```

#### Get leaderboard for a specific CodeForces contest

```http
  GET /api/leaderboard/:slug
```

| URL Parameter | Type     | Description                         |
| :------------ | :------- | :---------------------------------- |
| `slug`        | `string` | **Required**. CodeForces Contest ID |

#### Get profile data for current user

```http
  GET /api/profile
```

#### Get profile data for a given user

```http
  GET /api/profile/:slug
```

| URL Parameter | Type     | Description                                 |
| :------------ | :------- | :------------------------------------------ |
| `slug`        | `string` | **Required**. CodeForces handle of the user |

#### Edit current user's profile

```http
PATCH /api/user/edit
```

| Body Parameter   | Type     | Description                            |
| :--------------- | :------- | :------------------------------------- |
| `pfpUrl`         | `string` | (Optional) URL of the profile picture. |
| `atcoderHandle`  | `string` | (Optional) AtCoder username.           |
| `leetcodeHandle` | `string` | (Optional) LeetCode username.          |
| `codechefHandle` | `string` | (Optional) CodeChef username.          |

#### Get current POTD for the authenticated user

```http
GET /api/potd/current
```

Returns the problem of the day (POTD) for the current date. If not scheduled, generates a random one.

#### Verify a POTD solve

```http
POST /api/potd/verify-solve
```

| Body Parameter | Type     | Description                            |
| :------------- | :------- | :------------------------------------- |
| `contestId`    | `number` | **Required.** Codeforces contest ID    |
| `index`        | `string` | **Required.** Problem index (e.g. "A") |

Marks a problem as solved if a valid Codeforces submission exists.

#### Get solve history of the authenticated user

```http
GET /api/potd/solve-history
```

Returns a list of POTDs solved by the user, with problem details.

#### Schedule a new POTD

```http
POST /api/potd/schedule
```

**CRUx member authentication required**

| Body Parameter | Type     | Description                                                |
| :------------- | :------- | :--------------------------------------------------------- |
| `date`         | `string` | **Required.** Date in `YYYY-MM-DD` format                  |
| `problemId`    | `number` | Optional. Direct ID of the problem                         |
| `contestId`    | `number` | Optional (used with `problemIndex`). Codeforces contest ID |
| `problemIndex` | `string` | Optional (used with `contestId`). Problem index (e.g. "A") |

You must either provide `problemId` or both `contestId` and `problemIndex`.

#### Get upcoming scheduled POTDs

```http
GET /api/potd/schedule
```

**CRUx member authentication required**

Returns the list of all scheduled POTDs from today onward, with problem details.
