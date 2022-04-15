import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socketClient = io('http://localhost:4000');

socketClient.on("connect", () => {
	 console.log("connection server"); 
	})


const SocketFunc = () => {
	const a = a;
};


export default SocketFunc;