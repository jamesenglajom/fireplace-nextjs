const blogs = [
  {
    title: "Fireplace Ideas",
    img: "/images/home/blogs/fireplace-ideas.webp",
    tag: "Inspiration Guide",
    tag_bg: "bg-orange-500",
    content:
      "Explore the most popular fireplace design styles and features to help you choose the perfect one for your home.",
  },
  {
    title: "How to Choose a Fireplace TV Stand",
    img: "/images/home/blogs/fireplace-tv-stand.webp",
    tag: "Buying Guide",
    tag_bg: "bg-green-500",
    content:
      "Learn how to choose a fireplace TV stand, where to place it and make it fit seamlessly into your current decor.",
  },
  {
    title: "Types of Fireplaces & Mantels",
    img: "/images/home/blogs/types-of-fireplaces.webp",
    tag: "Buying Guide",
    tag_bg: "bg-green-500",
    content:
      "Ready for a new fireplace? We show you types of fireplaces, based on fuel. Plus, what you need to know about mantels.",
  },
];

export default function HomePageGuidesAndInspiration() {
  return (
    <div className="w-full mt-10">
      <div className="container mx-auto">
        <div className="text-4xl underline italic font-semibold font-bell">
          Fireplaces How-To Guides & Inspiration
        </div>
        <div className="flex flex-col md:flex-row gap-[20px] mt-5">
          {blogs.map((i, idx) => (
            <div key={`blog-${idx}`} className="w-full group hover:shadow">
              <div className="relative bg-green-400">
                <div
                  className={`z-[10] absolute bottom-[20px] right-[0px] h-[auto] w-[content] text-white px-[25px] py-[5px] shadow-md ${i.tag_bg}`}>
                  {i.tag}
                </div>
                <div className="aspect-w-3 aspect-h-2 bg-stone-800">
                  <img
                    src={i.img}
                    alt={i.title}
                    className={`object-cover group-hover:opacity-100 opacity-50 transition-opacity duration-500`}
                  />
                </div>
              </div>
              <div className="py-[15px] flex flex-col gap-[20px] group-hover:px-[15px] transition-all duration-500">
                <div className="group-hover:underline text-2xl  font-bell transition-all duration-300">
                  {i.title}
                </div>
                <div>{i.content}</div>
                <div className="underline font-bold text-right">LEARN MORE</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
