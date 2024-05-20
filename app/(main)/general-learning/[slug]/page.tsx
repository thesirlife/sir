import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";

const QueryExample = {
  author: "Gavin Gregory",
  description: "This is a general learning article",
  tags: ["Guides", "History", "Science"],
};
const GeneralLearningArticle = () => {
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
                <p>{QueryExample.author}</p>
              </div>
              <div className=" mt-2">
                <p>{QueryExample.description}</p>
              </div>
              <div className="bg-gray-200 p-4 mt-4">
                <ul>
                  {QueryExample.tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                  ))}
                </ul>
              </div>
            </aside>
            <main>
              <h1 className="text-4xl">
                RMS Titanic - History and Significance
              </h1>
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
