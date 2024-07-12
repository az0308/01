/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PositionBar from "../Components/PositionBar";
import { useRecoilState } from "recoil";
import userEmailRecoilAtom from "../Data/Recoil/userEmailRecoilAtom";
import { useNavigate } from "react-router-dom";
import { Tab, TabContainer, Tabs } from "react-bootstrap";
import CustomButton from "../Components/CustomButton";

// 管理者後台
export default function AdminBackstage() {
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
                <div className="container">
                    <div className="container">
                        <div className="container">
                            <h1 className="text-center pt-5">管理者後台</h1>
                            <div className="row">
                                <div className="col-9 pt-3">
                                    <h5 className="text-end pt-3">
                                        Admin 您好
                                    </h5>
                                </div>
                                <div className="col-3 pt-0">
                                    <CustomButton
                                        type={"button"}
                                        label={"登出"}
                                        onClick={logout}
                                    />
                                </div>
                            </div>
                            <TabContainer>
                                <Tabs
                                    defaultActiveKey={"使用者"}
                                    className="mb-3 pt-5"
                                    variant="pills"
                                    fill
                                >
                                    <Tab eventKey={"使用者"} title="使用者">
                                        <table className="table table-hover table-fill text-center">
                                            <thead>
                                                <tr>
                                                    <td>#</td>
                                                    <td>使用者名稱</td>
                                                    <td>電子郵件</td>
                                                    <td>註冊時間</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>John</td>
                                                    <td>john@gmail.com</td>
                                                    <td>{now}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Tab>
                                    <Tab eventKey={"菜單"} title="菜單">
                                        <table className="table table-hover table-fill text-center">
                                            <thead>
                                                <tr>
                                                    <td>#</td>
                                                    <td>餐點名稱</td>
                                                    <td>價格</td>
                                                    <td>操作</td>
                                                </tr>
                                            </thead>
                                            <tbody className="align-middle">
                                                <tr>
                                                    <td>1</td>
                                                    <td>鮪魚蛋餅</td>
                                                    <td>NT$ 30</td>
                                                    <td>
                                                        <CustomButton
                                                            label={"修改"}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>香雞漢堡</td>
                                                    <td>NT$ 40</td>
                                                    <td>
                                                        <CustomButton
                                                            label={"修改"}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Tab>
                                    <Tab eventKey={"訂單"} title="訂單">
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
                                                        <CustomButton
                                                            label={"詳細"}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>香雞漢堡</td>
                                                    <td>1</td>
                                                    <td>NT$ 40</td>
                                                    <td>{now}</td>
                                                    <td>
                                                        <CustomButton
                                                            label={"詳細"}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Tab>
                                </Tabs>
                            </TabContainer>
                        </div>
                    </div>
                </div>
                <div className="container pt-5 pb-5"></div>
            </div>
            <PositionBar position={"bottom"} />
        </div>
    );
}
