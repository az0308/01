/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
    ButtonGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "react-bootstrap";
import CustomButton from "./CustomButton";

export default function CustomModal({ title, count, onHide, isShow }) {
    const [currentCount, setCurrentCount] = useState(count);
    const minusCount = () => {
        if (currentCount > 1) {
            setCurrentCount(currentCount - 1);
        } else {
            setCurrentCount(1);
        }
    };
    const addCount = () => {
        if (currentCount >= 1) {
            setCurrentCount(currentCount + 1);
        } else {
            setCurrentCount(1);
        }
    };
    const updateOrder = async () => {
        if (currentCount > 0) {
            // TODO
        }
    };

    useEffect(() => {
        setCurrentCount(count);
    }, []);

    return (
        <div>
            <div className="container">
                <Modal onHide={onHide} show={isShow} centered>
                    <ModalHeader closeButton>
                        <h3 className="text-center fw-bold">{title}</h3>
                    </ModalHeader>
                    <ModalBody>
                        <div className="mx-auto text-center">
                            <h5 className="fw-bold text-start">購買數量</h5>
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
                                    {currentCount}
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
                    </ModalBody>
                    <ModalFooter>
                        <CustomButton
                            type={"button"}
                            label={"修改"}
                            onClick={updateOrder}
                        />
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}
