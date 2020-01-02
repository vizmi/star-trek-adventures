//import './index.css'
import React from 'react';
import { useParams } from "react-router-dom";

export default function ChrEdit() {
    let { id } = useParams();
    return (
        <div >
            Edit character {id}
        </div>
    )
}
