/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 16/11/2025 - 14:34:24
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({
  icon,
  title,
  description,
  backDescription,
  link,
  image
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-[340px] cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >

        {/* FRONT */}
        <div
          className="absolute inset-0 bg-white border border-emerald-200 rounded-2xl shadow-md p-6"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          {/* IMAGE ICON */}
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
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            {title}
          </h3>

          <p className="text-gray-700 text-sm leading-relaxed mb-6">
            {backDescription}
          </p>

          <a
            href="#"
            className="mt-auto inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-900"
            onClick={(e) => e.stopPropagation()}
          >
            {link}
            <ArrowRight className="h-4 w-6" />
          </a>
        </div>

      </div>
    </div>
  );
}
