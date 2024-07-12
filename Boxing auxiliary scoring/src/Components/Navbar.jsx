import React from "react";
import { Link } from "react-router-dom";
import "../Css/index.css";
import { Navbar as BootstrapNavbar, Nav, Button } from "react-bootstrap";

export default function Navbar() {
    return (
        <div className="fixed-top bg-main-color">
            <div className="container-fluid">
                <header className="d-flex justify-content-between py-3">
                    <ul className="nav nav-pills">
                    </ul>
                    <div>
                        <Link to="/login">
                            <Button variant="outline-light" className="me-2">登入</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="outline-light">註冊</Button>
                        </Link>
                    </div>
                </header>
            </div>
        </div>
    );
}
