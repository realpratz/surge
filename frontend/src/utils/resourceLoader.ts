import fm from 'front-matter'

interface Resource {
	slug: string;
	metadata: {
		title: string;
		description: string;
	};
	content: string;
}

const resourceFiles = import.meta.glob('/src/resources/*.md', {query: "?raw", import: "default", eager: true})

export const allResources: Resource[] = Object.entries(resourceFiles).map(([path, raw]) => {
	const slug = path.split('/').pop()!.replace('.md', '');

	const data = fm(raw as string);

	return {
		slug,
		metadata: data.attributes as Resource['metadata'],
		content: data.body
	}
})

export function getResourceBySlug(slug: string): Resource | undefined {
	return allResources.find(post => post.slug === slug);
}