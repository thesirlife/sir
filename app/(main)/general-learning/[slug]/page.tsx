import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import getUserById from "@/app/data/getUserById";
import { Post } from "@/app/types/post/types";
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
      next: {
        // maybe we'll change, but this'll refetch content after 10 minutes, probably not necessary but a good experience if it changes in wordpress
        revalidate: 6000,
      },
    }
  );

  return await data.json();
};

const GeneralLearningArticle = async () => {
  const article = await getGeneralLearningArticle("1");
  const author = await getUserById(article.author);
  console.log(article.content.rendered);
  return (
    <div className="bg-navy-primary h-full flex justify-center">
      <div className="container ">
        <div className="py-10">
          <Breadcrumbs />
        </div>
        <div className="border-t-2 border-gray-600 mb-10">
          <div className="grid grid-cols-4 gap-16 mt-10">
            <aside className="col-span-1">
              <div>
                <p>{author.name}</p>
              </div>

              <div className="flex flex-row gap-2 flex-wrap mt-4">
                {QueryExample.tags.map((tag) => (
                  <Chip key={tag} label={tag} color="warning" />
                ))}
              </div>
            </aside>
            <main className="col-span-2">
              <h1 className="text-4xl mb-8">{article.title.rendered}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: article.content.rendered }}
              ></div>
            </main>
            <aside className="col-span-1">
              Join our community discussion on this topic
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralLearningArticle;
