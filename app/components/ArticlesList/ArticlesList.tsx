import { Post } from "@/app/types/post/types";
import Filters from "./Filters";
import ArticleCard from "../ArticleCard";
import { PodcastsOutlined } from "@mui/icons-material";
import { PaginationItem } from "@mui/material";
import Link from "next/link";

const ArticlesList = async ({ page }: { page: string }) => {
  let total: string = "";
  const getArticles = async (): Promise<Post[]> => {
    const articles = await fetch(
      `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/posts?per_page=5&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          // remove once live and we're not behind wpengine login
          Authorization: "Basic ZGVtbzpiNDJjZTM1Yzg5ODM=",
        },
      }
    );
    // WP exposes the total number of articles in the headers, so we can use that to calculate pagination/get total number of articles
    total = String(articles.headers.get("X-WP-Total"));
    return await articles.json();
  };
  const articles = await getArticles();

  return (
    <div className="max-w-[662px]">
      <Filters />
      <div className="border-t-2 border-gray-600 container pt-8">
        <p className="text-center pb-8">{total} Articles Found</p>
        <div className="flex flex-col gap-8">
          {articles.map((article) => (
            <ArticleCard
              icon={PodcastsOutlined}
              tagId={article.tags.length > 0 ? article.tags[0] : null}
              // Still not sure which image solution will wind up working best
              // image={
              //   article._embedded &&
              //   article._embedded["wp:featuredmedia"] &&
              //   article._embedded["wp:featuredmedia"][0].source_url
              //     ? article._embedded["wp:featuredmedia"][0].source_url
              //     : ""
              // }
              imageId={article.featured_media}
              header={article.title.rendered}
              key={article.id}
              description={article.excerpt.rendered}
            />
          ))}
          <div className="flex flex-row justify-center">
            <PaginationItem
              disabled={parseInt(page) <= 1}
              type="previous"
              component={Link}
              scroll={false}
              href={`/general-learning?page=${
                parseInt(page) > 1 ? parseInt(page) - 1 : 1
              }`}
            />
            {Array.from({ length: Math.ceil(Number(total) / 5) }).map(
              (_, index) => (
                <PaginationItem
                  key={index}
                  scroll={false}
                  page={index + 1}
                  component={Link}
                  href={`/general-learning?page=${index + 1}`}
                />
              )
            )}
            <PaginationItem
              type="next"
              scroll={false}
              disabled={parseInt(page) >= Math.ceil(Number(total) / 5)}
              component={Link}
              href={`/general-learning?page=${
                parseInt(page) < parseInt(total) / 5 ? parseInt(page) + 1 : null
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;
