"use client"
import { LogOut, Plus } from "lucide-react"
import { useState } from "react"
import { NewConcursoModal } from "../features/concurso/NewConcursoModal"
import { useRouter } from "next/navigation"
import { useAuth } from "../features/auth/useAuth"
import useConcurso from "../features/concurso/useConcurso"
import Link from "next/link"


export const Sidebar = () => {

    const [openModalCreateConcurso, setOpenModalCreateConcurso] = useState<boolean>(false);
    const router = useRouter();
    const toggleModalCreateConcurso = () => setOpenModalCreateConcurso(!openModalCreateConcurso)
    const { logout, user } = useAuth();

    const {
        concursoList
    } = useConcurso()

    return (
        <>
            <nav className="w-64 bg-white h-screen border-r border-gray-200 py-6 px-2 flex flex-col justify-between">

                <div className='space-y-8'>
                    <div className="flex justify-between items-center px-2">
                        <span className='font-semibold text-lg'>Concursos</span>
                        <button onClick={toggleModalCreateConcurso} className='hover:bg-gray-100 rounded-full w-10 h-9 flex items-center justify-center cursor-pointer group'>
                            <Plus className='text-gray-700 group-hover:text-gray-900' size={22} />
                        </button>
                    </div>
                    <ul>
                        {concursoList.map((concurso) => (
                            <Link key={concurso.id} href={`/concurso/${concurso.id}`}> <li className='py-2 px-2 cursor-pointer text-gray-700 hover:bg-gray-100 rounded-lg'>{concurso.name}</li></Link>
                        ))
                        }
                    </ul>
                    
                </div>
                <div className='flex justify-between items-center px-2'>
                        <span className='flex gap-2 items-center'>
                            <div className="w-9 h-9 flex items-center justify-center bg-emerald-600 text-white font-semibold rounded-full">SP</div>
                            <span>
                                <p className='text-gray-800 font-medium first-letter:uppercase'>{user?.name}</p>
                                <p className='text-xs text-gray-600 max-w-34 truncate'>{user?.email}</p>
                            </span>
                        </span>
                        <button onClick={logout} className='text-gray-500 hover:text-red-600 rounded-full h-10 w-10 flex justify-center items-center rounded-full hover:bg-red-50 cursor-pointer duration-300'>
                            <LogOut aria-label="Encerrar sessão" size={20}/>
                        </button>
                    </div>

            </nav>


            {openModalCreateConcurso && <NewConcursoModal toggleModal={toggleModalCreateConcurso} />}
        </>

    )
}