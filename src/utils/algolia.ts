import algoliasearch from "algoliasearch";
import 'dotenv/config'

const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID || "", process.env.ALGOLIA_ADMIN_API_KEY || "");

console.log(process.env.PUBLIC_ALGOLIA_APPLICATION_ID)
export const postsIndex = client.initIndex("posts")