
import type { LucideIcon } from 'lucide-react';
import { useId } from "react";

interface InputDefaultProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'> {
    label?: string;
    prefix?: LucideIcon;
    suffix?: LucideIcon;
    error?: string;
    helperText?: string;
    isRequired?: boolean;
}

export const InputDefault = ({
    label, 
    type, 
    error,
    isRequired,
    helperText,
    placeholder, 
    prefix: Prefix, 
    suffix: Suffix,
    ...props
} : InputDefaultProps) => {

    const id = useId();

    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className='font-medium text-gray-800 block mb-1'>{label} {isRequired && <span className='text-red-500'>*</span>}</label>}
            <div className={` bg-white flex items-center gap-2 rounded-xl border ${error ? 'border-red-600' : 'border-gray-200'} px-3 h-11 focus-within:outline focus-within:outline-emerald-300`}>
                {Prefix && <Prefix aria-hidden="true" className="h-5 w-5 shrink-0 text-icon" />}
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    {...props}
                    className='w-full bg-transparent outline-none placeholder:text-muted'

                />
                {Suffix && <Suffix aria-hidden="true" className="h-5 w-5 shrink-0 text-gray-700" />}
            </div>
            {helperText && <span className='mt-2 text-sm text-muted'>{helperText}</span>}
            {error && <span className='mt-2 text-sm text-error'>{error}</span>}
        </div>
    )
}