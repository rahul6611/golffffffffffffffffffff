import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";
import SideMenu from "../SideMenu";
import VerticalLayout from "../VerticalLayout";

export default function DefaultLayout() {
    return (
        <div>
            <Header />
            <VerticalLayout />
            {/* <Menu /> */}
            <div className="app-content content container-fluid d-flex flex-column min-vh-100">
                <Outlet />
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
