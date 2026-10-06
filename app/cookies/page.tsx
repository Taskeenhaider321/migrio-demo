import { cookiesDoc } from "@/content/legal";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalDocument } from "@/sections/LegalDocument";

export const metadata = createMetadata({
  title: cookiesDoc.title,
  description: cookiesDoc.description,
  path: cookiesDoc.path,
});

export default function CookiesPage() {
  return (
    <>
      <LegalDocument doc={cookiesDoc} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: cookiesDoc.title, path: cookiesDoc.path },
        ])}
      />
    </>
  );
}
