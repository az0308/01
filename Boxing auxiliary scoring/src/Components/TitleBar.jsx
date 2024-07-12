/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "../Css/index.css";

export default function TitleBar({ title, className }) {
    return (
        <div className={`${className}`}>
            <div className={`w-100 bg-title-color p-1 mt-4`}>
                <h5 className="m-3 fw-bold">{title}</h5>
            </div>
        </div>
    );
}
