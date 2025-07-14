const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

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

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const { data, errors } = await res.json();

    if (errors) {
      console.error("GraphQL errors:", errors);
      throw new Error("GraphQL query failed");
    }

    return data;
  } catch (error) {
    console.error(
      `There was a problem retrieving entries with the query ${query}`,
    );
    console.error(error);
    throw error;
  }
}
