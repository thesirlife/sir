import ArticlesList from "@/app/components/ArticlesList/ArticlesList";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import RelatedArticles from "@/app/components/RelatedArticles";
import getPosts from "@/app/data/getPosts";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "General Learning",
  description: "General Learning Articles from SIR",
};

const GeneralLearning = async ({
  searchParams,
}: {
  searchParams?: {
    offset?: number;
    categories?: number;
  };
}) => {
  const offset = searchParams?.offset || 0;
  const categories = searchParams?.categories || 0;
  const session = await auth();
  if (!session?.user.email) {
    redirect("/enter-box-code");
  }
  const articles = await getPosts({ categories, offset });
  return (
    <div className="bg-navy-primary h-full flex flex-col items-center justify-center">
      <div className="container">
        <div className="py-10 max-md:px-4">
          <Breadcrumbs />
          <h1 className="text-3xl font-bold">General Learning</h1>
        </div>
      </div>
      <RelatedArticles header="Related Articles" type="general-learning" />
      <ArticlesList
        articles={articles.articles}
        total={articles.total}
        offset={offset}
        categories={categories}
      />
    </div>
  );
};

export default GeneralLearning;
