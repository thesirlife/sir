import ArticlesList from "@/app/components/ArticlesList/ArticlesList";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import RelatedArticles from "@/app/components/RelatedArticles";

const GeneralLearning = () => {
  return (
    <>
      <RelatedArticles header="Related Articles" />
      <ArticlesList />
    </>
  );
};

export default GeneralLearning;
