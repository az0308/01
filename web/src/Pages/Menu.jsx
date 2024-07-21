/* eslint-disable no-unused-vars */
import React from "react";
import PositionBar from "./../Components/PositionBar";
import Navbar from "./../Components/Navbar";
import {
    Card,
    CardBody,
    CardImg,
    CardTitle,
    Col,
    Image,
    ListGroup,
    ListGroupItem,
    Row,
    Tab,
    TabContainer,
    Tabs,
} from "react-bootstrap";
import images from "../Images/images.jpg";
import { useNavigate } from "react-router-dom";
import "../Css/index.css";

export default function Menu() {
    const navigate = useNavigate();

    const toDetail = () => {
        navigate("/order/detail");
    };

    return (
        <div>
            <Navbar />
            <div className="container pt-5 pb-5">
                <h1 className="text-center pt-5">菜單選擇</h1>

                <TabContainer>
                    <Tabs
                        defaultActiveKey={"蛋餅類"}
                        className="mb-3 pt-5"
                        variant="pills"
                        fill
                    >
                        <Tab eventKey={"蛋餅類"} title="蛋餅類">
                            <Card style={{ width: "100%" }} className="mx-auto">
                                <ListGroup variant="flush">
                                    <ListGroupItem
                                        className="mb-3"
                                        onClick={toDetail}
                                    >
                                        <div className="row">
                                            <div className="col-2">
                                                <CardImg
                                                    variant="top"
                                                    src={images}
                                                ></CardImg>
                                            </div>
                                            <div className="col-5">
                                                <CardTitle>起司蛋餅</CardTitle>
                                                <CardBody>價錢: 40 元</CardBody>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem onClick={toDetail}>
                                        <div className="row">
                                            <div className="col-2">
                                                <CardImg
                                                    variant="top"
                                                    src={images}
                                                ></CardImg>
                                            </div>
                                            <div className="col-5">
                                                <CardTitle>燒肉蛋餅</CardTitle>
                                                <CardBody>價錢: 40 元</CardBody>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Tab>
                        <Tab eventKey={"吐司類"} title="吐司類">
                            <Card style={{ width: "100%" }} className="mx-auto">
                                <ListGroup variant="flush" onClick={toDetail}>
                                    <ListGroupItem className="mb-3">
                                        <div className="row">
                                            <div className="col-2">
                                                <CardImg
                                                    variant="top"
                                                    src={images}
                                                ></CardImg>
                                            </div>
                                            <div className="col-5">
                                                <CardTitle>厚片吐司</CardTitle>
                                                <CardBody>價錢: 40 元</CardBody>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Tab>
                        <Tab eventKey={"漢堡類"} title="漢堡類">
                            <Card style={{ width: "100%" }} className="mx-auto">
                                <ListGroup variant="flush" onClick={toDetail}>
                                    <ListGroupItem className="mb-3">
                                        <div className="row">
                                            <div className="col-2">
                                                <CardImg
                                                    variant="top"
                                                    src={images}
                                                ></CardImg>
                                            </div>
                                            <div className="col-5">
                                                <CardTitle>香雞漢堡</CardTitle>
                                                <CardBody>價錢: 30 元</CardBody>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Tab>
                        <Tab eventKey={"飲料類"} title="飲料類">
                            <Card style={{ width: "100%" }} className="mx-auto">
                                <ListGroup variant="flush" onClick={toDetail}>
                                    <ListGroupItem className="mb-3">
                                        <div className="row">
                                            <div className="col-2">
                                                <CardImg
                                                    variant="top"
                                                    src={images}
                                                ></CardImg>
                                            </div>
                                            <div className="col-5">
                                                <CardTitle>紅茶</CardTitle>
                                                <CardBody>價錢: 25 元</CardBody>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Tab>
                    </Tabs>
                </TabContainer>
            </div>
            <PositionBar position={"bottom"} />
        </div>
    );
}
