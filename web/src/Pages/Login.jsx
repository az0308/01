/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PositionBar from "../Components/PositionBar";
import InputPattern from "../Components/InputPattern";
import CustomButton from "../Components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import userEmailRecoilAtom from "../Data/Recoil/userEmailRecoilAtom";
import usersAPI from "../Data/Restful/usersAPI";

export default function Login() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useRecoilState(userEmailRecoilAtom);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        if (!email || !password) {
            alert('請輸入電子郵件和密碼');
            return;
        }
        const response = await usersAPI.login(email, password);
        if (response.code === 200) {
            console.log(response);
            // TODO: jwt token
            setUserEmail(email);
            navigate("/home2");
        } else {
            alert(response.message);
        } 
    };

    const findpassword = async () => {
            alert('功能未開放');
    };

    return (
        <div>
            <PositionBar position={"top"} />
            <div className="container pt-5">
                <h1 className="pt-5 mt-5 text-center">使用者登入</h1>
                <div className="pt-5 ps-5 pe-5 pb-3">
                    <InputPattern
                        label={"電子郵件"}
                        type={"email"}
                        placeholder={"請輸入電子郵件"}
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <InputPattern
                        label={"密碼"}
                        type={"password"}
                        placeholder={"請輸入密碼"}
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <div className="row">
                        <div className="col-6">
                            <CustomButton
                                type={"button"}
                                label={"登入"}
                                color={"danger"}
                                onClick={login}
                            />
                        </div>
                        <div className="col-6">
                            <CustomButton
                                type={"button"}
                                label={"忘記密碼"}
                                color={"danger"}
                                onClick={findpassword}
                            />
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="pt-5 pb-5"></div>
            <PositionBar position={"bottom"} />
        </div>
    );
}
