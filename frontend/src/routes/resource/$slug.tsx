import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import Markdown from '../../components/Markdown'
import { getResourceBySlug } from '../../utils/resourceLoader';
import 'katex/dist/katex.min.css';


export const Route = createFileRoute('/resource/$slug')({
  loader: async ({ params }) => {
    const resource = getResourceBySlug(params.slug);
    if(!resource) throw new Error('Resource not found!');
    return resource;
  },
  component: RouteComponent,
})

function RouteComponent() {
  const resource = useLoaderData({ from: '/resource/$slug'});

  return (
    <article className='max-w-3xl mx-auto p-6 prose prose-invert prose-pre:p-0'>
      <h1>{resource.metadata.title}</h1>
      <p>{resource.metadata.description}</p>
      <Markdown content={resource.content}/>
    </article>
  )
}
