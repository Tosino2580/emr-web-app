/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 17/11/2025 - 07:44:08
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({
  title,
  description,
  backDescription,
  link,
  image,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div
      className="relative w-full h-[340px] cursor-pointer"
      style={{ perspective: "1200px" }}
      
      // HOVER FLIP
      onMouseEnter={() => {
        if (!isLocked) setIsFlipped(true);
      }}
      onMouseLeave={() => {
        if (!isLocked) setIsFlipped(false);
      }}

      // CLICK LOCK
      onClick={() => {
        if (!isLocked) {
          // lock the card in flipped state
          setIsLocked(true);
          setIsFlipped(true);
        } else {
          // unlock + unflip
          setIsLocked(false);
          setIsFlipped(false);
        }
      }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 bg-white border border-emerald-200 rounded-2xl shadow-md p-6"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* ICON CIRCLE */}
          <div className="absolute -top-6 left-6 h-20 w-20 rounded-full bg-white border-2 border-emerald-400 shadow flex items-center justify-center overflow-hidden">
            <img src={image} alt="" className="h-10 w-10 object-contain" />
          </div>

          <h3 className="mt-10 text-lg font-bold text-gray-900 mb-3">
            {title}
          </h3>

          <p className="text-gray-700 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 bg-white border border-emerald-400 rounded-2xl shadow-md p-6 flex flex-col"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            {title}
          </h3>

          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            {backDescription}
          </p>

          {/* ONLY CLICKABLE */}
          <a
            href="#"
            className="mt-auto inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-900"
            onClick={(e) => e.stopPropagation()} // prevents unlock
          >
            {link}
            <ArrowRight className="h-4 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
}
