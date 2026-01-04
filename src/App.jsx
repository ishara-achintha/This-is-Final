import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SearchPage from "./components/SearchPage.jsx";
import PropertyDetailsPage from "./components/PropertyDetailsPage.jsx";

export default function App() {
  return (
    <div className="appShell">
      <Header />

      <main className="appMain">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
