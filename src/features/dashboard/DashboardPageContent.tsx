import { ButtonDefault } from "@/src/components/ButtonDefault";
import { Sidebar } from "@/src/components/Sidebar";
import { useDashboard } from "./useDashboard";

export function DashboardPageContent() {



    return (
        <div className='bg-gray-50 flex'>
            <Sidebar />
            
             <main className='p-8'>
                <h1 className='font-bold text-xl'>Dashboard</h1>
             </main>
            

        </div>
    )
}