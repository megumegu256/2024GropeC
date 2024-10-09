//初期設定
const canvas = document.getElementById("eggCanvas");
const ctx = canvas.getContext("2d");



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