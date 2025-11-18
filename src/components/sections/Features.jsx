/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 17/11/2025 - 11:11:28
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import { useState } from "react";
import featuresImg from "../../assets/images/features.png";

const features = [
  {
    id: 1,
    title: "Zero Maintenance",
    desc: "Always up-to-date with hassle-free maintenance, 99.99% uptime guarantees, full backups, failover redundancy, and robust security.",
    hotspot: { top: "15%", left: "9%", width: "18%", height: "9%" },
    cardAlign: "right-of-hotspot"
  },
  {
    id: 2,
    title: "Go Paperless",
    desc: "N-Doc is designed as a paperless practice management system, featuring a built-in workflow that ensures greater efficiency and productivity.",
    hotspot: { top: "43%", left: "9%", width: "18%", height: "11%" },
    cardAlign: "right-of-hotspot"
  },
  {
    id: 3,
    title: "Secure Backup",
    desc: "Enjoy 24/7 access to your clinic data with real-time backups, failover redundancy, and strong security.",
    hotspot: { top: "74%", left: "9%", width: "18%", height: "14%" },
    cardAlign: "right-of-hotspot"
  },
  {
    id: 4,
    title: "Access Anytime, Anywhere & Any Device",
    desc: "Access your patient data and clinical records from your tablet, mobile, or desktop PC, anytime and anywhere.",
    hotspot: { top: "15%", right: "9%", width: "18%", height: "9%" },
    cardAlign: "left-of-hotspot"
  },
  {
    id: 5,
    title: "Multi-Location Support",
    desc: "Manage all your franchises from a single location without relying on additional personnel.",
    hotspot: { top: "47%", right: "9%", width: "18%", height: "10%" },
    cardAlign: "left-of-hotspot"
  },
  {
    id: 6,
    title: "Minimal Cost of Ownership",
    desc: "No upfront purchase of software or server hardware is required.",
    hotspot: { top: "73%", right: "6%", width: "20%", height: "9%" },
    cardAlign: "left-of-hotspot"
  },
];

export default function FeaturesFlow() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="w-full bg-white py-28 select-none">
      <div className="max-w-7xl mx-auto px-6">

      {/* Title */}
    <h2 className="text-center text-4xl font-bold text-gray-900">
  Modern Healthcare Software for Efficient Operations
</h2>

<p className="text-center text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed">
  Outdated systems holding your team back?
</p>

<p className="text-center text-gray-500 mt-2 max-w-3xl mx-auto leading-relaxed">
  Switch to <span className="font-semibold text-green-500">N-doc</span>—a unified, 
  secure, cloud-based platform built to optimize workflows, connect teams, and 
  elevate the way your clinic or hospital operates.
</p>




        {/* Image + Hotspots */}
        <div className="relative mt-16 flex justify-center">
          <img
            src={featuresImg}
            alt="N-doc Features Diagram"
            className="w-full max-w-[1100px] object-contain select-none"
          />

          {features.map((feature) => (
            <div
              key={feature.id}
              className="absolute cursor-pointer transition-all duration-200 hover:scale-110"
              style={{
                top: feature.hotspot.top,
                left: feature.hotspot.left || "auto",
                right: feature.hotspot.right || "auto",
                width: feature.hotspot.width,
                height: feature.hotspot.height,
              }}
              onMouseEnter={() => setHovered(feature.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Tooltip Card */}
              <div
                className={`
                  absolute top-1/2 -translate-y-1/2 w-[280px] bg-white 
                  border-2 border-green-500 rounded-2xl p-5 
                  shadow-2xl pointer-events-none z-50
                  transition-all duration-300 ease-out
                  ${hovered === feature.id ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                  ${
                    feature.cardAlign === "right-of-hotspot"
                      ? "left-full ml-4"
                      : "right-full mr-4"
                  }
                `}
              >
                <h3 className="font-bold text-gray-900 text-lg">{feature.title}</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
