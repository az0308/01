/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./../Components/Navbar3";
import PositionBar from "../Components/PositionBar";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Col,
    Container,
    Row,
    Button,
} from "react-bootstrap";
import images1 from "../Images/01.png";
import images2 from "../Images/02.png";
import images3 from "../Images/06.png";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div className="pt-5">
                <Container className="text-center mt-5 mb-5 pb-5 pt-4">
                    <header>
                        <h1>拳擊輔助判分系統</h1>
                        <h4 className="mt-3">網站介紹:拳擊輔助判分系統......</h4>
                    </header>
                    <section className="mt-5 mb-4">
                        <h2>比賽類型</h2>
                        <Row className="justify-content-center mt-3 mb-4 ps-5 pe-5">
                            <Col md={6} lg={4} className="pb-3">
                                <Card>
                                    <CardImg variant="top" src={images1} alt="推薦餐點" />
                                    <CardBody>
                                        <CardTitle>跆拳道</CardTitle>
                                        <CardText>
                                            跆拳道是一種主要使用手及腳以進行格鬥或對抗的運動，為揉合了朝鮮半島古代搏擊防身技巧，以及跆跟、唐手和空手道融合的武術。    
                                        </CardText>
                                        <Button variant="danger" onClick={() => {navigate("/flv");}}>選擇</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={6} lg={4} className="pb-3">
                                <Card>
                                    <CardImg variant="top" src={images2} alt="推薦餐點" />
                                    <CardBody>
                                        <CardTitle>拳擊</CardTitle>
                                        <CardText>
                                            拳擊，別名西洋拳、搏擊，是一項由兩位選手對賽的體育運動，只可使用拳頭進行攻擊與防禦，並佩戴拳擊手套以減低對手受創的程度。
                                        </CardText>
                                        <Button variant="danger" onClick={() => {navigate("/flv2");}}>選擇</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={6} lg={4} className="pb-3">
                                <Card>
                                    <CardImg variant="top" src={images3} alt="推薦餐點" />
                                    <CardBody>
                                        <CardTitle>泰拳</CardTitle>
                                        <CardText>
                                            是泰國的傳統徒搏技術，特點是可以在極短的距離內，任意使用拳、腿、膝、肘攻擊對手，為一種注重實用的剛猛的競技型徒手武術。
                                        </CardText>
                                        <Button variant="danger" onClick={() => {navigate("/flv3");}}>選擇</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </section>
                </Container>
            </div>
            <PositionBar position={"bottom"} />
        </div>
    );
}   