import io from 'socket.io-client';

export let socket;

export const initSocketConnection = () => {
  if (socket) return;
  socket = io.connect("http://localhost:4000");
};

// 이벤트 명을 지정하고 데이터를 보냄
export const sendSocketMessage = (cmd, body = null) => {
  if (socket == null || socket.connected === false) {
    initiateSocketConnection();
  }
  socket.emit("message", {
    cmd: cmd,
    body: body,
  });
};


let cbMap = new Map();

// 해당 이벤트를 받고 콜백 함수를 실행함
export const socketInfoReceived = (cbType, cb) => {
  cbMap.set(cbType, cb);
  
  if (socket.hasListeners("message")) {
    socket.off("message");
  }

  socket.on("message", ret => {
    for (let [, cbValue] of cbMap) {
      cbValue(null, ret);
    }
  });
};

// 소켓 연결을 끊음
export const disconnectSocket = () => {
  if (socket == null || socket.connected === false) {
    return;
  }
  socket.disconnect();
  socket = undefined;
};