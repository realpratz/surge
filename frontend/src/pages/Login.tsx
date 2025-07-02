export default function Login(){
	return (
		<div className="h-screen flex items-center justify-center">
			<a href={`${import.meta.env.VITE_API_BASE_URL}/auth/google`}>
				<button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
					Sign in with Google
				</button>
			</a>
			
		</div>
	)
}