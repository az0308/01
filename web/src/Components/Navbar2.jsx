import React from "react";
import { Link } from "react-router-dom";
import "../Css/index.css";
import { Navbar as BootstrapNavbar, Nav, Button } from "react-bootstrap";

export default function Navbar() {
    const handleHistoryClick = (event) => {
        event.preventDefault();
        alert('功能未開放');
    };

    return (
        <div className="fixed-top bg-main-color">
            <div className="container-fluid">
                <header className="d-flex justify-content-between py-3">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link
                                to="/home2"
                                className="nav-link text-white"
                                aria-current="page"
                            >
                                首頁
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="#"
                                className="nav-link text-white"
                                onClick={handleHistoryClick}
                            >
                                歷史紀錄
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user" className="nav-link text-white">
                                使用者
                            </Link>
                        </li>
                    </ul>
                </header>
            </div>
        </div>
    );
}