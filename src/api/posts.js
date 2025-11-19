/**
    * @description      : 
    * @author           : fortu
    * @group            : 
    * @created          : 18/11/2025 - 14:39:55
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/11/2025
    * - Author          : fortu
    * - Modification    : 
**/
export const getPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};
