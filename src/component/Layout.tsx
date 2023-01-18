import { Outlet } from "react-router-dom";

// Component
import Header from "./Header";

const Layout = () => {

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default Layout;