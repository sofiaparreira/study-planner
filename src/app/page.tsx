import Image from "next/image";
import { DashboardPageContent } from "../features/dashboard/DashboardPageContent";
import { ProtectedRoute } from "../features/auth/PretectedRoute";

export default function DashboardPage() {
  return  (
    <ProtectedRoute>
      <DashboardPageContent />
    </ProtectedRoute>
  )


}
