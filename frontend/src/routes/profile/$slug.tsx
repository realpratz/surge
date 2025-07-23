import { createFileRoute, useParams } from "@tanstack/react-router";
import ProfilePage from "../../components/Profile/ProfilePage";

export const Route = createFileRoute("/profile/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = useParams({ from: "/profile/$slug" });

  return <ProfilePage slug={slug} />;
}
