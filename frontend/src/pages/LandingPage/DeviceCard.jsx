import React from "react";

function DeviceCard({ title, icon, description }) {
  return (
    <article
      className="flex-1 shrink p-6 rounded-[10px] border border-[color:#262626] basis-0 max-md:px-5"
      style={{
        background: `linear-gradient(222deg, rgba(229, 0, 0, 0.5) -208.03%, rgba(229, 0, 0, 0) 41.32%), #0F0F0F`,
      }}
    >
      <div className="flex gap-3 items-center w-full">
        <div className="flex items-center justify-center p-3 rounded-xl border border-solid bg-neutral-900 border-[color:#1F1F1F] h-[54px] w-[54px]">
          <span className="text-[#E50000]">{icon}</span>
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>

      <p className="mt-6 text-base leading-6 text-neutral-400">{description}</p>
    </article>
  );
}

export default DeviceCard;
