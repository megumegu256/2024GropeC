document.addEventListener('DOMContentLoaded', (event) => {
    "use strict";
    
    document.body.style.backgroundColor = 'skyblue'; //背景色
    document.onselectstart = () => false;
    
    
    //河内背景
    const backgroundImage = new Image();
    backgroundImage.src = 'IMG_4073.png';
    backgroundImage.style.position = 'absolute';
    backgroundImage.style.top = '0';
    backgroundImage.style.left = '0';
    backgroundImage.style.width = '100%';
    backgroundImage.style.height = '100%';
    backgroundImage.style.zIndex = '-100';
    document.body.appendChild(backgroundImage);
    
    const preloadImage = src => {
        const img = new Image();
        img.src = src;
    };
    const imagesToPreload = ["IMG_4073.png","IMG_4074.png","IMG_4075.png","IMG_4076.png"];
    imagesToPreload.forEach(preloadImage);
    
    //ブラウザに対応
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }

    //スクロールを無効
    document.body.style.overflow = 'hidden';

    //タイトル画面
    const titleScreen = document.createElement('div');
    titleScreen.style.position = 'absolute';
    titleScreen.style.top = '0';
    titleScreen.style.left = '0';
    titleScreen.style.width = '100%';
    titleScreen.style.height = '100%';
    titleScreen.style.display = 'flex';
    titleScreen.style.justifyContent = 'center';
    titleScreen.style.alignItems = 'center';
    titleScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    titleScreen.style.zIndex = '1000';
    const prepared = new Audio('俺は準備オッケー.mp3');
    const startButton = document.createElement('button');
    startButton.textContent = 'ゲームスタート';
    startButton.style.padding = '20px';
    startButton.style.fontSize = '24px';
    startButton.style.cursor = 'crosshair';

    titleScreen.appendChild(startButton);
    backgroundImage.addEventListener('load',()=>{
        document.body.appendChild(titleScreen);
    })

    startButton.addEventListener('click', () => {
        titleScreen.style.display = 'none';
        prepared.play();
        showCountdown(startGame);
    });
    
    let score = 0;
    let timeLeft = 60;
    //3カウント
    function showCountdown(callback) {
        const countdownScreen = document.createElement('div');
        countdownScreen.style.position = 'absolute';
        countdownScreen.style.top = '0';
        countdownScreen.style.left = '0';
        countdownScreen.style.width = '100%';
        countdownScreen.style.height = '100%';
        countdownScreen.style.display = 'flex';
        countdownScreen.style.justifyContent = 'center';
        countdownScreen.style.alignItems = 'center';
        countdownScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        countdownScreen.style.zIndex = '-1';
        document.body.appendChild(countdownScreen);

        let countdownValue = 3;
        const countdownText = document.createElement('div');
        countdownText.textContent = countdownValue;
        countdownText.style.fontSize = '48px';
        countdownText.style.color = 'white';
        countdownScreen.appendChild(countdownText);

        const countdownInterval = setInterval(() => {
            countdownValue--;
            if (countdownValue > 0) {
                countdownText.textContent = countdownValue;
            } else {
                clearInterval(countdownInterval);
                countdownScreen.remove();
                scoreDisplay.textContent = `Score: ${score}`;
                countdown.textContent = `Time: ${timeLeft}s`;
                callback();
            }
        }, 1000);
    }
    let first=10;

    //タイマー表示
    const countdown = document.createElement('div');
    countdown.style.position = 'absolute';
    countdown.style.top = `${(window.innerHeight / 2)}px`;
    countdown.style.left = '10px';
    countdown.style.fontSize = '24px';
    countdown.style.color = 'white';
    countdown.style.zIndex = '-3';
    document.body.appendChild(countdown);

    //スコア表示
    const scoreDisplay = document.createElement('div');
    scoreDisplay.style.position = 'absolute';
    scoreDisplay.style.top = `${(window.innerHeight / 2)}px`;
    scoreDisplay.style.right = `20px`;
    scoreDisplay.style.fontSize = '24px';
    scoreDisplay.style.color = 'white';
    scoreDisplay.style.zIndex = '-3';
    document.body.appendChild(scoreDisplay);


    function startGame() {
        const targets = [];

        //タイマー更新
        const timerInterval = setInterval(() => {
            timeLeft--;
            countdown.textContent = `Time: ${timeLeft}s`;
            if (timeLeft <= 10) countdown.style.color = `red`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                document.body.style.backgroundColor = 'skyblue';
                endGame();
            }
        }, 1000);

        //スコア更新関数
        function updateScore(points) {
            score += points;
            scoreDisplay.textContent = `Score: ${score}`;
        }
        function killedScore(target){
            const strdiv = document.createElement('div');
            const strp = document.createElement('p');
            strp.textContent = `+${target.dataset.score}`;
            strp.style.color = `yellow`;
            strp.style.fontSize = "30px";
            strp.style.fontFamily = 'Impact';
            strdiv.style.zIndex = "-1";
            strdiv.style.userSelect = 'none';
            strdiv.style.position = 'absolute';
            strdiv.style.top = target.style.top;
            strdiv.style.left = target.style.left;
            strdiv.classList.add("slide-up-fade-out")
            strdiv.function = setTimeout(() => {
                strdiv.remove();
            }, 1000);
            strdiv.appendChild(strp);
            document.body.appendChild(strdiv);
        }

        //的の作成関数
        function createTarget(score, size, color) {
            const target = document.createElement('div');
            const target_2d = document.createElement('div');
            const target_img = document.createElement('img');
            target.classList = 'image';
            target_2d.classList = '2d';
            target_2d.style.backgroundColor = 'rgba(0,0,0,0)';
            target.style.position = 'absolute';
            target_2d.style.position = 'absolute';
            target_2d.style.cursor = 'crosshair';
            target_img.style.width = `${size}px`;
            target.style.cursor = 'wait'
            target_2d.style.width = `${size}px` ;
            target.style.zIndex = '-2';
            target.style.top = `${Math.random() * (window.innerHeight - size)}px`;
            target.style.left = `${Math.random() * (window.innerWidth - size)}px`;
            target_2d.style.top = target.style.top;
            target_2d.style.left = target.style.left;
            target.dataset.score = score;
            if(first){
                first--;
                target_2d.function = setTimeout(() => {
                    if (targets.indexOf(target)!==-1){
                        createTarget(score, size, color);
                        target_2d.remove();
                        target.remove();
                        targets.splice(targets.indexOf(target), 1);
                    }
                }, 4);
            }else if(timeLeft>6){
                target_2d.function = setTimeout(() => {
                    if (targets.indexOf(target)!==-1){
                        createTarget(score, size, color);
                        target_2d.remove();
                        target.remove();
                        targets.splice(targets.indexOf(target), 1);
                    }
                }, 5000);
            }
            
            
            
            if (color === 0) {
                target_img.src = "IMG_4076.png";
            } else if (color === 1) {
                target_img.src= "IMG_4075.png";
            } else if (color === 2) {
                target_img.src= "IMG_4074.png";
            }
            

            target_2d.addEventListener('mousedown', () => {
                updateScore(parseInt(target.dataset.score));
                killedScore(target);
                target_2d.remove();
                target.remove();
                if (targets.indexOf(target)!==-1){
                    targets.splice(targets.indexOf(target), 1);
                    if (targets.length<8){ //3つ減ると新たに3つスポーン
                        spawnTargets();
                    }
                }
            });
            target.appendChild(target_img)
            document.body.appendChild(target);
            targets.push(target);
            target_2d.style.height = target_img.naturalHeight*size/target_img.naturalWidth;
            document.body.appendChild(target_2d);
        }

        //的スポーン関数
        function spawnTargets() {
            while (targets.length < 10) {
                const rand = Math.random();
                if (rand < 0.2) {
                    createTarget(5, 30, 0); //小
                } else if (rand < 0.5) {
                    createTarget(3, 45, 1); //中
                } else {
                    createTarget(1, 60, 2); //大
                }
            }
        }

        //ゲーム終了関数
        function endGame() {
            targets.forEach(target => target.remove());
            console.log(targets)
            scoreDisplay.textContent =  '';
            countdown.textContent = '';
            const resultScreen = document.createElement('div');
            resultScreen.style.position = 'absolute';
            resultScreen.style.top = '0';
            resultScreen.style.left = '0';
            resultScreen.style.width = '100%';
            resultScreen.style.height = '100%';
            resultScreen.style.display = 'flex';
            resultScreen.style.flexFlow = 'column';
            resultScreen.style.justifyContent = 'center';
            resultScreen.style.alignItems = 'center';
            resultScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            resultScreen.style.zIndex = '1000';

            const resultText = document.createElement('div');
            resultText.textContent = `Game Over! Score: ${score}`;
            resultText.style.fontSize = '24px';
            resultText.style.color = 'white';
            resultText.style.marginBottom = '20px';

            const retryButton = document.createElement('button');
            retryButton.textContent = '戻る';
            retryButton.style.padding = '20px';
            retryButton.style.width = '6em';
            retryButton.style.fontSize = '24px';
            retryButton.style.cursor = 'crosshair';
            retryButton.addEventListener('click', () => {
                resultScreen.remove();
                score = 0;
                timeLeft = 60;
                first = 10;
                titleScreen.style.display = 'flex';
                countdown.style.color = `white`;
                // updateScore(0);
            });

            resultScreen.appendChild(resultText);
            resultScreen.appendChild(retryButton);
            document.body.appendChild(resultScreen);
        }
        //ゲーム開始
        spawnTargets();
    }
});