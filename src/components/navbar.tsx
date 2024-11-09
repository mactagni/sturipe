import PageSwitchButton from "./PageSwitchButton";

export default function Navbar({ setDisplayTransactions }: { setDisplayTransactions: any }) {
    return (
        <div className="w-100 font-bold pt-10 px-10">
            <h1 className="font-protest text-4xl">sturipe</h1>
            <PageSwitchButton setDisplayTransactions={setDisplayTransactions} />
        </div>
    )
}