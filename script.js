let timer={
    minutes: 0,
    seconds: 0,
    Id: 0
}

function Alarm() {
    let times = 3;
    let sound = new Audio('Timer_Sound_Effect.mp3');
    function music() {
        sound.pause();
        sound.currentTime = 0;
        sound.play();
    }
    
    for(let i = 1; i < times; i++) {
        setTimeout(music, 1000 * i);
    }
}


function update(key, value) {
    if(value < 0) {
        value = 0;
        console.log("Positive Numbers Only, Please.");
    }
    
    if(key == "seconds") {
        if(value < 10) {
            value = "0" + value;
        }

        if(value > 59) {
            value = 59;
        }
    }
    
    $("#" + key).html(value || 0);
    timer[key] = value;
}


(function detect(key) {
    let input = "#" + key + "-input";
    
    $(input).change(function() {
        update(key, $(input).val());
    });
    
    $(input).change(function() {
        update(key, $(input).val());
    });
    return arguments.callee;
})("minutes")("seconds");



function Start() {
    Manage(["start", false], ["pause", true], ["stop", true]);
    freeze();
    
    timer.Id = setInterval(function() {
        timer.seconds--;
        if(timer.seconds < 0) {
            if(timer.minutes == 0) {
                Alarm();
                return Stop();
            }
            timer.seconds = 59;
            timer.minutes--;
        }
        
        update("minutes", timer.minutes);
        update("seconds", timer.seconds);
    }, 1000);
    
}


function Stop() {
    clearInterval(timer.Id);
    Manage(["start", true], ["pause", false], ["stop", false]);
    unfreeze();
    update("minutes", $("#minutes-input").val());
    update("seconds",$("#seconds-input").val());
}


function Pause() {
    Manage(["start", true], ["pause", false], ["stop", true]);
    clearInterval(timer.Id);
}

function Manage(...buttonsArray) {
    for(let i = 0; i < buttonsArray.length; i++) {
        let button = "#" + buttonsArray[i][0] + "-button";
        if(buttonsArray[i][1]) {
            $(button).removeAttr('disabled');
        } else {
            $(button).attr('disabled', 'disabled');
        }
    }
}


function freeze() {
    $("#minutes-input").attr('disabled', 'disabled');
    $("#seconds-input").attr('disabled', 'disabled');
}



function unfreeze() {
    $("#minutes-input").removeAttr('disabled');
    $("#seconds-input").removeAttr('disabled');
}


