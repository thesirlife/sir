import ArticlesList from "@/app/components/ArticlesList/ArticlesList";
import RelatedArticles from "@/app/components/RelatedArticles";

const GeneralLearning = ({
  searchParams,
}: {
  searchParams?: {
    page?: number;
  };
}) => {
  const page = searchParams?.page || 1;
  return (
    <>
      <RelatedArticles header="Related Articles" />
      <ArticlesList page={page} />
    </>
  );
};

export default GeneralLearning;
