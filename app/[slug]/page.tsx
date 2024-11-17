import { getPageBySlug } from "@/lib/wordpress";
import { Section, Container, Main } from "@/components/craft";
import { Metadata } from "next";
import Footer from "@/components/Footer";

import BackButton from "@/components/back";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);
  return {
    title: page.title.rendered,
    description: page.excerpt.rendered,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  return (
    <>
    <Section>
      <Container>
      <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-6 sm:p-8 not-prose">

        <BackButton />
        <h1 className="pt-12">{page.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </div>
      </Container>
    </Section>
     <Footer slug={params.slug} />
     </>
  );
}
