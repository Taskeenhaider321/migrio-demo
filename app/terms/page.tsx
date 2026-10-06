import { termsDoc } from "@/content/legal";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalDocument } from "@/sections/LegalDocument";

export const metadata = createMetadata({
  title: termsDoc.title,
  description: termsDoc.description,
  path: termsDoc.path,
});

export default function TermsPage() {
  return (
    <>
      <LegalDocument doc={termsDoc} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: termsDoc.title, path: termsDoc.path },
        ])}
      />
    </>
  );
}
