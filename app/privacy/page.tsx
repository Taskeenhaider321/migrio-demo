import { privacyDoc } from "@/content/legal";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalDocument } from "@/sections/LegalDocument";

export const metadata = createMetadata({
  title: privacyDoc.title,
  description: privacyDoc.description,
  path: privacyDoc.path,
});

export default function PrivacyPage() {
  return (
    <>
      <LegalDocument doc={privacyDoc} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: privacyDoc.title, path: privacyDoc.path },
        ])}
      />
    </>
  );
}
