"use client"
import { InputDefault } from "@/src/components/InputDefault";
import { ButtonDefault } from "../../../components/ButtonDefault";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
import useLogin from "./useLogin";

export function LoginPageContent() {

    const {
        handleChange,
        credentials,
        handleLogin,
        loading
    } = useLogin();

    return (
        <main className="flex items-center justify-center w-full h-screen">
           <section className='max-w-screen-sm w-full'>
                <h1 className='font-bold text-2xl mb-12 text-center'>Acesse sua conta</h1>

                <form  
                    method="POST" 
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }} 
                    className='space-y-3'>
                    <InputDefault type="email" name="email" label="E-mail" value={credentials.email} onChange={handleChange} />
                    <div className='flex flex-col gap-1 items-end'>
                        <InputDefault type="password" name="password" label="Senha" suffix={EyeIcon} value={credentials.password} onChange={handleChange}/>
                        <Link href='/' className='text-emerald-600 text-sm hover:underline font-medium'>
                            Esqueci minha senha
                        </Link>
                    </div>
                    <ButtonDefault type="submit" wFull={true} isLoading={loading} >Entrar</ButtonDefault>
                    <p className='text-sm text-center text-gray-700 mt-8'>Não tem uma conta? <Link href='/register' className='text-emerald-600 hover:underline font-medium'>Cadastre-se</Link></p>
                </form>
            </section> 
        </main>
    )
}