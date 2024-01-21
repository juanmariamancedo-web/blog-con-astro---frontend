import algoliasearch from "algoliasearch";
import 'dotenv/config'

const searchClient = algoliasearch(process.env.ALGOLIA_APPLICATION_ID || "", process.env.ALGOLIA_SEARCH_ONLY_API_KEY || "");

export default searchClient