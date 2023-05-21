let last1=0
var last2=0
var bsize = 20;
var score1 = 0;
var score2 = 0;
var sBody1 = [];
var sBody2 = [];
var vX1=0;
var vY1=0;
var vX2=0;
var vY2=0;
var lifes1 = 5
var dead1 = 0
var lifes2 = 5
var dead2 = 0
var pause = false
var pTime1 = 120
var food1 = []
var pTime2 = 120
var food2 = []
var bX1=0
var bY1=0
var speed1= 10
var bX2=0
var bY2=0
var speed2= 10
var headDirection1 = 'faceRight'
var headDirection2 = 'faceRight'
var mute = false
const foodS = new Audio('Music/eat.wav')
const buffS = new Audio('Music/buffs.wav')
const heartdie = new Audio('Music/heartdie.wav')
const wrongBuzzer = new Audio('Music/wrong_buzzer.mp3')
const hiscoreS = new Audio('Music/hiscore.wav')
const init = new Audio('Music/init.wav')
const paused = new Audio('Music/paused.wav')
const GameOverS = new Audio('Music/Gameover.wav')

var heartX1 = 0
var heartY1 = 0
var lightX1 = 0
var lightY1 = 0
var obsV1 = 1
var heartX2 = 0
var heartY2 = 0
var lightX2 = 0
var lightY2 = 0
var obsV2 = 1

var w1 = 0
var w2 = 0


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

function createSentence1(){
    // I made this function such that the word sequence you get in the game is from this sentence
    let sentence = 'agate garnet pearl opal beach paint shake head earth alive crate ought sand stone block ducks nymph kings'.split(' ')
    words1 = []
    for (let i=0;i<sentence.length;i++){
        arr1 = []
        for (let j=0;j<sentence[i].length;j++){
            arr1.push(sentence[i][j].toUpperCase())
        }
        words1.push(arr1)
    }
    words1 = shuffle(words1)
    colors1 = words1[w1]
}

function createSentence2(){
    // I made this function such that the word sequence you get in the game is from this sentence
    let sentence = 'agate garnet pearl opal beach paint shake head earth alive crate ought sand stone block ducks nymph kings'.split(' ')
    words2 = []
    for (let i=0;i<sentence.length;i++){
        arr2 = []
        for (let j=0;j<sentence[i].length;j++){
            arr2.push(sentence[i][j].toUpperCase())
        }
        words2.push(arr2)
    }
    words2 = shuffle(words2)
    colors2 = words2[w2]
}

function setPortal1(){
    let choice = Math.floor(Math.random()*2)
    if (choice==0){
        p1X1 = Math.floor(Math.random()*(bsize/2))+1
        p1Y1 = Math.floor(Math.random()*(bsize/2))+1
        p2X1 = Math.floor(Math.random()*(bsize/2)+bsize/2)
        p2Y1 = Math.floor(Math.random()*(bsize/2)+bsize/2)
        arr1 = [p1X1,p1Y1]
        arr2 = [p2X1,p2Y1]
        if (isInArray(arr1,sBody1) || isInArray(arr1,food1) || isInArray(arr2,sBody1) || isInArray(arr2,food1)){
            setPortal1()
        }
    }
    else{
        p1X1 = Math.floor(Math.random()*(bsize/2)+bsize/2)
        p1Y1 = Math.floor(Math.random()*(bsize/2))+1
        p2X1 = Math.floor(Math.random()*(bsize/2))+1
        p2Y1 = Math.floor(Math.random()*(bsize/2)+bsize/2)
        arr1 = [p1X1,p1Y1]
        arr2 = [p2X1,p2Y1]
        if (isInArray(arr1,sBody1) || isInArray(arr1,food1) || isInArray(arr2,sBody1) || isInArray(arr2,food1)){
            setPortal1()
        }
        
    }
}

function setPortal2(){
    let choice = Math.floor(Math.random()*2)
    if (choice==0){
        p1X2 = Math.floor(Math.random()*(bsize/2))+1
        p1Y2 = Math.floor(Math.random()*(bsize/2))+1
        p2X2 = Math.floor(Math.random()*(bsize/2)+bsize/2)
        p2Y2 = Math.floor(Math.random()*(bsize/2)+bsize/2)
        arr1 = [p1X2,p1Y2]
        arr2 = [p2X2,p2Y2]
        if (isInArray(arr1,sBody2) || isInArray(arr1,food2) || isInArray(arr2,sBody2) || isInArray(arr2,food2)){
            setPortal2()
        }
    }
    else{
        p1X2 = Math.floor(Math.random()*(bsize/2)+bsize/2)
        p1Y2 = Math.floor(Math.random()*(bsize/2))+1
        p2X2 = Math.floor(Math.random()*(bsize/2))+1
        p2Y2 = Math.floor(Math.random()*(bsize/2)+bsize/2)
        arr1 = [p1X2,p1Y2]
        arr2 = [p2X2,p2Y2]
        if (isInArray(arr1,sBody2) || isInArray(arr1,food2) || isInArray(arr2,sBody2) || isInArray(arr2,food2)){
            setPortal2()
        }  
    }
}

function setBuff1(){
    bX1 = Math.floor(Math.random()*(bsize))+1
    bY1 = Math.floor(Math.random()*(bsize))+1
    let arr = [bX1,bY1]
    if (isInArray(arr,sBody1) || isInArray(arr,food1) || arr == [heartX1,heartY1] || arr == [lightX1,lightY1] || arr==[p1X1,p1Y1] || arr==[p2X1,p2Y1]){
        setBuff1()
    }
}

function setBuff2(){
    bX2 = Math.floor(Math.random()*(bsize))+1
    bY2 = Math.floor(Math.random()*(bsize))+1
    let arr = [bX2,bY2]
    if (isInArray(arr,sBody2) || isInArray(arr,food2) || arr == [heartX2,heartY2] || arr == [lightX2,lightY2] || arr==[p1X2,p1Y2] || arr==[p2X2,p2Y2]){
        setBuff2()
    }
}

function setHeart1(){
    heartX1 = Math.floor(Math.random()*(bsize))+1
    heartY1 = Math.floor(Math.random()*(bsize))+1
    let arr = [heartX1,heartY1]
    if (isInArray(arr,sBody1) || isInArray(arr,food1) || arr == [bX1,bY1] || arr == [lightX1,lightY1] || arr==[p1X1,p1Y1] || arr==[p2X1,p2Y1]){
        setHeart1()
    }
}
function setHeart2(){
    heartX2 = Math.floor(Math.random()*(bsize))+1
    heartY2 = Math.floor(Math.random()*(bsize))+1
    let arr = [heartX2,heartY2]
    if (isInArray(arr,sBody2) || isInArray(arr,food2) || arr == [bX2,bY2] || arr == [lightX2,lightY2] || arr==[p1X2,p1Y2] || arr==[p2X2,p2Y2]){
        setHeart2()
    }
}

function setLightning1(){
    lightX1 = Math.floor(Math.random()*(bsize))+1
    lightY1 = Math.floor(Math.random()*(bsize))+1
    let arr = [lightX1,lightY1]
    if (isInArray(arr,sBody1) || isInArray(arr,food1) || arr == [bX1,bY1] || arr == [heartX1,heartY1] || arr==[p1X1,p1Y1] || arr==[p2X1,p2Y1]){
        setLightning1()
    }
}

function setLightning2(){
    lightX2 = Math.floor(Math.random()*(bsize))+1
    lightY2 = Math.floor(Math.random()*(bsize))+1
    let arr = [lightX2,lightY2]
    if (isInArray(arr,sBody2) || isInArray(arr,food2) || arr == [bX2,bY2] || arr == [heartX2,heartY2] || arr==[p1X2,p1Y2] || arr==[p2X2,p2Y2]){
        setLightning2()
    }
}

function setTarget1(){
    document.getElementById('target1').innerHTML = ''
    for (let i = 0; i < colors1.length ; i++){
        tile = document.createElement('div')
        tile.innerHTML = colors1[i]
        tile.classList.add('unEaten1')
        document.getElementById('target1').append(tile)
    }
    
}

function setTarget2(){
    document.getElementById('target2').innerHTML = ''
    for (let i = 0; i < colors2.length ; i++){
        tile = document.createElement('div')
        tile.innerHTML = colors2[i]
        tile.classList.add('unEaten2')
        document.getElementById('target2').append(tile)
    }
    
}

function setFood1(){
    for (let i=0;i<colors1.length;i++){
        let fX = Math.floor(Math.random()*(bsize-4))+2
        let fY = Math.floor(Math.random()*(bsize-4))+2
        arr = [fX,fY]
        if (isInArray(arr,sBody1) || isInArray(arr,food1)){
            i--;
        }
        else{
            food1.push([fX,fY])
        }
    }
}
function setFood2(){
    for (let i=0;i<colors2.length;i++){
        let fX = Math.floor(Math.random()*(bsize-4))+2
        let fY = Math.floor(Math.random()*(bsize-4))+2
        arr = [fX,fY]
        if (isInArray(arr,sBody2) || isInArray(arr,food2)){
            i--;
        }
        else{
            food2.push([fX,fY])
        }
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
        window.cancelAnimationFrame(animate1)
        window.cancelAnimationFrame(animate2)
        document.getElementById('pause').style.backgroundImage = 'url(Pics/play.png)'
        pause = true
        document.removeEventListener('keydown',changeDirection1)
        document.removeEventListener('keydown',changeDirection2)
    } 
    else if (pause){
        document.getElementById("pause_dialog").close()
        animate1 = window.requestAnimationFrame(letsmove1)
        animate2 = window.requestAnimationFrame(letsmove2)
        document.addEventListener('keydown', changeDirection1)
        document.addEventListener('keydown',changeDirection2)
        document.getElementById('pause').style.backgroundImage = 'url(Pics/pause.png)'
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


function startPosition1(){
    let r1 = Math.floor(Math.random()*(bsize-4))+3
    let r2 = Math.floor(Math.random()*(bsize-4))+3
    let l = sBody1.length
    for (let i=0;i<l;i++){
        sBody1.shift()
    }
    sBody1.push([r1,r2])
    sBody1.push([r1-1,r2])
    sBody1.push([r1-2,r2])
}
function startPosition2(){
    let r1 = Math.floor(Math.random()*(bsize-4))+3
    let r2 = Math.floor(Math.random()*(bsize-4))+3
    let l = sBody2.length
    for (let i=0;i<l;i++){
        sBody2.shift()
    }
    sBody2.push([r1,r2])
    sBody2.push([r1-1,r2])
    sBody2.push([r1-2,r2])
}

function setBoard1(){
    element = document.getElementById('gbox1')
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
                
                document.getElementById('gbox1').append(tile)
            }
        }
    }

function setBoard2(){
        element = document.getElementById('gbox2')
        const style = getComputedStyle(element)
        let len = style.height
        for(let i=1;i<=bsize;i++){
                for(let j=1;j<=bsize;j++){
                    let tile = document.createElement('div')
                    tile.id  = j.toString()+'|'+i.toString()
                    if ((i+j)%2==0){
                        tile.classList.add("even")
                    }
                    else{
                        tile.classList.add("odd") 
                    }
                    tile.style.height = (parseInt(len)/bsize).toString() + 'px'
                    tile.style.width = (parseInt(len)/bsize).toString() + 'px'
                    
                    document.getElementById('gbox2').append(tile)
                }
            }
        }
    
function dispHearts1(){
        let heart = "❤️"
        let disp1 = heart.repeat(lifes1)
        let blackHeart = "🖤"
        let disp2 = blackHeart.repeat(dead1)
        document.getElementById('hearts1').innerHTML = disp1 + disp2
    }

function dispHearts2(){
        let heart = "❤️"
        let disp1 = heart.repeat(lifes2)
        let blackHeart = "🖤"
        let disp2 = blackHeart.repeat(dead2)
        document.getElementById('hearts2').innerHTML = disp1 + disp2
    }    

function ruleBreak1(){
        lifes1--;
        dead1++;
        dispHearts1()
        if (lifes1==0){
            if (!mute){GameOverS.play()}
            document.getElementById('gameover_dialog').showModal()
            document.getElementById('result').innerHTML = pname2+' Won!'
            window.cancelAnimationFrame(animate1)
            window.cancelAnimationFrame(animate2)
            document.removeEventListener('keydown',changeDirection1)
            document.removeEventListener('keydown',changeDirection2)
        }
        if (!mute){heartdie.play()}
        document.innerHTML=""
}

function ruleBreak2(){
    lifes2--;
    dead2++;
    dispHearts2()
    if (lifes2==0){
        if (!mute){GameOverS.play()}
        document.getElementById('gameover_dialog').showModal()
        document.getElementById('result').innerHTML = pname1+' Won!'
        window.cancelAnimationFrame(animate1)
        window.cancelAnimationFrame(animate2)
        document.removeEventListener('keydown',changeDirection1)
        document.removeEventListener('keydown',changeDirection2)
    }
    if (!mute){heartdie.play()}
    document.innerHTML=""
}

function changeDirection1(e){
    if ((e.key == 'a') && vX1!=1 && !(vX1==0 && vY1==0)){
        vX1 = -1
        vY1 = 0
        headDirection1 = "faceLeft"
    }
    else if((e.key == 'd') && vX1!=-1){
        vX1 = 1
        vY1 = 0
        headDirection1 = "faceRight"
    }
    else if((e.key == 'w') && vY1!=1){
        vX1 = 0
        vY1 = -1
        headDirection1 = "faceTop"
    }
    else if((e.key == 's') && vY1!=-1){
        vX1 = 0
        vY1 = 1
        headDirection1 = "faceBottom"
    }
}

function changeDirection2(e){
    if ((e.key=="ArrowLeft") && vX2!=1 && !(vX2==0 && vY2==0)){
        vX2 = -1
        vY2 = 0
        headDirection2 = "faceLeft"
    }
    else if((e.key=="ArrowRight" ) && vX2!=-1){
        vX2 = 1
        vY2 = 0
        headDirection2 = "faceRight"
    }
    else if((e.key=="ArrowUp" ) && vY2!=1){
        vX2 = 0
        vY2 = -1
        headDirection2 = "faceTop"
    }
    else if((e.key=="ArrowDown") && vY2!=-1){
        vX2 = 0
        vY2 = 1
        headDirection2 = "faceBottom"
    }
}

function otherlistener(e){
    if(e.key=="Escape"){
        pausee()
    }
}

function setObstacle1(){
    dir1 = Math.floor(Math.random()*2)
    ordinate1 = Math.floor(Math.random()*(bsize-4))+2
    let checkCollide1 = false
    for (let i=0;i<sBody1.length;i++){
        if (ordinate1==sBody1[i][0]){
            checkCollide1 = true
        }
    }
    if (dir1 == 1 && ordinate1 == sBody1[0][1]){
        setObstacle1()
    }
    else if (dir1 == 0 && checkCollide1==true){
        setObstacle1()
    }

    if (dir1==0){
        obsX1 = ordinate1
        obsY1 = 1
    }
    else if (dir1==1){
        obsX1 = 1
        obsY1 = ordinate1
    }

}

function setObstacle2(){
    dir2 = Math.floor(Math.random()*2)
    ordinate2 = Math.floor(Math.random()*(bsize-4))+2
    let checkCollide2 = false
    for (let i=0;i<sBody2.length;i++){
        if (ordinate2==sBody2[i][0]){
            checkCollide2 = true
        }
    }
    if (dir2 == 1 && ordinate2 == sBody2[0][1]){
        setObstacle2()
    }
    else if (dir2 == 0 && checkCollide2==true){
        setObstacle2()
    }

    if (dir2==0){
        obsX2 = ordinate2
        obsY2 = 1
    }
    else if (dir2==1){
        obsX2= 1
        obsY2 = ordinate2
    }

}

function letsmove1(cur1){
    animate1 = window.requestAnimationFrame(letsmove1)
    if((cur1-last1)/1000<(1/speed1)){
        return
    }
    last1=cur1
    let hX1 = sBody1[0][0] + vX1
    let hY1 = sBody1[0][1] + vY1
    
    console.log(sBody1)
    if (dir1==0){
        obsY1 += obsV1
    }
    else if (dir1==1){
        obsX1 += obsV1
    }
    
    if (obsX1==bsize || obsX1 == 1 || obsY1==bsize || obsY1 == 1 ){
        obsV1 *= -1
    }
    
    if(hX1>bsize || hY1>bsize || hX1<1 || hY1<1){
        if (hX1>bsize){
            hX1-=bsize
        }
        else if (hX1<1){
            hX1+=bsize
        }
        else if (hY1>bsize){
            hY1-=bsize
        }
        else if (hY1<1){
            hY1+=bsize
        }
        hX1 = parseInt(hX1)
        hY1 = parseInt(hY1)
        for(let i=sBody1.length-1;i>=1;i--){
            sBody1[i] = {...sBody1[i-1]} 
        }
        sBody1[0][0] = hX1
        sBody1[0][1] = hY1

        ruleBreak1() 
        updateSnake()
        return
    }
    else if (hX1 == p1X1 && hY1 == p1Y1){
        hX1 = p2X1+vX1
        hY1 = p2Y1+vY1
        for(let i=sBody1.length1-1;i>=1;i--){
            sBody1[i] = {...sBody1[i-1]} 
        }
        sBody1[0][0] = hX1
        sBody1[0][1] = hY1
        updateSnake()
        return
    }
    else if (hX1 == p2X1 && hY1 == p2Y1){
        hX1 = p1X1+vX1
        hY1 = p1Y1+vY1
        for(let i=sBody1.length-1;i>=1;i--){
            sBody1[i] = {...sBody1[i-1]} 
        }
        sBody1[0][0] = hX1
        sBody1[0][1] = hY1
        updateSnake()
        return
    }
    else if (food1.length == 0){
        w1++
        colors1 = words1[w1]
        setFood1()
        setTarget1()
        sBody1.unshift([hX1,hY1])
        pTime1+=5
        speed1 += 2
    }
    else if (hX1==food1[0][0] && hY1==food1[0][1]){
        if (!mute){foodS.play()}
        score1+=1
        document.getElementById('score1').innerHTML = "Score: "+score1.toString()
        food1.shift()
        let obj = document.getElementsByClassName('unEaten1')
        arr = Array.from(obj)
        arr[0].classList.remove('unEaten1') 
        arr[0].classList.add('Eaten1') 
        for(let i=sBody1.length-1;i>=1;i--){
            sBody1[i] = {...sBody1[i-1]} 
        }
        sBody1[0][0] = hX1
        sBody1[0][1] = hY1  
    }
    else if (hX1==bX1 && hY1==bY1){
        if (!mute){buffS.play()}
        bX1=0
        bY1=0
        speed1 -= 4
        setTimeout(()=>{
            if (bX1==0 && bY1==0){
                        powerups1()
                    }
        },5000)
    }
    else if (hX1==heartX1 && hY1==heartY1){
        heartX1=0
        heartY1=0
        if (!(dead1==0)){
            if (!mute){buffS.play()}
            lifes1++
            dead1--
            dispHearts1()
        }
        setTimeout(()=>{
            if (heartX1==0 && heartY1==0){
                        powerups1()
                    }
        },5000)
    }
    else if (hX1==lightX1 && hY1==lightY1){
        if (!mute){buffS.play()}
        lightX1=0
        lightY1=0
        speed1 += 2
        setTimeout(()=>{
            if (heartX1==0 && heartY1==0){
                        powerups1()
                    }
        },5000)
    }
    else if (!(vX1==0 && vY1==0)){
        if(isInArray([hX1,hY1],sBody1)){
            ruleBreak1() 
            vX1=0
            vY1=0
            startPosition1()
            return
        }
        for(let i=sBody1.length-1;i>=1;i--){
            sBody1[i] = {...sBody1[i-1]} 
        }
        sBody1[0][0] = hX1
        sBody1[0][1] = hY1
    }

    if (isInArray([obsX1,obsY1],sBody1)){
        ruleBreak1() 
    }
        
    updateSnake()
}
function letsmove2(cur2){

    animate2 = window.requestAnimationFrame(letsmove2)
    if((cur2-last2)/1000<(1/speed2)){
        return
    }
    last2=cur2
    let hX2 = sBody2[0][0] + vX2
    let hY2 = sBody2[0][1] + vY2
    
    if (dir2==0){
        obsY2 += obsV2
    }
    else if (dir2==1){
        obsX2 += obsV2
    }
    
    if (obsX2==bsize || obsX2 == 1 || obsY2==bsize || obsY2 == 1 ){
        obsV2 *= -1
    }
    
    if(hX2>bsize || hY2>bsize || hX2<1 || hY2<1){
        if (hX2>bsize){
            hX2-=bsize
        }
        else if (hX2<1){
            hX2+=bsize
        }
        else if (hY2>bsize){
            hY2-=bsize
        }
        else if (hY2<1){
            hY2+=bsize
        }
        hX2 = parseInt(hX2)
        hY2 = parseInt(hY2)
        
        for(let i=sBody2.length-1;i>=1;i--){
            sBody2[i] = {...sBody2[i-1]} 
        }
        sBody2[0][0] = hX2
        sBody2[0][1] = hY2
        
        ruleBreak2() 
        updateSnake()
        return
    }
    else if (hX2 == p1X2 && hY2 == p1Y2){
        hX2 = p2X2+vX2
        hY2 = p2Y2+vY2
        for(let i=sBody2.length-1;i>=1;i--){
            sBody2[i] = {...sBody2[i-1]} 
        }
        sBody2[0][0] = hX2
        sBody2[0][1] = hY2
        updateSnake()
        return
    }
    else if (hX2 == p2X2 && hY2 == p2Y2){
        hX2 = p1X2+vX2
        hY2 = p1Y2+vY2
        for(let i=sBody2.length-1;i>=1;i--){
            sBody2[i] = {...sBody2[i-1]} 
        }
        sBody2[0][0] = hX2
        sBody2[0][1] = hY2
        updateSnake()
        return
    }
    else if (food2.length == 0){
        w2++
        colors2 = words2[w2]
        setFood2()
        setTarget2()
        sBody2.unshift([hX2,hY2])
        pTime2+=5
        speed2 += 2
    }
    else if (hX2==food2[0][0] && hY2==food2[0][1]){
        if (!mute){foodS.play()}
        score2+=1
        document.getElementById('score2').innerHTML = "Score: "+score2.toString()
        food2.shift()
        let obj = document.getElementsByClassName('unEaten2')
        arr = Array.from(obj)
        arr[0].classList.remove('unEaten2') 
        arr[0].classList.add('Eaten2') 
        for(let i=sBody2.length-1;i>=1;i--){
            sBody2[i] = {...sBody2[i-1]} 
        }
        sBody2[0][0] = hX2
        sBody2[0][1] = hY2  
    }
    else if (hX2==bX2 && hY2==bY2){
        if (!mute){buffS.play()}
        bX2=0
        bY2=0
        speed2-= 4
        setTimeout(()=>{
            if (bX2==0 && bY2==0){
                        powerups2()
                    }
        },5000)
    }
    else if (hX2==heartX2 && hY2==heartY2){
        heartX2=0
        heartY2=0
        if (!(dead2==0)){
            if (!mute){buffS.play()}
            lifes2++
            dead2--
            dispHearts2()
        }
        setTimeout(()=>{
            if (heartX2==0 && heartY2==0){
                        powerups2()
                    }
        },5000)
    }
    else if (hX2==lightX2 && hY2==lightY2){
        if (!mute){buffS.play()}
        lightX2=0
        lightY2=0
        speed2 += 2
        setTimeout(()=>{
            if (heartX2==0 && heartY2==0){
                        powerups2()
                    }
        },5000)
    }
    else if (!(vX2==0 && vY2==0)){
        if(isInArray([hX2,hY2],sBody2)){
            ruleBreak2() 
            vX2=0
            vY2=0
            startPosition2()
            return
        }
        for(let i=sBody2.length-1;i>=1;i--){
            sBody2[i] = {...sBody2[i-1]} 
        }
        sBody2[0][0] = hX2
        sBody2[0][1] = hY2
    }

    if (isInArray([obsX2,obsY2],sBody2)){
        ruleBreak2() 
    }
        
    updateSnake()
}

function updateSnake() {
    document.getElementById('gbox1').innerHTML = ''
    document.getElementById('gbox2').innerHTML = ''
    setBoard1()
    setBoard2()
    
    let p11 = p1X1.toString() +'/'+ p1Y1.toString();
    let p21 = p2X1.toString() +'/'+ p2Y1.toString();
    document.getElementById(p11).classList.add('portal')
    document.getElementById(p21).classList.add('portal')

    let p12 = p1X2.toString() +'|'+ p1Y2.toString();
    let p22 = p2X2.toString() +'|'+ p2Y2.toString();
    document.getElementById(p12).classList.add('portal')
    document.getElementById(p22).classList.add('portal')


    if (bX1!=0 && bY1!=0){
            let buff1 = bX1.toString() +'/'+ bY1.toString();
            document.getElementById(buff1).classList.add("buff");
    }
    if (bX2!=0 && bY2!=0){
        let buff2 = bX2.toString() +'|'+ bY2.toString();
        document.getElementById(buff2).classList.add("buff");
    }
    if (heartX1!=0 && heartY1!=0){
        let heartbuff1 = heartX1.toString() +'/'+ heartY1.toString();
        document.getElementById(heartbuff1).innerHTML = "❤️"
        document.getElementById(heartbuff1).classList.add('heartbuff')
    } 
    if (heartX2!=0 && heartY2!=0){
        let heartbuff2 = heartX2.toString() +'|'+ heartY2.toString();
        document.getElementById(heartbuff2).innerHTML = "❤️"
        document.getElementById(heartbuff2).classList.add('heartbuff')
    } 
    if (lightX1!=0 && lightY1!=0){
        let lightbuff1 = lightX1.toString() +'/'+ lightY1.toString();
        document.getElementById(lightbuff1).classList.add("lightbuff");
    }   
    if (lightX2!=0 && lightY2!=0){
        let lightbuff2 = lightX2.toString() +'|'+ lightY2.toString();
        document.getElementById(lightbuff2).classList.add("lightbuff");
    }   
    for (let i = 0; i < food1.length; i++) {
        a = food1[food1.length-1-i][0]
        b = food1[food1.length-1-i][1]
        let ele = food1[food1.length-1-i][0].toString() +'/'+ food1[food1.length-1-i][1].toString();
        document.getElementById(ele).innerHTML = (colors1[colors1.length-1-i]);
        document.getElementById(ele).classList.add('food')
    }
    for (let i = 0; i < food2.length; i++) {
        a = food2[food2.length-1-i][0]
        b = food2[food2.length-1-i][1]
        let ele = food2[food2.length-1-i][0].toString() +'|'+ food2[food2.length-1-i][1].toString();
        document.getElementById(ele).innerHTML = (colors2[colors2.length-1-i]);
        document.getElementById(ele).classList.add('food')
    }
    for (let i = 0; i < sBody1.length; i++) {
        let ele = sBody1[i][0].toString() +'/'+ sBody1[i][1].toString();
        document.getElementById(ele).innerHTML = ''
        document.getElementById(ele).className = headDirection1    
    } 
    
    for (let i = 0; i < sBody2.length; i++) {
        let ele = sBody2[i][0].toString() +'|'+ sBody2[i][1].toString();
        document.getElementById(ele).innerHTML = ''
        document.getElementById(ele).className = headDirection2    
    } 
    
    let head1 = sBody1[0][0].toString() +'/'+ sBody1[0][1].toString();
    document.getElementById(head1).classList.add("head");
    for (let i = 1; i < sBody1.length; i++) {
        let ele = sBody1[i][0].toString() +'/'+ sBody1[i][1].toString();
        document.getElementById(ele).classList.add('tail');
        
    }  
    let head2 = sBody2[0][0].toString() +'|'+ sBody2[0][1].toString();
    document.getElementById(head2).classList.add("head");
    for (let i = 1; i < sBody2.length; i++) {
        let ele = sBody2[i][0].toString() +'|'+ sBody2[i][1].toString();
        document.getElementById(ele).classList.add('tail');
    }  
    let obstacle1 = obsX1.toString()+'/'+obsY1.toString()
    document.getElementById(obstacle1).classList.add('obstacle')
    
    let obstacle2 = obsX2.toString()+'|'+obsY2.toString()
    document.getElementById(obstacle2).classList.add('obstacle')
}

function powerups2(){
    random = Math.floor(Math.random()*3)
    if (random==0){
        setHeart2()
    }
    else if (random==1){
        setBuff2()
    }
    else if (random==2){
        setLightning2()
    }
}

function powerups1(){
    random = Math.floor(Math.random()*3)
    if (random==0){
        setHeart1()
    }
    else if (random==1){
        setBuff1()
    }
    else if (random==2){
        setLightning1()
    }
}

const setUp = ()=>{
    document.addEventListener('keydown',changeDirection1)
    document.addEventListener('keydown',changeDirection2)
    document.addEventListener('keydown',otherlistener)
    animate1 = window.requestAnimationFrame(letsmove1)
    animate2 = window.requestAnimationFrame(letsmove2)
}

window.onload = function () {
    document.getElementById('play').onclick = function(){
        bsize = document.getElementById("bsize_input").value;
        pname1 = document.getElementById('name1').value;
        pname2 = document.getElementById('name2').value
        if (bsize=='' || pname1 =='' || pname2== ''){
                alert('!!!Enter Name and BoardSize!!!')
                window.location.reload()
        }
        document.getElementById('pname1').innerHTML = 'Name : '+pname1
        document.getElementById('pname2').innerHTML = 'Name : '+pname2
        document.getElementById("init_dialog").close()
        createSentence1()
        createSentence2()
        if (!mute){init.play()}
        setFood1()
        setFood2()
        startPosition1() 
        startPosition2() 
        setObstacle1()
        setObstacle2()
        setPortal1() 
        setPortal2() 
        powerups1()
        powerups2()
        updateSnake()
        dispHearts1()
        dispHearts2()
        setTarget1()
        setTarget2()
        setUp()
    } 
    document.getElementById("init_dialog").showModal() 



}
