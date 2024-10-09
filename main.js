

//アニメーション
function incrementCounter() {
    setTimeout(sleep, 10);
    function sleep(){
        requestAnimationFrame(incrementCounter);
    }
}
requestAnimationFrame(incrementCounter);