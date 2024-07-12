/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import PositionBar from "../Components/PositionBar";
import InputPattern from "../Components/InputPattern";

export default function OrderHistory() {
    const now = new Date().toLocaleDateString("sv");
    const [startDate, setStartDate] = useState(now);
    const [endDate, setEndDate] = useState(now);
    const [historyList, setHistoryList] = useState([]);

    const queryOrderHistory = async (event) => {
        setEndDate(event.target.value);
        // TODO
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            // TODO
        };
        fetchInitialData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container pt-5">
                <div className="container pt-3">
                    <h1 className="text-center pt-5">訂單歷史紀錄</h1>
                    <div className="row pt-3">
                        <div className="col-6">
                            <InputPattern
                                label={"開始時間"}
                                type={"date"}
                                value={startDate}
                                onChange={(event) => {
                                    setStartDate(event.target.value);
                                }}
                            />
                        </div>
                        <div className="col-6">
                            <InputPattern
                                label={"結束時間"}
                                type={"date"}
                                value={endDate}
                                onChange={queryOrderHistory}
                            />
                        </div>
                    </div>
                    <div className="container pt-3">
                        <table className="table table-hover table-fill text-center">
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>訂單內容</td>
                                    <td>餐點數量</td>
                                    <td>訂單時間</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>鮪魚蛋餅</td>
                                    <td>2</td>
                                    <td>{now}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>起司蛋餅</td>
                                    <td>1</td>
                                    <td>{now}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <PositionBar position={"bottom"} />
        </div>
    );
}
