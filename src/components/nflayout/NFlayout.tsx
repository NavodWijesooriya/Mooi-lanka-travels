import React from "react";
import NavBar from "../common/header/Navbar";
import Footer from "../common/footer/Footer";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div>
           
            <NavBar />
            
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
