let counter = 0;





//アニメーション
function incrementCounter() {
    counter++;

    setTimeout(sleep, 10);
    function sleep(){
        requestAnimationFrame(incrementCounter);
    }
}
requestAnimationFrame(incrementCounter);