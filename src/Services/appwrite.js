import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint(PROJECT_ENDPOINT)
  .setProject(PROJECT_ID);

const database = new Databases(client);

export async function updataSearchCount(searchTerm, movie) {
  try {
    const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("movieId", movie.id),
    ]);
    if (res.documents.length > 0) {
      const document = res.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, document.$id, {
        count: document.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movieId: movie.id,
        posterUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getTrendingMovies() {
  try {
    const TrendingMovies = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.limit(5), Query.orderDesc("count")]
    );
    return TrendingMovies.documents;
  } catch (error) {
    console.error(error);
  }
}
