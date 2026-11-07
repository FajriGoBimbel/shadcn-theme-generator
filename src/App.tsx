import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme-context";
import { LandingPage } from "@/pages/landing";
import { DataTablePage } from "@/pages/datatable";
import { MultiSelectPage } from "@/pages/multiselect";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/datatable" element={<DataTablePage />} />
          <Route path="/multiselect" element={<MultiSelectPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
