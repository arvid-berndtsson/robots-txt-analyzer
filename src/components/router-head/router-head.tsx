import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import { getUmamiConfig } from "~/utils/env";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  // Default meta tags that should be present on all pages
  const defaultMeta = [
    { property: "og:image", content: "/og-image.png" },
    { property: "og:image:alt", content: "Robots.txt Analyzer Tool Interface" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: "/og-image.png" },
  ];

  // Get Umami configuration from environment variables
  const umamiConfig = getUmamiConfig({
    UMAMI_SCRIPT_URL: import.meta.env.PUBLIC_UMAMI_SCRIPT_URL,
    UMAMI_WEBSITE_ID: import.meta.env.PUBLIC_UMAMI_WEBSITE_ID,
  });

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {/* Default meta tags */}
      {defaultMeta.map((m, index) => (
        <meta key={`default-meta-${index}`} {...m} />
      ))}

      {/* Page-specific meta tags */}
      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.style })}
        />
      ))}

      {/* Umami Analytics - Only included if both environment variables are properly configured */}
      {umamiConfig && (
        <script
          async
          defer
          src={umamiConfig.UMAMI_SCRIPT_URL}
          data-website-id={umamiConfig.UMAMI_WEBSITE_ID}
          data-domains={loc.url.hostname}
        />
      )}

      {head.scripts.map((s) => (
        <script
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.script })}
        />
      ))}
    </>
  );
});
