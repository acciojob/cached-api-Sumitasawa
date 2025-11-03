import React, { useState, useEffect, useMemo } from "react";

const CachedPosts = () => {
  const [userId, setUserId] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Memoized API URL (input-based memoization)
  const apiURL = useMemo(() => {
    return `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(apiURL);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiURL]);

  // Memoized filtered response (returning cached API data)
  const cachedPosts = useMemo(() => data, [data]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cached API with useMemo</h2>

      <label>Filter by User ID:</label>
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        {[1, 2, 3, 4, 5].map((id) => (
          <option key={id} value={id}>
            User {id}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cachedPosts.map((post) => (
            <li key={post.id}>
              <b>{post.title}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CachedPosts;
