'use client';
import { Eos3DotsLoading } from "@/app/components/icons/lib";

function Button({children, loading=true, disabled, onClick}) {
 return (
    <button
    onClick={onClick}
    disabled={disabled===true || loading===true}
    className="h-[40px] min-w-[90] flex items-center  justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 relative"
>
    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${loading === true? 'visible':'invisible'}`}>
    <Eos3DotsLoading width={50} height={50} />
    </div>
    <span className={loading===true ? 'invisible': 'visible'}>{children}</span></button>
  )
}

export default Button