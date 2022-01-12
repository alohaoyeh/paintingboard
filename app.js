const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const body = document.querySelector("body");

ctx.strokeStyle = "2c2c2c"; //context 안에 있는 모든 선들이 가질 색
ctx.lineWidth = 2.5;

canvas.width = 700;
canvas.height = 700;

let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) { //클릭했을 때가 아닌 계속 이 선 그리기는 실행되고 있음. 보이지 않을 뿐!
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath(); //path는 선(하나의 경로)이고 이것을 생성
        ctx.moveTo(x, y); //path를 마우스의 xy좌표로 옮기기(즉, 경로를 마우스가 위치한 xy로 한다는 것)(선의 시작)
    } else {
        ctx.lineTo(x, y); //클릭해서 전에 이어지던 path가 끝나는 좌표에서 라인이 시작됨.(선의 끝)
        ctx.stroke(); //선 그리기
    }
}

function onMouseDown(event) {
    painting = true;
}


function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    const colorOpacity = event.target.style.opacity;
    ctx.strokeStyle = color;
    colorOpacity = "0.2";
    body.style.backgroundColor = color;

    console.log(colorOpacity);
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove); //클릭하지 않고 마우스 움직일 때
    canvas.addEventListener("mousedown", startPainting); //클릭했을 때
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick))
    // 여기서 color은 그 array 안에 있는 각각의 아이템들을 대표하는 것뿐임.