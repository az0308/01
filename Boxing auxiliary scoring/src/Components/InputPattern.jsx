/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function InputPattern({
    label,
    type,
    value,
    onChange,
    disabled = false,
    placeholder,
    readOnly = false,
    minLength,
    min,
    max,
}) {
    return (
        <div className="w-100">
            <div className="mb-3">
                <div className="form-group">
                    <label className="form-label">{label}</label>
                    <input
                        type={type}
                        className="form-control border-secondary"
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        placeholder={placeholder}
                        readOnly={readOnly}
                        minLength={minLength}
                        min={min}
                        max={max}
                    />
                </div>
            </div>
        </div>
    );
}
