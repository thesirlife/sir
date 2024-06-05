import BasicCta from "@/app/components/BasicCta";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import CtaBox from "@/app/components/CtaBox/CtaBox";
import RelatedArticles from "@/app/components/RelatedArticles";
import SocialShare from "@/app/components/SocialShare";
import { getPost } from "@/app/data/getPost";
import getTagById from "@/app/data/getTagById";
import getUserById from "@/app/data/getUserById";
import { getTagColor } from "@/app/util/getTagColor";
import { auth } from "@/auth";
import { Chip } from "@mui/material";
import Hat from "@/app/cta-images/hat.jpg";

const GeneralLearningArticle = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const session = await auth();
  const isLoggedIn = session?.user.email;
  const article = await getPost(params?.slug);
  const author = await getUserById(Number(article?.author));

  const getTags = async () => {
    const tagData = await Promise.all(
      (article?.tags ?? []).map((tagId) => getTagById(tagId))
    );
    return tagData;
  };
  const tags = await getTags();

  return (
    <div
      className={`${
        isLoggedIn ? " bg-navy-primary" : "bg-blueGrey-50"
      } h-full flex flex-col items-center justify-center`}
    >
      <div className="container">
        {isLoggedIn && (
          <div className="py-10 border-b-2 border-gray-600">
            <Breadcrumbs title={article?.title?.rendered} />
          </div>
        )}
      </div>
      <div className=" mb-10 container">
        <div className="grid grid-cols-4 gap-16 mt-10">
          <aside className="col-span-1">
            <div>
              <p className={`${isLoggedIn ? "" : "text-navy-primary"}`}>
                {author.name}
              </p>
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
            <h1
              className={`${
                isLoggedIn ? "" : "text-navy-primary"
              } text-4xl mb-8`}
            >
              {article?.title?.rendered}
            </h1>
            <div
              className={`${isLoggedIn ? "" : "[&>p]:text-navy-primary"}`}
              dangerouslySetInnerHTML={{
                __html: String(article?.content?.rendered),
              }}
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
            {isLoggedIn ? (
              <>
                <SocialShare />
                <BasicCta
                  className="mt-10"
                  button={{
                    text: "Join Discussion",
                  }}
                >
                  Join our community discussion on this topic
                </BasicCta>
              </>
            ) : (
              <CtaBox
                image={Hat}
                link={{
                  href: "/signup",
                  label: "Learn More",
                  isExternal: true,
                }}
                imageOnTop
                className="mt-20"
                altBodyText
                narrow
              >
                Join SIR for monthly boxes delivered right to your door
              </CtaBox>
            )}
          </aside>
        </div>
      </div>
      <RelatedArticles header="Related Articles & Games" />
    </div>
  );
};

export default GeneralLearningArticle;
