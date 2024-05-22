import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import { Post } from "@/app/types/posts/types";
import { Chip } from "@mui/material";

const QueryExample = {
  author: "Gavin Gregory",
  description: "This is a general learning article",
  tags: ["Guides", "History", "Science"],
};

const getGeneralLearningArticle = async (id: string): Promise<Post> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_WPREST_ENDPOINT}/posts/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        // remove once live and we're not behind wpengine login
        Authorization: "Basic ZGVtbzpiNDJjZTM1Yzg5ODM=",
      },
    }
  );

  return await data.json();
};

const GeneralLearningArticle = async () => {
  const article = await getGeneralLearningArticle("8");
  return (
    <div className="bg-navy-primary h-full flex justify-center">
      <div className="container ">
        <div className="py-10">
          <Breadcrumbs />
        </div>
        <div className="border-t-2 border-gray-600 mb-10">
          <div className="flex flex-row gap-16 mt-10">
            <aside>
              <div className="">
                <p>{article.author}</p>
              </div>
              <div className=" mt-2">
                <p>{article.excerpt.rendered}</p>
              </div>
              <div className="flex flex-row gap-2 flex-wrap">
                {QueryExample.tags.map((tag) => (
                  <Chip key={tag} label={tag} color="warning" />
                ))}
              </div>
            </aside>
            <main>
              <h1 className="text-4xl">{article.title.rendered}</h1>
              {/* Featured Video */}
            </main>
            <aside>Join our community discussion on this topic</aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralLearningArticle;
