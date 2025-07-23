import { createFileRoute } from "@tanstack/react-router";
import ProfilePage from "../../components/Profile/ProfilePage";

export const Route = createFileRoute("/profile/")({
  component: ProfileIndex,
});

export function ProfileIndex() {
  return <ProfilePage />
}
