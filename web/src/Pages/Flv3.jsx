import React, { useEffect, useRef, useState } from 'react';
import flvjs from 'flv.js';
import Navbar from "../Components/Navbar3";
import PositionBar from "../Components/PositionBar";
import {
    Container,
    Row,
    Col,
    Button,
    Form
} from "react-bootstrap";

const VideoPlayer = () => {
    const videoElement = useRef(null);
    const [flvPlayer, setFlvPlayer] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [message, setMessage] = useState("請上傳影片文件");
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    const [match, setMatch] = useState("");
    const [teamA, setTeamA] = useState("");
    const [teamB, setTeamB] = useState("");
    const [records, setRecords] = useState([]);

    useEffect(() => {
        console.log('isSupported: ' + flvjs.isSupported());
        console.log('是否支持点播视频：' + flvjs.getFeatureList().mseFlvPlayback);
        console.log('是否支持httpflv直播流：' + flvjs.getFeatureList().mseLiveFlvPlayback);

        return () => {
            if (flvPlayer) {
                flvPlayer.destroy();
            }
        };
    }, [flvPlayer]);

    const initFlv = (url) => {
        const ele = videoElement.current;
        if (!ele) return;

        if (flvPlayer) {
            flvPlayer.destroy();
            setFlvPlayer(null);
        }

        if (url.endsWith('.flv')) {
            const player = flvjs.createPlayer({
                type: 'flv',
                isLive: true,
                hasAudio: false,
                cors: true,
                url: url,
            });
            player.attachMediaElement(ele);
            player.load();
            player.play();
            setFlvPlayer(player);

            player.on(flvjs.Events.ERROR, (errorType, errorDetail, errorInfo) => {
                console.log('类型:' + JSON.stringify(errorType), '报错内容' + errorDetail, '报错信息' + errorInfo);
            });

            player.on(flvjs.Events.STATISTICS_INFO, (errorType, errorDetail, errorInfo) => {
                console.log('类型:' + JSON.stringify(errorType), '报错内容' + errorDetail, '报错信息' + errorInfo);
            });
        } else {
            ele.src = url;
            ele.load();
            ele.play();
        }
    };

    const load = () => {
        if (uploadedFile) {
            const url = URL.createObjectURL(uploadedFile);
            initFlv(url);
        }
    };

    const start = () => {
        if (flvPlayer) {
            flvPlayer.play();
        } else {
            videoElement.current.play();
        }
    };

    const pause = () => {
        if (flvPlayer) {
            flvPlayer.pause();
        } else {
            videoElement.current.pause();
        }
    };

    const destroy = () => {
        if (flvPlayer) {
            flvPlayer.pause();
            flvPlayer.unload();
            flvPlayer.detachMediaElement();
            flvPlayer.destroy();
            setFlvPlayer(null);
        } else {
            const ele = videoElement.current;
            ele.pause();
            ele.removeAttribute('src');
            ele.load();
        }
        setMessage("请上载影片文件");
    };

    const screenshot = () => {
        const ele = videoElement.current;
        if (ele) {
            const canvas = document.createElement('canvas');
            canvas.width = ele.clientWidth;
            canvas.height = ele.clientHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(ele, 0, 0, ele.clientWidth, ele.clientHeight);
            viewPicture(canvas.toDataURL('image/jpeg'));
        }
    };

    const viewPicture = (url) => {
        const id = 'viewPicture' + new Date().getTime();
        const container = document.createElement('div');
        container.id = id;
        container.style.cssText = 'position: fixed;right:0;bottom:0;height:200px;width:300px;transition: 3s;';
        const img = document.createElement('img');
        img.style.cssText = 'width:100%;height:100%;object-fit: inherit;';
        img.src = url;
        container.appendChild(img);
        document.body.appendChild(container);

        setTimeout(() => {
            container.style.width = '0';
            container.style.height = '0';
        }, 3000);
        setTimeout(() => {
            document.body.removeChild(document.getElementById(id));
        }, 5000);
    };

    const zoom = () => {
        if (isFullscreen()) exitFullScreen();
        else requestFullScreen();
    };

    const isFullscreen = () => {
        return (
            document.fullscreenElement ||
            document.msFullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            false
        );
    };

    const requestFullScreen = () => {
        const documentRequestScreenElement = videoElement.current;
        const requestMethod =
            documentRequestScreenElement.requestFullScreen ||
            documentRequestScreenElement.webkitRequestFullScreen ||
            documentRequestScreenElement.mozRequestFullScreen ||
            documentRequestScreenElement.msRequestFullScreen;

        if (requestMethod) {
            requestMethod.call(documentRequestScreenElement);
        }
    };

    const exitFullScreen = () => {
        const exitMethod =
            document.exitFullscreen ||
            document.mozCancelFullScreen ||
            document.webkitExitFullscreen ||
            document.msExitFullscreen;

        if (exitMethod) {
            exitMethod.call(document);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            const url = URL.createObjectURL(file);
            setMessage("");
            initFlv(url);
        }
    };

    const addRecord = () => {
        const newRecord = `${teamA} ${scoreA} - ${scoreB} ${teamB} (比赛: ${match})`;
        setRecords([newRecord, ...records]);
    };

    return (
        <div>
            <Navbar />
            <div className="pt-5">
                <Container className="text-center mt-5 mb-5 pb-5 pt-4">
                    <header>
                        <h1>泰拳</h1>
                        <p className="mt-3">
                            規則:先獲得10分者勝利
                        </p>
                        <p className="mt-3">
                            得分:頭2分，手3分，腳4分
                        </p>
                    </header>
                    <video ref={videoElement} id="video-contianer" autoPlay muted controls width="1024" height="576">
                        {message}
                    </video>
                    <div>
                        <br />
                    </div>
                    <input type="file" onChange={handleFileChange} accept="video/flv,video/mp4" />
                    {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
                    <Button variant="secondary" onClick={load}>重新加載</Button>
                    {'\u00A0\u00A0\u00A0'}
                    <Button variant="secondary" onClick={start}>開始</Button>
                    {'\u00A0\u00A0\u00A0'}
                    <Button variant="secondary" onClick={pause}>暫停</Button>
                    {'\u00A0\u00A0\u00A0'}
                    <Button variant="secondary" onClick={zoom}>縮放</Button>
                </Container>
            </div>

            <Container className="text-center mt-5 mb-5 pb-5">
                <Row className="align-items-center">
                    <Col>
                        <h2>{teamA} 得分: {scoreA}</h2>
                    </Col>
                    <Col>
                        <Form.Group controlId="teamA">
                            <Form.Control type="text" placeholder="輸入A選手的名字" value={teamA} onChange={(e) => setTeamA(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs="auto">
                        <h2>VS</h2>
                    </Col>
                    <Col>
                        <Form.Group controlId="teamB">
                            <Form.Control type="text" placeholder="輸入B選手的名字" value={teamB} onChange={(e) => setTeamB(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <h2>{teamB} 得分: {scoreB}</h2>
                    </Col>
                </Row>
                
                <Container className="text-center mt-5 mb-5 pb-5">
                <Row className="d-flex justify-content-center">
                    <Col xs="auto">  
                        <h2>比賽記錄</h2>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col xs="auto">  
                        <div style={{ maxHeight: '200px', maxWidth: '500px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                            {records.map((record, index) => (
                                <div key={index}>{record}</div>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center mt-3">
                    <Col xs="auto">
                        <Button variant="warning" >保存此場比賽</Button>
                    </Col>
                </Row>
                </Container>
            </Container> 
            <PositionBar position={"bottom"} />
        </div>
    );
};

export default VideoPlayer;
