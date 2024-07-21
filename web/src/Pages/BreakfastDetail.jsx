/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PositionBar from "./../Components/PositionBar";
import Navbar from "./../Components/Navbar";
import { Button, ButtonGroup, FormControl, Image } from "react-bootstrap";
import images from "./../Images/images.jpg";
import TitleBar from "../Components/TitleBar";
import "../Css/index.css";
import { useNavigate } from "react-router-dom";

export default function BreakfastDetail() {
    const [count, setCount] = useState(1);
    const navigate = useNavigate();

    const addCount = () => {
        if (count >= 1) {
            setCount(count + 1);
        } else {
            setCount(1);
        }
    };
    const minusCount = () => {
        if (count > 1) {
            setCount(count - 1);
        } else {
            setCount(1);
        }
    };

    return (
        <div>
            <Navbar />
            <PositionBar position={"bottom"} />
            <div className="pt-5 pb-5">
                <img
                    style={{ width: "100%", height: "300px" }}
                    className="pt-3"
                    src={images}
                />
                <div className="container">
                    <h1 className="fw-bold mt-3">起司蛋餅</h1>
                    <span className="text-muted">注意事項</span>
                </div>
                <TitleBar title={"餐點備註"} />
                <div className="container pb-5">
                    <FormControl
                        as="textarea"
                        placeholder="請輸入備註"
                        style={{ height: "100px" }}
                        className="mt-3"
                    ></FormControl>
                    <div className="w-100 mt-4 text-center mx-auto">
                        <h5 className="text-start">購買數量</h5>
                        <ButtonGroup className="mt-3">
                            <button
                                className="btn btn-main-color border-0 fs-2 text-dark"
                                style={{ width: "100px" }}
                                onClick={minusCount}
                            >
                                -
                            </button>
                            <button
                                className="btn btn-light"
                                style={{ width: "100px" }}
                                disabled
                            >
                                {count}
                            </button>
                            <button
                                className="btn btn-main-color border-0 fs-2 text-dark"
                                style={{ width: "100px" }}
                                onClick={addCount}
                            >
                                +
                            </button>
                        </ButtonGroup>
                    </div>
                    <div className="text-end mt-4 pt-3">
                        <button
                            className="btn btn-main-color border-0 fw-bold text-dark"
                            style={{ width: "150px" }}
                            onClick={() => {
                                navigate("/cart");
                            }}
                        >
                            加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
