import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/content/site";

export function Seo({ title, description, path, noindex = false }: { title: string; description?: string; path: string; noindex?: boolean }) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
    </Helmet>
  );
}
