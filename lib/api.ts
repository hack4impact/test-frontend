import { Chapter } from "@/types/contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

// Want to figure out how to structure your query?
// Go download GraphiQL and enter the URL in the fetch call below!
// (just don't forget to add the authorization header)
// From here, you'll be able to explore all of the existing content
// https://www.electronjs.org/apps/graphiql
export async function fetchContent(query: string) {
  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space}/environments/master`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query }),
      },
    );
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error(
      `There was a problem retrieving entries with the query ${query}`,
    );
    console.error(error);
  }
}

export async function getFeaturedProjects() {
  try {
    const projects = await fetchContent(`
  {
    projectCollection(limit: 3, where: {featuredOnHomePage: true}) {
      items {
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
      }
    }
  }
  `);

    if (!projects) {
      throw new Error("No data received");
    }
    return projects.projectCollection.items;
  } catch (error) {
    console.error("Error in getFeaturedProjects", error);
  }
}

export async function getExecMembers() {
  const execMembers = await fetchContent(`
  {
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
  `);

  return execMembers.executiveBoardMemberCollection.items;
}

const projectQuery = `
    items {
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
    }
  `;

export async function getNationalInitiatives() {
  const nationalInitiatives = await fetchContent(`
{
    nationalInitiatives: projectCollection(limit: 2, where: {type: "National Initiative"}) {
      ${projectQuery}}
}`);

  console.log(nationalInitiatives);
  return nationalInitiatives.nationalInitiatives.items;
}

export async function getChapters() {
  const chapters = await fetchContent(`
{
    chapters: chapterCollection(order: establishedDate_ASC) {
      items {
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
        projects: projectsCollection(limit: 2) {
          ${projectQuery}
        }
      }
    }
}`);

  console.log(chapters);
  const chaptersWithFormattedDate = chapters.chapters.items.map(
    (chapter: Chapter) => {
      const date = new Date(chapter.establishedDate);
      const year = date.getUTCFullYear();
      const semester = date.getUTCMonth() >= 6 ? "Fall" : "Spring";
      return {
        ...chapter,
        establishedDate: `${semester} ${year}`,
      };
    },
  );

  return chaptersWithFormattedDate;
}

export async function getChapterApply() {
  const { chapterApplication } = await fetchContent(`
  {
    chapterApplication: applicationPageCollection(limit: 1, where: {applicationType: "New Chapters"}) {
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
            question
            answer {
              json
            }
          }
        }
      }
    }
  }
  `);

  return {
    props: {
      content: chapterApplication?.items[0],
    },
  };
}

export async function getNonprofitApply() {
  const { nonprofitApplication } = await fetchContent(`
  {
    nonprofitApplication: applicationPageCollection(limit: 1, where: {applicationType: "Nonprofits"}) {
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
            question
            answer {
              json
            }
          }
        }
      }
    }
  }
  `);

  return {
    props: {
      content: nonprofitApplication?.items[0],
    },
  };
}
