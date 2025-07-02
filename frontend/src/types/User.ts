export interface User {
  id: string;
  email: string;
  name: string;
  pfpUrl: string;
  cfHandle: string | null;
  cfRating: number | null;
  createdAt: string;
}
