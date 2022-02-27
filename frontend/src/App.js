import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from "./pages/Dashboard";
import AllPosts from "./pages/AllPosts.";
import AddNew from "./pages/AddNew";
import Preview from "./pages/Preview";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/posts/all-post" element={<AllPosts />} />
          <Route path="/posts/add-new" element={<AddNew />} />
          <Route path="/posts/preview" element={<Preview />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
