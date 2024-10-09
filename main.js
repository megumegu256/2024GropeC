//初期設定
const canvas = document.getElementById("ShotGame");
const ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);
canvas.width = 1920;
canvas.height = 1080;
    


//タイトル画面
document.addEventListener('keydown', event => {
    // 変数eventの中身はKeyboardEventオブジェクト
    console.log(event);
});



//ゲーム画面
function incrementCounter() {

    setTimeout(sleep, 10);
    function sleep(){
        requestAnimationFrame(incrementCounter);
    }
}
requestAnimationFrame(incrementCounter);


//リザルト画面
