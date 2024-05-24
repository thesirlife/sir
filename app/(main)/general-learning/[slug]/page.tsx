import BasicCta from "@/app/components/BasicCta";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import RelatedArticles from "@/app/components/RelatedArticles";
import SocialShare from "@/app/components/SocialShare";
import getTagById from "@/app/data/getTagById";
import getUserById from "@/app/data/getUserById";
import { Post } from "@/app/types/post/types";
import { getTagColor } from "@/app/util/getTagColor";
import { Chip } from "@mui/material";

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
  // IDK if this makes sense to keep in this file, or parse out
  // my gut tells me move it out but with new server component paradigms, maybe it's fine
  const article = await getGeneralLearningArticle("1");
  const author = await getUserById(article.author);

  const getTags = async () => {
    const tagData = await Promise.all(
      article.tags.map((tagId) => getTagById(tagId))
    );
    return tagData;
  };
  const tags = await getTags();

  return (
    <div className="bg-navy-primary h-full flex flex-col items-center justify-center">
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
                {tags.map((tag) => (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    color={getTagColor(tag.slug)}
                  />
                ))}
              </div>
            </aside>
            <main className="col-span-2">
              <h1 className="text-4xl mb-8">{article.title.rendered}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: article.content.rendered }}
              ></div>
              <BasicCta
                className="mt-6 text-center"
                button={{
                  text: "Join Discussion",
                }}
              >
                Join our community discussion on this topic
              </BasicCta>
            </main>
            <aside className="col-span-1">
              <SocialShare />
              <BasicCta
                className="mt-10"
                button={{
                  text: "Join Discussion",
                }}
              >
                Join our community discussion on this topic
              </BasicCta>
            </aside>
          </div>
        </div>
      </div>
      <RelatedArticles />
    </div>
  );
};

export default GeneralLearningArticle;
