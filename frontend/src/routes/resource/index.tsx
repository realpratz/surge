import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router'
import { allResources } from '../../utils/resourceLoader';

export const Route = createFileRoute('/resource/')({
  loader: () => allResources,
  component: RouteComponent,
})

function RouteComponent() {
  const loadedResources = useLoaderData({ from: "/resource/" });

  return (
    <main>
      <h1>Resources</h1>
      {loadedResources.map(resource => (
        <Link
          key={resource.slug}
          to="/resource/$slug"
          params={{slug: resource.slug}}
          className='block p-4 border rounded prose dark:prose-invert'
        >
          <h2>{resource.metadata.title}</h2>
          <p>{resource.metadata.description}</p>
        </Link>
        
      ))}
    </main>
  );
}