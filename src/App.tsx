// App.tsx
import React, { useEffect, useState } from "react";
import PostTable from "./components/table";
import "./App.css"; // Import the Tailwind CSS styles

interface Post {
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data: Post[]) => setPosts(data));
  }, []);

  return (
    <div className="App">
      <PostTable data={posts} />
    </div>
  );
};

export default App;
