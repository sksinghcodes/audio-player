var a = document.querySelector(".a");
var b = document.querySelector(".b");
var playPauseBtn = document.querySelector(".play-pause");
var stopBtn = document.querySelector(".stop");
var loopToggleBtn = document.querySelector(".loop-toggle");
var audio = document.querySelector("audio");
var currentTime = document.querySelector(".current-time");
var totalTime = document.querySelector(".total-time");
var mouseIsDown = false;
var isPlaying = false;


playPauseBtn.onclick = () => {
    if(isPlaying){
        audio.pause();
        playPauseBtn.classList.replace('fa-pause', 'fa-play');
        isPlaying = false;
    } else {
        audio.play();
        playPauseBtn.classList.replace('fa-play', 'fa-pause');
        isPlaying = true;
    }
}

stopBtn.onclick = () => {
    audio.load();
    playPauseBtn.classList.replace('fa-pause', 'fa-play');
    b.style.width = `${0}%`;
    isPlaying = false;
}

loopToggleBtn.onclick = () => {
    if(audio.loop){
        audio.loop = false;
        loopToggleBtn.classList.add("false");
    } else {
        audio.loop = true;
        loopToggleBtn.classList.remove("false");
    }
}

audio.onplaying = () => {
    isPlaying = true;
}

audio.onplay = () => {
    totalTime.textContent = (mkTime(audio.duration)[1]+':'+mkTime(audio.duration)[2]);
}

audio.ontimeupdate = () => {
    currentTime.textContent = (mkTime(audio.currentTime)[1]+':'+mkTime(audio.currentTime)[2]);
    b.style.width = `${Math.floor(((audio.currentTime*100)/audio.duration)*100)/100}%`;

    if(audio.currentTime === audio.duration){
        stopBtn.click();
    }
}

a.onmousedown = () => {
    mouseIsDown = true;
    document.onmousemove = event => {
        if(mouseIsDown 
            && event.x >= a.offsetLeft
            && event.x <= a.offsetLeft + a.offsetWidth
            ){
            b.style.width = `${((event.x - a.offsetLeft)*100)/a.offsetWidth}%`;
            audio.currentTime = ((((event.x - a.offsetLeft)*100)/a.offsetWidth)*audio.duration)/100;
        } else if(mouseIsDown && event.x > a.offsetLeft + a.offsetWidth) {
            b.style.width = `${100}%`;
            audio.currentTime = audio.duration;
        } else if(mouseIsDown && event.x < a.offsetLeft) {
            b.style.width = `${0}%`;
            audio.currentTime = 0;
        }
    }
}

a.onclick = event => {
    b.style.width = `${((event.x - a.offsetLeft)*100)/a.offsetWidth}%`;
    audio.currentTime = ((((event.x - a.offsetLeft)*100)/a.offsetWidth)*audio.duration)/100;
}

document.onmouseup = () => {
    mouseIsDown = false;
}

function mkTime(seconds){
    var hh = 0;
    var mm = 0;
    var ss = 0;

    if(seconds > 3600){
        hh = Math.floor(seconds/3600);
        seconds = (seconds - (3600*hh))
    }

    if(seconds > 60){
        mm = Math.floor(seconds/60);
        seconds = (seconds - (60*mm))
    }

    if(seconds > 0){
        ss = Math.floor(seconds);
    }

    hh = str(hh);
    mm = str(mm);
    ss = str(ss);

    function str(n){
        n = String(n);

        if(n.length < 2){
            n = '0'+n;
        }

        return n;
    }


    return [hh,mm,ss]
}
