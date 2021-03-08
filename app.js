var activePlayer,scores,roundScore,dice,winningScore,isPlaying, previousDice=0;
activePlayer = 0;
scores = [0,0];
roundScore=0;
isPlaying = true;

init();

function init(){
    winningScore = parseInt(prompt("Enter Winning Score"));
    dice = document.querySelector('.dice');
    dice.style.display = "none";
    document.querySelector('.score-0').textContent = 0;
    document.querySelector('.score-1').textContent = 0;
    document.querySelector('.current-0-score').textContent = 0;
    document.querySelector('.current-1-score').textContent = 0;
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.getElementById('player-0').textContent = 'PLAYER 1';
    document.getElementById('player-1').textContent = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    activePlayer=0;
    isPlaying = true;
    scores = [0,0];
    roundScore = 0;

}

function changePlayer(){
    roundScore=0;
    previousDice = 0;
    document.querySelector('.current-'+ activePlayer + '-score').textContent = roundScore;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer = (activePlayer===0) ? 1 : 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    dice.style.display='none';
}


document.querySelector('.btn-roll').addEventListener('click',function(){
    if(isPlaying){
        
        var num = Math.floor(Math.random()*6) + 1;
        dice.src = 'dice-' + num +'.png';
        dice.style.display = 'block';
        if(num===6 && previousDice===6){
            scores[activePlayer] = 0;
            document.querySelector('.score-' + activePlayer).textContent = scores[activePlayer];
            setTimeout(changePlayer, 100);
        }
        previousDice = num;
        if(num===1) setTimeout(changePlayer, 100);
        else roundScore+=num;
        document.querySelector('.current-'+ activePlayer + '-score').textContent = roundScore;
        
    }

});

document.querySelector('.btn-new').addEventListener('click',init);

document.querySelector('.btn-hold').addEventListener('click',function(){

    if(isPlaying && roundScore!==0){
        
        scores[activePlayer] += roundScore;
        document.querySelector('.score-' + activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer] >= winningScore){
            dice.style.display='none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.getElementById('player-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.current-' + activePlayer + '-score').textContent = 0;
            isPlaying = false;
        }
        else changePlayer();        
    
    }

});


