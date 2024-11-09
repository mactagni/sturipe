import Navbar from './navbar'

export default function Layout({ children, setDisplayTransactions }: any) {
    return (
        <>
            <Navbar setDisplayTransactions={setDisplayTransactions}/>
            <main>{children}</main>
        </>
    )
}