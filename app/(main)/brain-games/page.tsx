import ArticlesList from "@/app/components/ArticlesList/ArticlesList";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import { getBrainGames } from "@/app/data/getBrainGames";
import Image from "next/image";
import BrainHq from "@/app/cta-images/brain-hq.png";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import getPage from "@/app/data/getPage";

export const metadata = {
  title: "Brain Games",
  description: "Engage with brain games by BrainHQ",
};

const BrainGames = async ({
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
  const pageSize = 10;

  const articles = await getBrainGames({ categories, offset, pageSize });
  const page = await getPage("29");

  return (
    <div className="bg-navy-primary h-full flex flex-col items-center justify-center">
      <div className="container max-lg:px-4">
        <div className="flex flex-row items-center justify-between ">
          <div className="py-10">
            <Breadcrumbs />
            <h1 className="text-3xl font-bold">Brain Games</h1>
          </div>
          <div className="md:flex hidden flex-row gap-2 items-center">
            <p>Powered By</p>
            <Image src={BrainHq} alt="Powered By Brain HQ" width={160} />
          </div>
        </div>
        <div className="mb-8 flex-row gap-2 items-center flex md:hidden">
          <p>Powered By</p>
          <Image src={BrainHq} alt="Powered By Brain HQ" width={160} />
        </div>
      </div>
      <div
        className="max-w-3xl max-md:px-4"
        dangerouslySetInnerHTML={{ __html: page.content?.rendered }}
      />
      <ArticlesList
        isGame
        articles={articles.articles}
        total={articles.total}
        offset={offset}
        categories={categories}
        pageSize={pageSize}
      />
    </div>
  );
};

export default BrainGames;
