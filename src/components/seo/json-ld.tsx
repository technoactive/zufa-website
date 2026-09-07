import type { Thing, WithContext } from "schema-dts";

interface JsonLdProps {
  data: WithContext<Thing> | WithContext<Thing>[];
}

/**
 * Renders schema.org JSON-LD. `<` is escaped to prevent a `</script>` injection
 * should any content ever contain HTML.
 */
export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
