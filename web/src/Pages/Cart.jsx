/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import PositionBar from "../Components/PositionBar";
import TitleBar from "./../Components/TitleBar";
import InputPattern from "./../Components/InputPattern";
import { Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const [takeOutTime, setTakeOutTime] = useState(
        new Date().toLocaleString("sv")
    );
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className="pt-5" style={{ overflow: "hidden" }}>
                <div className="pt-4">
                    <TitleBar title={"選購餐點"} />
                    <table className="table table-hover table-responsive text-center">
                        <thead>
                            <tr>
                                <td>名稱</td>
                                <td>數量</td>
                                <td>金額</td>
                                <td>刪除</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>起司蛋餅</td>
                                <td>2</td>
                                <td>NT$ 100</td>
                                <td>
                                    <button className="btn btn-transparent pt-0 border-0">
                                        <i className="bi bi-trash3-fill text-danger"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>鮪魚蛋餅</td>
                                <td>3</td>
                                <td>NT$ 150</td>
                                <td>
                                    <button className="btn btn-transparent pt-0 border-0">
                                        <i className="bi bi-trash3-fill text-danger"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <TitleBar title={"用餐方式"} className={"pt-2"} />
                    <div className="ps-5 pe-5 pt-4 mx-auto text-center">
                        <button
                            name="takeout"
                            type="radio"
                            className="btn btn-outline-secondary btn-lg me-5"
                        >
                            內用
                        </button>
                        <button
                            name="takeout"
                            type="radio"
                            className="btn btn-outline-secondary btn-lg ms-5"
                        >
                            外帶
                        </button>
                    </div>
                    <TitleBar title={"出餐方式"} className={"pt-2"} />
                    <div className="ps-5 pe-5 pt-4">
                        <input
                            type="datetime-local"
                            className="form-control text-center border-secondary"
                            value={takeOutTime}
                            onChange={(e) => setTakeOutTime(e.target.value)}
                        />
                    </div>
                    <TitleBar title={"訂購人資料"} className={"pt-2"} />
                    <div className="row ps-4 pe-4 pt-4">
                        <div className="col-6">
                            <InputPattern
                                label={"姓名"}
                                type={"text"}
                                placeholder={"訂購人姓名"}
                            />
                        </div>
                        <div className="col-6">
                            <InputPattern
                                label={"電話"}
                                type={"tel"}
                                placeholder={"訂購人電話"}
                            />
                        </div>
                    </div>
                    <TitleBar title={"其他"} className={"pt-2"} />
                    <div className="container pb-1">
                        <FormControl
                            as="textarea"
                            placeholder="請輸入訂單備註"
                            style={{ height: "100px" }}
                            className="mt-3 border-secondary"
                        ></FormControl>
                    </div>
                    <div className="text-end mt-4 pt-1 ps-5 pe-5">
                        <button
                            className="btn btn-main-color"
                            style={{ width: "150px" }}
                            onClick={() => navigate("/checkout")}
                        >
                            前往結帳
                        </button>
                    </div>
                </div>
            </div>
            <div className="pb-5 pt-5"></div>
            <PositionBar position={"bottom"} />
        </div>
    );
}
