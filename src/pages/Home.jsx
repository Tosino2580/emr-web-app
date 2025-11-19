/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 18/11/2025 - 14:55:51
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
import { getPosts } from "../api/posts";
import useFetch from "../hooks/useFetch";
import PostMasonry from "../components/Post/PostMasonry";

export default function Home() {
  const { data, loading, error } = useFetch(getPosts);

  if (loading) return <p className="p-5">Loading...</p>;
  if (error) return <p className="p-5 text-red-500">Failed to load</p>;

  return <PostMasonry posts={data} />;
}
