import {Outlet, createRootRoute} from "@tanstack/react-router"
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import Login from "../pages/Login"


export const Route = createRootRoute({
	component: RootComponent,
})


export default function RootComponent() {
  const { user, loading } = useAuth();

	useEffect(() => {
		console.log(`User: ${user}`)
	}, [user])

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Login/>;
  }

  return (
		<>
			<Outlet/>
			{import.meta.env.VITE_ENV === "development" && <TanStackRouterDevtools position='bottom-right'/>}
		</>);
}
