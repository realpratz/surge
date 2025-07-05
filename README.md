# Surge

The official Competitive Coding website for BITS Pilani, Hyderabad Campus. Surge is a platform to track your Codeforces activity, view contest stats, visualize your progress, and foster CP culture on campus.

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/crux-bphc/surge.git
   cd surge
   ```

2. **Create a `.env` file in the backend and frontend based on the `.env.example`**

3. **Install dependencies and run dev servers**

   **Frontend**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   **Backend**

   ```bash
   cd backend
   npm install
   npx prisma migrate dev
   npm run dev
   ```

## Contribution

Follow the [Contributing Guide](./CONTRIBUTING.md).

* Use feature branches with clear names
* Follow basic Conventional Commits
* Don’t push to `main`
