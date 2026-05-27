import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { DepartmentPage } from "@/components/department/department-page";
import { storage } from "@/lib/content/storage";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const pages = await storage.getAllPages();
  return pages
    .filter((p) => p.type === "speciality")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await storage.getPage(slug);
  if (!page) return {};
  return {
    title: page.seo?.metaTitle ?? page.title,
    description: page.seo?.metaDescription ?? page.description,
  };
}

export default async function SpecialityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await storage.getPage(slug);
  if (!page || page.type !== "speciality") notFound();
  return (
    <>
      <Header />
      <main>
        <DepartmentPage content={page} />
      </main>
      <Footer />
    </>
  );
}
