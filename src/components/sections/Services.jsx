/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 17/11/2025 - 08:04:55
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
/**
 * Services Section — ensure #services id exists for scroll target
 */

import ServiceCard from "../ui/ServiceCard";
import doctorImg from "../../assets/images/Doc1.jpg";

import clinicIcon from "../../assets/images/icons/clinic.png";
import hospitalIcon from "../../assets/images/icons/hospital.png";
import labIcon from "../../assets/images/icons/lab.png";
import pharmacyIcon from "../../assets/images/icons/pharmacy.png";

export default function Services() {
  return (
    <section id="services" className="w-full py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.5fr_0.75fr_0.75fr] md:grid-rows-2 gap-10">
        {/* LEFT — DOCTOR */}
        <div className="md:row-span-2 flex items-start justify-center">
          <img
            src={doctorImg}
            alt="Doctor"
            className="rounded-3xl shadow-lg object-contain"
            style={{ maxHeight: "640px", width: "100%" }}
          />
        </div>

        {/* CARDS */}
        <ServiceCard
          title="Clinic/Polyclinic Management Software"
          description="Provides Appointment Management, OP Case Sheets, Patient Dashboard, and streamlined Billing & Accounting tools."
          backDescription="A complete module built for modern clinics—covering scheduling, EMR, patient profiles, billing automation, and real-time diagnosis flow."
          link="Read More about Clinic Management"
          image={clinicIcon}
        />

        <ServiceCard
          title="Hospital Management Software"
          description="Streamlines operations from registration to discharge, optimizing workflows and administrative efficiency."
          backDescription="Supports inpatient/outpatient management, workflow optimization, ward management, bed allocation, OT logs, discharge summaries, and billing."
          link="Read More about Hospital Management"
          image={hospitalIcon}
        />

        <ServiceCard
          title="Laboratory Management Software"
          description="Manages the sample lifecycle from billing to report dispatch, improving accuracy and reducing turnaround time."
          backDescription="Automates sample tracking, report generation, billing, quality control, and lab workflow for improved accuracy and efficiency."
          link="Read More about Lab Management"
          image={labIcon}
        />

        <ServiceCard
          title="Pharmacy Management Software"
          description="Offers advanced prescription management, inventory tracking, and integrated analytics."
          backDescription="Includes stock control, prescription tracking, analytics, expiry alerts, automated billing, and full drug catalog management."
          link="Read More about Pharmacy Management"
          image={pharmacyIcon}
        />
      </div>
    </section>
  );
}
