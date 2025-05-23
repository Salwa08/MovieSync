"use client";
import React, { useState } from "react";
import CategoryCard from "./CategoryCard";

function CategoriesSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrevSlide = () => {
    setActiveSlide(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleNextSlide = () => {
    setActiveSlide(prev => (prev < 3 ? prev + 1 : 3));
  };

  const categories = [
    {
      title: "Action",
      images: ["https://cdn.builder.io/api/v1/image/assets/TEMP/55597eb44a7606113c6555c975e906f2c2fc6331?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b", "https://cdn.builder.io/api/v1/image/assets/TEMP/ee3accce9fccfc880670481df5349268534870ef?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b", "https://cdn.builder.io/api/v1/image/assets/TEMP/e9962ccb204d83479f1e3dc7fbf2071db0ba3b35?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b", "https://cdn.builder.io/api/v1/image/assets/TEMP/7767d712149ee1ed4d646c5e3d173fe8bda871d4?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b"],
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ae46da9d971dd0eaac2df0c6c4f3d55cb633e000?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b"
    },
    {
      title: "Adventure",
      images: ["https://cdn.builder.io/api/v1/image/assets/TEMP/d9ed6591f2c8d2427d21fa8b6af9ec6e8ad0f356?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b", "https://cdn.builder.io/api/v1/image/assets/TEMP/bad366cae43239fc1d64c2988dadc14fcbc224b7?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b", "https://cdn.builder.io/api/v1/image/assets/TEMP/933d02e60624debd2e8936800f82ae945266668a?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b", "https://cdn.builder.io/api/v1/image/assets/TEMP/9a39ff8dc5b1c96464125e652f4c0e275c48722a?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b"],
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b8c3d9a42f77afd48c560e999a5292b61e8c4779?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b"
    },
    {
      title: "Comedy",
      images: ["https://cdn.builder.io/api/v1/image/assets/TEMP/d952c58e5403b418443102b4e515957866b66caf?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b", "https://cdn.builder.io/api/v1/image/assets/TEMP/ffc1b6cec2c7dc4919468420f5e37af1903803b9?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b", "https://cdn.builder.io/api/v1/image/assets/TEMP/7c567aca7bdd91a17a8c23417aa6961abfd185c3?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b", "https://cdn.builder.io/api/v1/image/assets/TEMP/5a4aa2a0f37c1e6398b9060b15fac092c74b9067?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b"],
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/041b05ed5230f9ba8acae045ddd3972cc05e3098?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b"
    },
    {
      title: "Drama",
      images: ["https://cdn.builder.io/api/v1/image/assets/TEMP/fa5004ff8270504ac525170a903b9bbd4ab0f5d8?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b", "https://cdn.builder.io/api/v1/image/assets/TEMP/31ebaf5dc4180e38f84947ede7a3fa72d6101e1c?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b", "https://cdn.builder.io/api/v1/image/assets/TEMP/3e987093628a1a2de8421333dcdc209b0e09e7b7?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b", "https://cdn.builder.io/api/v1/image/assets/TEMP/b8e30c370246fec64bc3d0893f7a841f35aaca3d?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b"],
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7adb1efd12e30f42935c3c80d8817ed46b20ed79?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b"
    },
    {
      title: "Horror",
      images: ["https://cdn.builder.io/api/v1/image/assets/TEMP/290b4fb041094a44380d8de2c200273f60feb1f1?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b", "https://cdn.builder.io/api/v1/image/assets/TEMP/4ff1a3e2c05e93670f7275f1a32d7d86e02e1c8d?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b", "https://cdn.builder.io/api/v1/image/assets/TEMP/0ddf447f776b9bf7da11121ea598fbd6d7423b52?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b", "https://cdn.builder.io/api/v1/image/assets/TEMP/d009d0a21296c35e532cc7ffd072425d365534f8?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b"],
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/da3c30a2967829c13d6402bfbba0f0f606563b48?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b"
    }
  ];

  return (
    <section className="mt-28 w-full max-w-[1116px] max-md:mt-10 max-md:max-w-full" id="movies-and-shows">
      <div className="flex flex-wrap gap-10 items-end w-full max-md:max-w-full">
        <div className="flex-1 shrink basis-6 min-w-60 max-md:max-w-full">
          <h2 className="text-3xl font-bold text-white max-md:max-w-full">
            Explore our wide variety of categories
          </h2>
          <p className="mt-2.5 text-base leading-6 text-neutral-400 max-md:max-w-full">
            Whether you're looking for a comedy to make you laugh, a drama
            to make you think, or a documentary to learn something new
          </p>
        </div>

        <div className="flex gap-3 items-center p-3 rounded-xl border border-solid bg-stone-950 border-[color:var(--Black-12,#1F1F1F)]">
          <button
            onClick={handlePrevSlide}
            className="flex gap-2.5 items-center self-stretch p-2.5 my-auto w-11 h-11 rounded-md border border-solid bg-zinc-900 border-[color:var(--Black-12,#1F1F1F)]"
            aria-label="Previous slide"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/032b965d67cccdcfa60167f89f9cb1245b9741c2?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b"
              className="object-contain w-6 aspect-square"
              alt="Previous"
            />
          </button>

          <div className="flex gap-1 items-start self-stretch my-auto w-[69px]">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`flex flex-1 shrink w-3.5 h-1 basis-0 rounded-[100px] ${
                  index === activeSlide ? "bg-red-600" : "bg-zinc-800"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextSlide}
            className="flex gap-2.5 items-center self-stretch p-2.5 my-auto w-11 h-11 rounded-md border border-solid bg-zinc-900 border-[color:var(--Black-12,#1F1F1F)]"
            aria-label="Next slide"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5590f98be378b2181d0446597612dc49f4c0ad02?placeholderIfAbsent=true&apiKey=d74ca37ed77748818ffe9b2499aa215b"
              className="object-contain w-6 aspect-square"
              alt="Next"
            />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 items-start mt-16 w-full max-md:mt-10 max-md:max-w-full">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            images={category.images}
            icon={category.icon}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;