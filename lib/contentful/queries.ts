export const PROJECT_FRAGMENT = `
  photo {
    url
    description
  }
  name
  tags
  description {
    json
  }
  link
  type
`;

export const CHAPTER_FRAGMENT = `
  universityLogo {
    url
    description
  }
  name
  slug
  location
  establishedDate
  incubating
  email
  websiteLink
  socialMediaLink
  socialMediaLinkType
  codeRepoLink
  photo {
    url
    description
  }
`;

export const FAQ_FRAGMENT = `
  question
  answer {
    json
  }
`;

export const QUERIES = {
  FEATURED_PROJECTS: `
    query FeaturedProjects {
      projectCollection(limit: 10, where: {featuredOnHomePage: true}) {
        items {
          ${PROJECT_FRAGMENT}
        }
      }
    }
  `,

  NATIONAL_INITIATIVES: `
    query NationalInitiatives {
      projectCollection(limit: 10, where: {type: "National Initiative"}) {
        items {
          ${PROJECT_FRAGMENT}
        }
      }
    }
  `,

  CHAPTERS: `
    query Chapters {
      chapterCollection(order: establishedDate_ASC) {
        items {
          ${CHAPTER_FRAGMENT}
          projects: projectsCollection(limit: 3) {
            items {
              ${PROJECT_FRAGMENT}
            }
          }
        }
      }
    }
  `,

  ACTIVE_CHAPTERS: `
    query ActiveChapters {
      chapterCollection(where: {incubating: false}, order: establishedDate_ASC) {
        items {
          ${CHAPTER_FRAGMENT}
        }
      }
    }
  `,

  EXEC_MEMBERS: `
    query ExecMembers {
      executiveBoardMemberCollection(order: title_DESC) {
        items {
          name
          title
          description {
            json
          }
          photo {
            url
          }
          linkedIn
          email
        }
      }
    }
  `,

  CHAPTER_APPLICATION: `
    query ChapterApplication {
      applicationPageCollection(limit: 1, where: {applicationType: "New Chapters"}) {
        items {
          applicationType
          headerTitle
          photo {
            url
          }
          applicationLink
          description {
            json
          }
          faqsCollection {
            items {
              ${FAQ_FRAGMENT}
            }
          }
        }
      }
    }
  `,

  NONPROFIT_APPLICATION: `
    query NonprofitApplication {
      applicationPageCollection(limit: 1, where: {applicationType: "Nonprofits"}) {
        items {
          applicationType
          headerTitle
          photo {
            url
          }
          applicationLink
          description {
            json
          }
          faqsCollection {
            items {
              ${FAQ_FRAGMENT}
            }
          }
        }
      }
    }
  `,

  CHAPTER_BY_SLUG: `
    query ChapterBySlug($slug: String!) {
      chapterCollection(limit: 1, where: {slug: $slug}) {
        items {
          ${CHAPTER_FRAGMENT}
          projects: projectsCollection(limit: 10) {
            items {
              ${PROJECT_FRAGMENT}
            }
          }
        }
      }
    }
  `,
};
