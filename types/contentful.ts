import { Collection, Image, RichText } from "@/types/common";

export interface Project {
  photo: Image;
  name: string;
  tags: string[];
  featuredOnHomePage?: boolean;
  type?: "National Initiative" | "Chapter Project";
  description: RichText;
  link: string;
}

export interface ProjectExtended extends Project {
  bgColor: string;
  imgBorder: string;
}

export interface FAQ {
  question: string;
  answer: RichText;
}

export interface Application {
  applicationType: "New Chapters" | "Nonprofits";
  headerTitle: string;
  photo: Image;
  applicationLink: string;
  description: RichText;
  faqsCollection: Collection<FAQ>;
}

export interface Chapter {
  universityLogo: Image;
  name: string;
  slug: string;
  location: string;
  establishedDate: string;
  incubating: boolean;
  email: string;
  websiteLink?: string;
  socialMediaLink?: string;
  socialMediaLinkType?: string;
  codeRepoLink?: string;
  photo: Image;
  projects?: Collection<Project>;
}

export interface ExecMember {
  name: string;
  title: string;
  description: RichText;
  photo: Image;
  linkedIn?: string;
  email?: string;
}
