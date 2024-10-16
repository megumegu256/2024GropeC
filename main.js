document.addEventListener('DOMContentLoaded', (event) => {
    "use strict";
    document.body.style.backgroundColor = 'skyblue'; //背景色
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

    const startButton = document.createElement('button');
    startButton.textContent = 'ゲームスタート';
    startButton.style.padding = '20px';
    startButton.style.fontSize = '24px';
    startButton.style.cursor = 'pointer';

    titleScreen.appendChild(startButton);
    document.body.appendChild(titleScreen);

    startButton.addEventListener('click', () => {
        titleScreen.style.display = 'none';
        showCountdown(startGame);
    });

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
                callback();
            }
        }, 1000);
    }

    let score = 0;
    let timeLeft = 60;

    //タイマー表示
    const countdown = document.createElement('div');
    countdown.style.position = 'absolute';
    countdown.style.top = `${(window.innerHeight / 2)}px`;
    countdown.style.left = '10px';
    countdown.style.fontSize = '24px';
    countdown.style.color = 'white';
    countdown.style.zIndex = '-1';
    document.body.appendChild(countdown);

    //スコア表示
    const scoreDisplay = document.createElement('div');
    scoreDisplay.style.position = 'absolute';
    scoreDisplay.style.top = `${(window.innerHeight / 2)}px`;
    scoreDisplay.style.right = `20px`;
    scoreDisplay.style.fontSize = '24px';
    scoreDisplay.style.color = 'white';
    scoreDisplay.style.zIndex = '-1';
    document.body.appendChild(scoreDisplay);


    function startGame() {
        const targets = [];

        //タイマー更新
        const timerInterval = setInterval(() => {
            timeLeft--;
            countdown.textContent = `Time: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);

        //スコア更新関数
        function updateScore(points) {
            score += points;
            scoreDisplay.textContent = `Score: ${score}`;
        }

        //的の作成関数
        function createTarget(score, size) {
            const target = document.createElement('div');
            target.style.position = 'absolute';
            target.style.width = `${size}px`;
            target.style.height = `${size}px`;
            target.style.backgroundColor = 'red';
            target.style.borderRadius = '50%';
            target.style.cursor = 'pointer';
            target.style.top = `${Math.random() * (window.innerHeight - size)}px`;
            target.style.left = `${Math.random() * (window.innerWidth - size)}px`;
            target.dataset.score = score;
            
            target.addEventListener('click', () => {
                updateScore(parseInt(target.dataset.score));
                target.remove();
                targets.splice(targets.indexOf(target), 1);

                if (targets.length<8){ //3つ減ると新たに3つスポーン
                    spawnTargets();
                }

            });
            document.body.appendChild(target);
            targets.push(target);
        }

        //的スポーン関数
        function spawnTargets() {
            while (targets.length < 10) {
                const rand = Math.random();
                if (rand < 0.2) {
                    createTarget(5, 20); //小
                } else if (rand < 0.5) {
                    createTarget(3, 40); //中
                } else {
                    createTarget(1, 60); //大
                }
            }
        }

        //ゲーム終了関数
        function endGame() {
            targets.forEach(target => target.remove());
            const resultScreen = document.createElement('div');
            resultScreen.style.position = 'absolute';
            resultScreen.style.top = '0';
            resultScreen.style.left = '0';
            resultScreen.style.width = '100%';
            resultScreen.style.height = '100%';
            resultScreen.style.display = 'flex';
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
            retryButton.textContent = 'リトライ';
            retryButton.style.padding = '20px';
            retryButton.style.fontSize = '24px';
            retryButton.style.cursor = 'pointer';
            retryButton.addEventListener('click', () => {
                resultScreen.remove();
                score = 0;
                timeLeft = 60;
                updateScore(0);
                
                startGame();
            });

            resultScreen.appendChild(resultText);
            resultScreen.appendChild(retryButton);
            document.body.appendChild(resultScreen);
        }

        //ゲーム開始
        spawnTargets();
    }
});