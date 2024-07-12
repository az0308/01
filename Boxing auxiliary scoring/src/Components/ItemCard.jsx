/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "react-bootstrap";
import CustomModal from "./CustomModal";

export default function ItemCard({ name, price, quantity, removeItem }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const showModal = () => {
        setModalIsOpen(true);
    };
    const hideModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="container mb-3">
            <div className="container">
                <Card>
                    <CardHeader className="text-center">
                        <h3 className="fw-bold">{name}</h3>
                    </CardHeader>
                    <CardBody>
                        <p>NT$ {price}</p>
                        <p>數量: {quantity}</p>
                    </CardBody>
                    <CardFooter className="text-end">
                        <button
                            className="btn btn-danger me-2"
                            onClick={removeItem}
                        >
                            刪除
                        </button>
                        <button
                            className="btn btn-main-color text-white"
                            onClick={showModal}
                        >
                            修改
                        </button>
                    </CardFooter>
                </Card>
                <CustomModal
                    onHide={hideModal}
                    isShow={modalIsOpen}
                    title={"修改餐點"}
                    count={quantity}
                />
            </div>
        </div>
    );
}
