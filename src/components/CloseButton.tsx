import { X } from "lucide-react"
import { ButtonHTMLAttributes } from "react"

export const CloseButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} aria-label={props["aria-label"] ?? "Fechar"} className="text-gray-600 flex items-center justify-center hover:text-gray-900 hover:bg-gray-100 rounded-full h-10 w-10 cursor-pointer duration-300">
            <X aria-hidden="true" size={22} />
        </button>
    )
}