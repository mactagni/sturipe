import { useState } from "react";

export default function PageSwitchButton({ setDisplayTransactions }: { setDisplayTransactions: (value: boolean) => void }) {
    const [page, setPage] = useState(true);
    
    const selectedPage = 'w-10 rounded p-2 inline bg-white transition duration-700'
    const unSelectedPage = 'w-10 p-2 inline invert';

    function switchPage() {
        setPage(!page);

        setDisplayTransactions(page);
    }

    return (
        <div className="w-full flex justify-center">
            <div className="cursor-pointer border-2 rounded-md border-gray-900 p-1" onClick={switchPage}>
                <span>
                    <img className={!page ? selectedPage : unSelectedPage} src="/list.svg" alt="" />
                </span>
                <span>
                    <img className={page ? selectedPage : unSelectedPage} src="/code.svg" alt="" />
                </span>
            </div>
        </div>
    )
}