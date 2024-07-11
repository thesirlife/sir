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
import getCategoryById from "@/app/data/getCategoryById";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  return {
    title: params.slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
  };
}

const GeneralLearningArticle = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const session = await auth();
  const isLoggedIn = Boolean(session?.user.email);
  const article = (await getPost(params?.slug)) ?? [];
  const author = await getUserById(Number(article[0].author));

  const getTags = async () => {
    const tagData = await Promise.all(
      (article[0]?.tags ?? []).map((tagId) => getTagById(tagId))
    );
    return tagData;
  };
  const tags = await getTags();

  const getCategories = async () => {
    const categoryData = await Promise.all(
      (article[0]?.categories ?? []).map((categoryId) =>
        getCategoryById(categoryId)
      )
    );
    return categoryData;
  };
  const categories = await getCategories();

  return (
    <div
      className={`${
        isLoggedIn ? " bg-navy-primary" : "bg-blueGrey-50"
      } h-full flex flex-col items-center justify-center`}
    >
      <div className="container">
        {isLoggedIn && (
          <div className="py-10 border-b-2 border-gray-600">
            <Breadcrumbs title={article[0]?.title?.rendered} />
          </div>
        )}
      </div>
      <div className="mb-10  container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mt-10">
          <aside className="col-span-1">
            <div>
              <p className={`${isLoggedIn ? "" : "text-navy-primary"}`}>
                {author.name}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 flex-wrap mt-4">
                {tags.map((tag) => (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    color={getTagColor(tag.slug)}
                  />
                ))}
              </div>
              <div className="flex flex-row gap-2 flex-wrap">
                {categories.map((category) => (
                  <Chip
                    key={category.id}
                    label={category.name}
                    color="primary"
                  />
                ))}
              </div>
            </div>
          </aside>
          <main className="col-span-1 md:col-span-2 [&_p]:mb-1 [&_iframe]:mb-4 [&_ul]:list-disc [&_ul]:mb-4 [&_li]:pl-4 [&_li]:ml-4 [&_h2]:text-2xl [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:mb-2">
            <h1
              className={`${
                isLoggedIn ? "" : "text-navy-primary"
              } text-4xl mb-8`}
              dangerouslySetInnerHTML={{
                __html: String(article[0].title?.rendered),
              }}
            />

            <div
              className={`${isLoggedIn ? "" : "[&>p]:text-navy-primary"}  `}
              dangerouslySetInnerHTML={{
                __html: String(article[0].content?.rendered),
              }}
            ></div>
            {isLoggedIn ? (
              <BasicCta
                className="mt-6 text-center"
                button={{
                  url: "https://www.facebook.com/groups/800152378911097",
                  text: "Join Discussion",
                  variant: "text",
                  isExternal: true,
                }}
              >
                Join our community discussion on this topic
              </BasicCta>
            ) : (
              <BasicCta
                className="mt-6 text-center"
                button={{
                  url: "/login",
                  text: "Sign in",
                  variant: "outlined",
                }}
              >
                <span className="flex flex-col gap-1">
                  <span>Already have a box?</span>
                  <span>Sign in to your account for more content.</span>
                </span>
              </BasicCta>
            )}
          </main>
          <aside className="col-span-1">
            {isLoggedIn ? (
              <>
                <SocialShare
                  url={`${process.env.APP_URL}/${article[0].slug}`}
                  title={article[0].title?.rendered}
                />
                <BasicCta
                  className="mt-10"
                  button={{
                    url: "https://www.facebook.com/groups/800152378911097",
                    text: "Join Discussion",
                    variant: "text",
                    isExternal: true,
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
      <RelatedArticles
        header={
          isLoggedIn
            ? "Related Articles & Games"
            : "Sign up for monthly boxes, games, foods and more."
        }
        type="general-learning"
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

export default GeneralLearningArticle;
