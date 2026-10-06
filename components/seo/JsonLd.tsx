type JsonLdProps = {
  schema: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Structured data is data, not executable code, so a native <script> is used
 * rather than next/script. `<` is escaped to close off XSS via injected
 * content strings.
 */
export function JsonLd({ schema }: JsonLdProps) {
  const payload = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
