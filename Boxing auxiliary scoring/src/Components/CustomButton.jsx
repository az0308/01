/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "../Css/index.css";

export default function CustomButton({
    label,
    type,
    onClick,
    color,
    disabled,
}) {
    return (
        <div className="w-100 text-center mb-4 mt-4 d-grid">
            <button
                type={type}
                className={`btn btn-transparent btn-main-color fw-bold`}
                onClick={onClick}
                disabled={disabled}
            >
                {label}
            </button>
        </div>
    );
}
