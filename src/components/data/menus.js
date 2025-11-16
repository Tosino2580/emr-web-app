/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 15/11/2025 - 18:08:14
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import {
  Hospital,
  Pill,
  FlaskConical,
  Eye,
  TestTube,
  Newspaper,
  FileText,
  ShieldCheck,
  Network,
  Globe,
  BrainCog,
  Plug,
  ServerCog,
  ScanBarcode,
  Users,
  Info,
  Briefcase,
  Mail,
  Handshake,
  Heart,
  Sparkles,
  Share2,
} from "lucide-react";

export const menus = [
  {
    title: "Products",
    items: [
      { label: "Hospital Management Software", icon: Hospital },
      { label: "Pharmacy Management Software", icon: Pill },
      { label: "Environmental Laboratory Management Software", icon: FlaskConical },
      { label: "Laboratory Management Software", icon: TestTube },
    ],
  },
  {
    title: "Integrations",
    items: [
      { label: "Aasandha", icon: Network },
      { label: "ABDM", icon: Globe },
      { label: "CDSS", icon: BrainCog },
      { label: "External Integration", icon: Plug },
      { label: "Machine Integration", icon: ServerCog },
      { label: "NPHIES Integration", icon: ScanBarcode },
      { label: "VMS Integration", icon: Users },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", icon: Info },
      { label: "Careers", icon: Briefcase },
      { label: "Contact Us", icon: Mail },
      { label: "Partner With Us", icon: Handshake },
    ],
  },
  {
    title: "Customer",
    items: [
      { label: "Wall of Love", icon: Heart },
      { label: "Success Stories", icon: Sparkles },
      { label: "Referral Program", icon: Share2 },
    ],
  },
];
