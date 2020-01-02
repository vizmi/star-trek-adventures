//import './index.css'
import React from 'react';
import { useParams } from "react-router-dom";

export default function ChrView() {
    let { id } = useParams();
    return (
        <div >
            View character {id}
        </div>
    )
}
