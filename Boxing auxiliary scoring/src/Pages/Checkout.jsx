/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import PositionBar from "../Components/PositionBar";
import ItemCard from "../Components/ItemCard";

export default function Checkout() {
    const [itemList, setItemList] = useState([]);
    const removeItem = async () => {
        // TODO
    };

    return (
        <div>
            <Navbar />
            <div className="container pt-5">
                <div className="pt-5">
                    <ItemCard
                        name={"起司蛋餅"}
                        price={100}
                        quantity={2}
                        removeItem={removeItem}
                    />
                    <ItemCard
                        name={"鮪魚蛋餅"}
                        price={150}
                        quantity={3}
                        removeItem={removeItem}
                    />
                </div>
            </div>
            <PositionBar position={"bottom"} />
        </div>
    );
}
