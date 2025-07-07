import { Link } from "@tanstack/react-router";

interface Params {
	slug: string,
	title: string,
	description: string,
}

export default function ResourceCard({slug, title, description} : Params){
	return(
		<Link
			to="/resource/$slug"
			params={{slug: slug}}
			className='flex flex-col gap-4 justify-start p-4 bg-[#25293E] rounded-lg transition-all duration-200 hover:scale-102 ease-out'
		>
			<h2 className='text-xl truncate'>{title}</h2>
			<p className='text-sm text-muted line-clamp-3'>{description}</p>
		</Link>
	)
}