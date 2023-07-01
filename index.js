const 정답 = "APPLE";

let index = 0;
let attempts = 0; //시도 횟수
let timer;

function appStart() {
  const handleBackspace = () => {
    if (index > 0) {
      const preblock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preblock.innerText = "";
    }

    if (index !== 0) index -= 1;
  };
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center;position:absolute; top:25vh; left:43vw; background-color:white; width:200px;height:100px;";
    document.body.appendChild(div);
  };

  const nextline = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameover();
    clearInterval(timer);
  };
  const handelEnter = () => {
    let 맞은갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한글자 = block.innerText;
      const 정답글자 = 정답[i];
      if (입력한글자 === 정답글자) {
        맞은갯수 += 1;
        block.style.background = "green";
      } else if (정답.includes(입력한글자)) block.style.background = "yellow";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }
    if (맞은갯수 === 5) gameover();
    nextline();
  };

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    if (index === 5) {
      if (event.key === "Enter") handelEnter();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const 시작시간 = new Date();

    function setTime() {
      const 현재시간 = new Date();
      const 흐른시간 = new Date(현재시간 - 시작시간);
      const 분 = 흐른시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른시간.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.querySelector(".time");
      timeH1.innerText = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
