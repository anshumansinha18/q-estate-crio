import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import { Route, Routes } from "react-router-dom";
import ListingPage from "./components/ExplorePage/Explore";
import ListingDetailPage from "./components/ListingDetailPage/ListingDetailPage";

function App() {
  return (
    <div class="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/listings" element={<ListingPage />} />
        <Route path="/detail/:property_id" element={<ListingDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
