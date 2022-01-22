import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Posts from "./pages/Posts";
import Sidebar from "./components/Sidebar";
import AllPosts from "./pages/AllPosts.";
import AddNew from "./pages/AddNew";
import Preview from "./pages/Preview";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex">
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/all-post" element={<AllPosts />} />
            <Route path="/posts/add-new" element={<AddNew />} />
            <Route path="/posts/preview" element={<Preview />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
