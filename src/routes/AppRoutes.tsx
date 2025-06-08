import { Routes, Route } from "react-router-dom";
import ChooseSkip from "@/pages/ChooseSkip";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ChooseSkip />} />
    </Routes>
  );
}
