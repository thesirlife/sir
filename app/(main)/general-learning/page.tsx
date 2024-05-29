import ArticlesList from "@/app/components/ArticlesList/ArticlesList";
import RelatedArticles from "@/app/components/RelatedArticles";

const GeneralLearning = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const page = String(searchParams?.page) || "";
  return (
    <>
      <RelatedArticles header="Related Articles" />
      <ArticlesList page={page || ""} />
    </>
  );
};

export default GeneralLearning;
