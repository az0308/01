/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../Components/Navbar";
import PositionBar from "../Components/PositionBar";
import CustomButton from "../Components/CustomButton";
import { useRecoilState } from "recoil";
import userEmailRecoilAtom from "../Data/Recoil/userEmailRecoilAtom";
import { useNavigate } from "react-router-dom";

// 店家確認訂單
export default function OrderConfirm() {
    const now = new Date().toLocaleString("sv");
    const [userEmail, setUserEmail] = useRecoilState(userEmailRecoilAtom);
    const navigate = useNavigate();

    const logout = async () => {
        if (userEmail) {
            setUserEmail("");
            localStorage.removeItem("userEmail");
            navigate("/");
        }
    };

    return (
        <div>
            <PositionBar position={"top"} />
            <div className="container pt-5">
                <div className="container pt-5">
                    <h1 className="text-center pt-5">店家確認訂單</h1>
                    <div className="row">
                        <div className="col-9 pt-3">
                            <h5 className="text-end pt-3">某某店家 您好</h5>
                        </div>
                        <div className="col-3 pt-0">
                            <CustomButton
                                type={"button"}
                                label={"登出"}
                                onClick={logout}
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
                                    <td>餐點金額</td>
                                    <td>訂單時間</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                <tr>
                                    <td>1</td>
                                    <td>鮪魚蛋餅</td>
                                    <td>2</td>
                                    <td>NT$ 60</td>
                                    <td>{now}</td>
                                    <td>
                                        <div className="row">
                                            <div className="col-12 p-0">
                                                <div className="d-grid">
                                                    <button className="btn btn-success mb-1">
                                                        接單
                                                    </button>
                                                </div>
                                                <div className="d-grid">
                                                    <button className="btn btn-danger">
                                                        拒絕
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>香雞漢堡</td>
                                    <td>1</td>
                                    <td>NT$ 40</td>
                                    <td>{now}</td>
                                    <td>
                                        <div className="row">
                                            <div className="col-12 p-0">
                                                <div className="d-grid">
                                                    <button className="btn btn-success mb-1">
                                                        接單
                                                    </button>
                                                </div>
                                                <div className="d-grid">
                                                    <button className="btn btn-danger">
                                                        拒絕
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="container pt-5 pb-5"></div>
                    </div>
                </div>
            </div>
            <PositionBar position={"bottom"} />
        </div>
    );
}
