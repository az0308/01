/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function PositionBar({ position }) {
    return (
        <div className="">
            <div className={`fixed-${position} bg-main-color`}>
                <br />
                <br />
            </div>
        </div>
    );
}
