import fm from "front-matter";

interface Resource {
  slug: string;
  metadata: {
    title: string;
    description: string;
  };
  content: string;
}

const resourceFiles = import.meta.glob("/src/resources/*.md", {
  query: "?raw",
  import: "default",
  eager: false,
});

export async function getResourceBySlug(
  slug: string
): Promise<Resource | undefined> {
  const path = `/src/resources/${slug}.md`;
  const loader = resourceFiles[path];
  if (!loader) return undefined;

  const raw = await loader();
  const data = fm(raw as string);

  return {
    slug,
    metadata: data.attributes as Resource["metadata"],
    content: data.body,
  };
}

export async function getAllResources(): Promise<Resource[]> {
  const entries = Object.entries(resourceFiles);
  const resources: Resource[] = [];

  for (const [path, loader] of entries) {
    const slug = path.split("/").pop()!.replace(".md", "");
    const raw = await loader();
    const data = fm(raw as string);

    resources.push({
      slug,
      metadata: data.attributes as Resource["metadata"],
      content: data.body,
    });
  }

  return resources;
}
