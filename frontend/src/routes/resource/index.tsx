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
      <h1 className='text-4xl font-bold'>Resources</h1>
      <div className='flex flex-col'>
        {loadedResources.map(resource => (
          <Link
            key={resource.slug}
            to="/resource/$slug"
            params={{slug: resource.slug}}
            className='block p-4 m-6 border rounded prose dark:prose-invert'
          >
            <h2>{resource.metadata.title}</h2>
            <p>{resource.metadata.description}</p>
          </Link>
          
        ))}
      </div>
    </main>
  );
}