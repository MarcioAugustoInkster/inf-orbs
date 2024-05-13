import { Outlet } from "react-router-dom"
import Navigation from "../templates/Navigation/Navigation"
import Footer from "../templates/Footer/Footer"

const BaseLayout = () => {
    return(
        <>
            <Navigation />
            <main className="">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default BaseLayout;
