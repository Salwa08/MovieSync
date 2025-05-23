import React from "react";

function CategoryCard({ title, images, icon }) {
  return (
    <article className="flex-1 shrink p-6 rounded-xl border border-solid basis-0 bg-zinc-900 border-[color:var(--Black-15,#262626)] max-md:px-5">
      <div className="overflow-hidden w-full min-h-[210px]">
        <div className="flex flex-1 gap-1.5 size-full">
          <img
            src={images[0]}
            className="object-contain flex-1 shrink rounded-md aspect-[0.75] basis-0 w-[77px]"
            alt={`${title} movie 1`}
          />
          <img
            src={images[1]}
            className="object-contain flex-1 shrink rounded-md aspect-[0.75] basis-0 w-[77px]"
            alt={`${title} movie 2`}
          />
        </div>
        <div className="flex flex-1 gap-1.5 mt-1.5 size-full">
          <img
            src={images[2]}
            className="object-contain flex-1 shrink rounded-md aspect-[0.75] basis-0 w-[77px]"
            alt={`${title} movie 3`}
          />
          <img
            src={images[3]}
            className="object-contain flex-1 shrink rounded-md aspect-[0.75] basis-0 w-[77px]"
            alt={`${title} movie 4`}
          />
        </div>
      </div>

      <div className="flex items-center w-full text-base font-semibold text-white whitespace-nowrap">
        <h3 className="flex-1 shrink self-stretch my-auto text-white basis-0">
          {title}
        </h3>
        <img
          src={icon}
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          alt="Arrow icon"
        />
      </div>
    </article>
  );
}

export default CategoryCard;