import { ExtendedError } from "@/components";
import { RootLayout } from "@/layouts";
import { HomePage } from "@/pages";
import { Route, Routes } from "react-router-dom";


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/inventory" element={<HomePage />} />
      </Route>
      <Route path="*" element={<ExtendedError statusCode={404} />} />
    </Routes>
  );
}
