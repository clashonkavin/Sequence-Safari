let last=0
var score = 0;
var w = 0
var sBody = [];
var vX=0;
var vY=0;
var lifes = 5
var dead = 0
var pause = false
var pTime = 120
var lettereated = 0
var food = []
var bX=0
var bY=0
var speed = 10
var headDirection = 'faceRight'
var mute = false
const foodS = new Audio('Music/eat.wav')
const buffS = new Audio('Music/buffs.wav')
const heartdie = new Audio('Music/heartdie.wav')
const wrongBuzzer = new Audio('Music/wrong_buzzer.mp3')
const hiscoreS = new Audio('Music/hiscore.wav')
const init = new Audio('Music/init.wav')
const paused = new Audio('Music/paused.wav')
const GameOverS = new Audio('Music/Gameover.wav')
var bX = 0
var bY = 0
var heartX = 0
var heartY = 0
var lightX = 0
var lightY = 0
var obsV = 1
var timerstart = false
var leaderboard = JSON.parse(localStorage.getItem('leaderboard'))
if (leaderboard == undefined || leaderboard == null) {
    var leaderboard = []
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function createSentence(){
    // I made this function such that the word sequence you get in the game is from this sentence
    let sentence = 'agate garnet pearl opal beach paint shake head earth alive crate ought sand stone block ducks nymph kings'.split(' ')
    words = []
    for (let i=0;i<sentence.length;i++){
        arr = []
        for (let j=0;j<sentence[i].length;j++){
            arr.push(sentence[i][j].toUpperCase())
        }
        words.push(arr)
    }
    words = shuffle(words)
}


function setPortal(){
    let choice = Math.floor(Math.random()*2)
    if (choice==0){
        p1X = Math.floor(Math.random()*(bsize/2))+1
        p1Y = Math.floor(Math.random()*(bsize/2))+1
        p2X = Math.floor(Math.random()*(bsize/2)+bsize/2)
        p2Y = Math.floor(Math.random()*(bsize/2)+bsize/2)
        arr1 = [p1X,p1Y]
        arr2 = [p2X,p2Y]
        if (isInArray(arr1,sBody) || isInArray(arr1,food) || isInArray(arr2,sBody) || isInArray(arr2,food)){
            setPortal()
        }
    }
    else{
        p1X = Math.floor(Math.random()*(bsize/2)+bsize/2)
        p1Y = Math.floor(Math.random()*(bsize/2))+1
        p2X = Math.floor(Math.random()*(bsize/2))+1
        p2Y = Math.floor(Math.random()*(bsize/2)+bsize/2)
        arr1 = [p1X,p1Y]
        arr2 = [p2X,p2Y]
        if (isInArray(arr1,sBody) || isInArray(arr1,food) || isInArray(arr2,sBody) || isInArray(arr2,food)){
            setPortal()
        }     
    }
}

function setBuff(){
    bX = Math.floor(Math.random()*(bsize))+1
    bY = Math.floor(Math.random()*(bsize))+1
    let arr = [bX,bY]
    if (isInArray(arr,sBody) || isInArray(arr,food) || arr == [heartX,heartY] || arr == [lightX,lightY] || arr==[p1X,p1Y] || arr==[p2X,p2Y]){
        setBuff()
    }
}

function setHeart(){
    heartX = Math.floor(Math.random()*(bsize))+1
    heartY = Math.floor(Math.random()*(bsize))+1
    let arr = [heartX,heartY]
    if (isInArray(arr,sBody) || isInArray(arr,food) || arr == [bX,bY] || arr == [lightX,lightY] || arr==[p1X,p1Y] || arr==[p2X,p2Y]){
        setHeart()
    }
}

function setLightning(){
    lightX = Math.floor(Math.random()*(bsize))+1
    lightY = Math.floor(Math.random()*(bsize))+1
    let arr = [lightX,lightY]
    if (isInArray(arr,sBody) || isInArray(arr,food) || arr == [bX,bY] || arr == [heartX,heartY] || arr==[p1X,p1Y] || arr==[p2X,p2Y]){
        setLightning()
    }
}

function setTarget(){
    document.getElementById('target').innerHTML = ''
    for (let i = 0; i < colors.length ; i++){
        tile = document.createElement('div')
        tile.innerHTML = colors[i]
        tile.classList.add('sample')
        tile.classList.add('unEaten')
        document.getElementById('target').append(tile)
    }
    
}

function setFood(){
    for (let i=0;i<colors.length;i++){
        let fX = Math.floor(Math.random()*(bsize-4))+2
        let fY = Math.floor(Math.random()*(bsize-4))+2
        arr = [fX,fY]
        if (isInArray(arr,sBody) || isInArray(arr,food)){
            i--;
        }
        else{
            food.push([fX,fY])
        }
    }
}

function timer(){
    const timeEle = document.getElementById('timer')
    displayTime()
    countDown = setInterval(()=>{
        pTime --;
        displayTime()
        if (pTime==0){
            document.getElementById('gameover_dialog').showModal()
            window.cancelAnimationFrame(animate)
            clearInterval(countDown)
            leaderboard.push([pname,score])
            localStorage.setItem("leaderboard",JSON.stringify(leaderboard))
            document.removeEventListener('keydown',changeDirection)
            document.removeEventListener('mousedown',changeDirection)
        }
    },1000)
}

function displayTime(){
    const timeEle = document.getElementById('timer')
    let sec = pTime%60
    let min = Math.floor(pTime/60)
    timeEle.innerHTML = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`
}

function reset(){
    let hiscoreval = JSON.parse(localStorage.getItem("hiscore"))
    if (score > hiscoreval){
        localStorage.setItem("hiscore",JSON.stringify(score))       
    }
    window.location.reload()
}

function dispHS(){
    let Obj = localStorage.getItem("hiscore")
    if (Obj == null){
        let Val = 0;
        localStorage.setItem("hiscore",JSON.stringify(Val))
    }
    else{
        hiVal = JSON.parse(Obj)
        document.getElementById("highScore").innerHTML = 'High Score : ' + hiVal     
    }
}

function toggleSound(){
    if (!mute){
        mute = true
        document.getElementById('volume').style.backgroundImage = 'url(Pics/mute.png)'
    }
    else if (mute){
        mute = false
        document.getElementById('volume').style.backgroundImage = 'url(Pics/volum.png)'
    }
}

function pausee() {
    if (!pause) {
        if (!mute){paused.play()}
        document.getElementById("pause_dialog").showModal()
        window.cancelAnimationFrame(animate)
        clearInterval(countDown)
        document.getElementById('pause').style.backgroundImage = 'url(Pics/play.png)'
        pause = true
        document.removeEventListener('keydown',changeDirection)
        document.removeEventListener('mousedown',changeDirection)
    } 
    else if (pause){
        document.getElementById("pause_dialog").close()
        animate = window.requestAnimationFrame(letsmove)
        document.addEventListener('keydown', changeDirection)
        document.addEventListener('mousedown',changeDirection)
        document.getElementById('pause').style.backgroundImage = 'url(Pics/pause.png)'
        timer()
        pause = false
    }
}

function isInArray(value,arr){
    for(let i=0;i<arr.length;i++){
        if(arr[i][0]==value[0] && arr[i][1]==value[1]){
            return true
        }
    }
    return false
}


function startPosition(){
    let r1 = Math.floor(Math.random()*(bsize-4))+3
    let r2 = Math.floor(Math.random()*(bsize-4))+3
    let l = sBody.length
    for (let i=0;i<l;i++){
        sBody.shift()
    }
    sBody.push([r1,r2])
    sBody.push([r1-1,r2])
    sBody.push([r1-2,r2])
}

function setBoard(){
    element = document.getElementById('gbox')
    const style = getComputedStyle(element)
    let len = style.height
    for(let i=1;i<=bsize;i++){
            for(let j=1;j<=bsize;j++){
                let tile = document.createElement('div')
                tile.id  = j.toString()+'/'+i.toString()
                if ((i+j)%2==0){
                    tile.classList.add("even")
                }
                else{
                    tile.classList.add("odd") 
                }
                tile.style.height = (parseInt(len)/bsize).toString() + 'px'
                tile.style.width = (parseInt(len)/bsize).toString() + 'px'
                
                document.getElementById('gbox').append(tile)
            }
        }
    }
    
    function otherlistener(e){
        if(e.key=="Escape"){
            pausee()
        }
        if(e.key=='h'){
            for (let i=0;i<leaderboard.length;i++){
                ele = document.createElement('div')
                ele.innerHTML = leaderboard[i][0].toString()+leaderboard[i][1]
                document.getElementById('leaderboard').append(ele)
            }
        }
    }

    function dispHearts(){
        let heart = "❤️"
        let disp1 = heart.repeat(lifes)
        let blackHeart = "🖤"
        let disp2 = blackHeart.repeat(dead)
        document.getElementById('hearts').innerHTML = disp1 + disp2
    }
    
    function ruleBreak(){
        lifes--;
        dead++;
        dispHearts()
        if (lifes==0){
            if (!mute){GameOverS.play()}
            document.getElementById('gameover_dialog').showModal()
            window.cancelAnimationFrame(animate)
            clearInterval(countDown)
            leaderboard.push([pname,score])
            localStorage.setItem("leaderboard",JSON.stringify(leaderboard))
            document.removeEventListener('keydown',changeDirection)
            document.removeEventListener('mousedown',changeDirection)

    }
    if (!mute){heartdie.play()}
    document.innerHTML=""
}

function changeDirection(e){
    if (timerstart==false){
        timer()
        timerstart = true
    }
    if ((e.key=="ArrowLeft" || e.key == 'a' || e.target==left) && vX!=1 && headDirection!='faceRight'){
        vX = -1
        vY = 0
        headDirection = "faceLeft"
    }
    else if((e.key=="ArrowRight" || e.key == 'd' || e.target==right) && vX!=-1 && headDirection!='faceLeft'){
        vX = 1
        vY = 0
        headDirection = "faceRight"
    }
    else if((e.key=="ArrowUp" || e.key == 'w' || e.target==up ) && vY!=1 && headDirection!='faceBottom'){
        vX = 0
        vY = -1
        headDirection = "faceTop"
    }
    else if((e.key=="ArrowDown" || e.key == 's' || e.target==down) && vY!=-1 && headDirection!='faceTop'){
        vX = 0
        vY = 1
        headDirection = "faceBottom"
    }
}


function setObstacle(){
    dir = Math.floor(Math.random()*2)
    ordinate = Math.floor(Math.random()*(bsize-4))+2
    let checkCollide = false
    for (let i=0;i<sBody.length;i++){
        if (ordinate==sBody[i][0]){
            checkCollide = true
        }
    }
    if (dir == 1 && ordinate == sBody[0][1]){
        setObstacle()
    }
    else if (dir == 0 && checkCollide==true){
        setObstacle()
    }

    if (dir==0){
        obsX = ordinate
        obsY = 1
    }
    else if (dir==1){
        obsX = 1
        obsY = ordinate
    }

}

function letsmove(cur){
    animate = window.requestAnimationFrame(letsmove)
    if((cur-last)/1000<(1/speed)){
        return
    }
    last=cur

    let hX = sBody[0][0] + vX
    let hY = sBody[0][1] + vY
    
    if (dir==0){
        obsY += obsV
    }
    else if (dir==1){
        obsX += obsV
    }

    if (obsX==bsize || obsX == 1 || obsY==bsize || obsY == 1 ){
        obsV *= -1
    }
    
    if(hX>bsize || hY>bsize || hX<1 || hY<1){
        if (hX>bsize){
            hX -= bsize
        }
        else if (hX<1){
            hX += bsize
        }
        else if (hY>bsize){
            hY-=bsize
        }
        else if (hY<1){
            hY += bsize
        }
        hY = parseInt(hY)
        hX = parseInt(hX)
        for(let i=sBody.length-1;i>=1;i--){
            sBody[i] = {...sBody[i-1]} 
        }
        sBody[0][0] = hX
        sBody[0][1] = hY
        ruleBreak() 
        updateSnake()
        return
    }
    
    if (hX == p1X && hY == p1Y){
        hX = p2X+vX
        hY = p2Y+vY
        for(let i=sBody.length-1;i>=1;i--){
            sBody[i] = {...sBody[i-1]} 
        }
        sBody[0][0] = hX
        sBody[0][1] = hY
        updateSnake()
        return
    }
    else if (hX == p2X && hY == p2Y){
        hX = p1X+vX
        hY = p1Y+vY
        for(let i=sBody.length-1;i>=1;i--){
            sBody[i] = {...sBody[i-1]} 
        }
        sBody[0][0] = hX
        sBody[0][1] = hY
        updateSnake()
        return
    }
    
    else if (hX==food[0][0] && hY==food[0][1]){
        if (!mute){foodS.play()}
        score+=1
        lettereated += 1
        food.shift()
        
        document.getElementById('score').innerHTML = "Score: "+score.toString()
        let obj = document.getElementsByClassName('sample')
        arr = Array.from(obj)
        for (let m=0;m<lettereated;m++){
            arr[m].classList.remove('unEaten') 
            arr[m].classList.add('Eaten') 
        }
        for(let i=sBody.length-1;i>=1;i--){
            sBody[i] = {...sBody[i-1]} 
        }
        sBody[0][0] = hX
        sBody[0][1] = hY   
        if (score == hiVal && score!=0){
            if (!mute){hiscoreS.play()}
        } 
        if (food.length == 0){
            w++
            colors = words[w]
            setFood()
            lettereated=0
            setTarget()
            sBody.unshift([hX,hY])
            pTime+=5
            speed += 2
        }
    }
    else if (hX==bX && hY==bY){
        if (!mute){buffS.play()}
        bX=0
        bY=0
        speed -= 4
        setTimeout(()=>{
            if (bX==0 && bY==0){
                        powerups()
                    }
        },5000)
    }
    else if (hX==heartX && hY==heartY){
        heartX=0
        heartY=0
        if (!(dead==0)){
            if (!mute){buffS.play()}
            lifes++
            dead--
            dispHearts()
        }
        setTimeout(()=>{
            if (heartX==0 && heartY==0){
                        powerups()
                    }
        },5000)
    }
    else if (hX==lightX && hY==lightY){
        if (!mute){buffS.play()}
        lightX=0
        lightY=0
        speed += 2
        setTimeout(()=>{
            if (heartX==0 && heartY==0){
                        powerups()
                    }
        },5000)
    }
    else if (!(vX==0 && vY==0)){
        if(isInArray([hX,hY],sBody)){
            ruleBreak() 
            vX=0
            vY=0
            startPosition()
            return
        }
        for(let i=sBody.length-1;i>=1;i--){
            sBody[i] = {...sBody[i-1]} 
        }
        sBody[0][0] = hX
        sBody[0][1] = hY
    }

    if (isInArray([obsX,obsY],sBody)){
        ruleBreak() 
    }
        
    updateSnake()
}


function updateSnake() {
    document.getElementById('gbox').innerHTML = ''
    setBoard()
    let p1 = p1X.toString() +'/'+ p1Y.toString();
    let p2 = p2X.toString() +'/'+ p2Y.toString();
    document.getElementById(p1).classList.add('portal')
    document.getElementById(p2).classList.add('portal')

    let obstacle = obsX.toString()+'/'+obsY.toString()
    document.getElementById(obstacle).classList.add('obstacle')

    if (bX!=0 && bY!=0){
        let buff = bX.toString() +'/'+ bY.toString();
        document.getElementById(buff).classList.add("buff");
    }
    if (heartX!=0 && heartY!=0){
        let heartbuff = heartX.toString() +'/'+ heartY.toString();
        document.getElementById(heartbuff).innerHTML = "❤️"
        document.getElementById(heartbuff).classList.add('heartbuff')
    } 
    if (lightX!=0 && lightY!=0){
        let lightbuff = lightX.toString() +'/'+ lightY.toString();
        document.getElementById(lightbuff).classList.add("lightbuff");
    }   
    for (let i = 0; i < food.length; i++) {
        a = food[food.length-1-i][0]
        b = food[food.length-1-i][1]
        let ele = food[food.length-1-i][0].toString() +'/'+ food[food.length-1-i][1].toString();
        document.getElementById(ele).innerHTML = (colors[colors.length-1-i]);
        document.getElementById(ele).classList.add('food')
    }
    for (let i = 0; i < sBody.length; i++) {
        let ele = sBody[i][0].toString() +'/'+ sBody[i][1].toString();
        document.getElementById(ele).innerHTML = ''
        document.getElementById(ele).className = headDirection    
    }   
    let head = sBody[0][0].toString() +'/'+ sBody[0][1].toString();
    document.getElementById(head).classList.add("head");
    for (let i = 1; i < sBody.length; i++) {
        let ele = sBody[i][0].toString() +'/'+ sBody[i][1].toString();
        document.getElementById(ele).classList.add('tail');
        
    }   
}

function savetheGame(){
    localStorage.setItem("sBody",JSON.stringify(sBody))
    localStorage.setItem("score",JSON.stringify(score))
    localStorage.setItem("lifes",JSON.stringify(lifes))
    localStorage.setItem("dead",JSON.stringify(dead))
    localStorage.setItem("pTime",JSON.stringify(pTime))
    localStorage.setItem('food',JSON.stringify(food))
    localStorage.setItem('speed',JSON.stringify(speed))
    localStorage.setItem("bsize",JSON.stringify(bsize))
    localStorage.setItem('pname',JSON.stringify(pname))
    localStorage.setItem('colors',JSON.stringify(colors))
    localStorage.setItem('headDirection',JSON.stringify(headDirection))
    localStorage.setItem('lettereated',JSON.stringify(lettereated))
    localStorage.setItem('p1X',JSON.stringify(p1X))
    localStorage.setItem('p1Y',JSON.stringify(p1Y))
    localStorage.setItem('p2X',JSON.stringify(p2X))
    localStorage.setItem('p2Y',JSON.stringify(p2Y))
    window.location.reload()
}

function playSaved() {
    document.getElementById("init_dialog").close()
    sBody = JSON.parse(localStorage.getItem("sBody"))
    if (sBody==null){
        document.getElementById("nosavedgame_dialog").showModal()
        return
    }
    score = JSON.parse(localStorage.getItem("score"))
    lifes = JSON.parse(localStorage.getItem("lifes"))
    dead = JSON.parse(localStorage.getItem("dead"))
    pTime = JSON.parse(localStorage.getItem("pTime"))
    food = JSON.parse(localStorage.getItem("food"))
    speed = JSON.parse(localStorage.getItem("speed"))
    bsize = JSON.parse(localStorage.getItem("bsize"))
    pname = JSON.parse(localStorage.getItem("pname"))
    colors = JSON.parse(localStorage.getItem("colors"))
    headDirection = JSON.parse(localStorage.getItem('headDirection'))
    lettereated = JSON.parse(localStorage.getItem("lettereated"))
    p1X = JSON.parse(localStorage.getItem("p1X"))
    p1Y = JSON.parse(localStorage.getItem("p1Y"))
    p2X = JSON.parse(localStorage.getItem("p2X"))
    p2Y = JSON.parse(localStorage.getItem("p2Y"))
    createSentence()
    setObstacle() 
    powerups()
    updateSnake()
    dispHearts()    
    dispHS()
    setTarget()
    setUp()
    displayTime() 
    document.getElementById('score').innerHTML = "Score: "+score.toString()
    let obj = document.getElementsByClassName('sample')
    arr = Array.from(obj)
    for (let m=0;m<lettereated;m++){
        arr[m].classList.remove('unEaten') 
        arr[m].classList.add('Eaten') 
    }

    max = localStorage.getItem("hiscore")
    if (max == undefined || max == null) {
        localStorage.setItem("hiscore", 0)
    }

    localStorage.clear()
    localStorage.setItem("hiscore", max)
    localStorage.setItem("leaderboard", leaderboard)

}

function powerups(){
    random = Math.floor(Math.random()*3)
    if (random==0){
        setHeart()
    }
    else if (random==1){
        setBuff()
    }
    else if (random==2){
        setLightning()
    }
}


const setUp = ()=>{
    document.addEventListener('keydown',changeDirection)
    document.addEventListener('keydown',otherlistener)
    document.addEventListener('mousedown',  changeDirection)
    animate = window.requestAnimationFrame(letsmove)
}

window.onload = function () {
    document.getElementById('play').onclick = function(){
        bsize = document.getElementById("bsize_input").value;
        pname = document.getElementById('name').value;
        if (bsize=='' || pname ==''){
            alert('!!!Enter Name and BoardSize!!!')
            window.location.reload()
        }
        document.getElementById("pname").innerHTML = 'Name : '+pname
        document.getElementById("bsize").innerHTML = 'Board Size : '+bsize
        document.getElementById("init_dialog").close()
        createSentence()
        colors = words[w]
        if (!mute){init.play()}
        setFood()
        startPosition() 
        setObstacle()
        setPortal()  
        powerups()
        updateSnake()
        dispHearts()    
        dispHS()
        setTarget()
        setUp()
        displayTime()
    }
    document.getElementById('loadsavedGame').onclick = function(){
        playSaved()
        if (!mute){init.play()}
    }
    document.getElementById("init_dialog").showModal() 
}