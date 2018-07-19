function getconditions() {
    let coors = document.getElementById("locationInput").value;

    // remove whitespace
    let cleanCoors = coors.replace(" ", "");

    $.ajax({
        url: `/conditions/${cleanCoors}`,
        type: "GET",
        error (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        },
        success (data, textStatus, jqXHR) {
            console.log(data);
            createScheme(data);
        }
    });    
}

function createScheme(data) {
    let temp = data.temperature; // Fahrenheit
    let precip = data.precipProbability; // between 0 and 1 inclusive
    let icon = data.icon;

    $(".conditions").fadeOut(400, "swing", replaceConditions);
    function replaceConditions() {
        document.getElementById("conditionsReport").innerHTML = `It is currently ${Math.round(temp)} F with a ${Math.round(precip * 100)} percent chance of precipitation.`;
        $(".conditions").fadeIn();
    }

    $(".gradient").fadeOut(400, "swing", newGrad);

    let colorMap = {
        0: [ "#3949ab", "#5c6bc0"],
        1: [ "#1565c0", "#1e88e5" ],
        2: [ "#00838f", "#00acc1" ],
        3: [ "#00838f", "#00acc1" ],
        4: [ "#558b2f", "#7cb342" ],
        5: [ "#558b2f", "#7cb342" ],
        6: [ "#afb42b", "#cddc39" ],
        7: [ "#afb42b", "#cddc39" ],
        8: [ "#bf360c", "#e64a19" ],
        9: [ "#b71c1c", "#d32f2f" ]
    }

    function newGrad() {
        // map temp to color
        let mapTemp = Math.round(temp / 10);

        if (mapTemp > 9) {
            $(".gradient").css({"background": `linear-gradient(to bottom right, ${colorMap[9][0]}, ${colorMap[9][1]})`});
            $(".gradient").fadeIn(600, "swing");
        }
        else if (mapTemp < 0) {
            $(".gradient").css({"background": `linear-gradient(to bottom right, ${colorMap[0][0]}, ${colorMap[0][1]})`});
            $(".gradient").fadeIn(600, "swing");
        }
        else {
            // console.log("colorMap temp: " + mapTemp);
            $(".gradient").css({"background": `linear-gradient(to bottom right, ${colorMap[mapTemp][0]}, ${colorMap[mapTemp][1]})`});
            $(".gradient").fadeIn(600, "swing");
        }
    }

    placeIcon(icon);
}

function placeIcon(icon) {
    $(".icon").fadeOut(400, "swing", replace);
    function replace() {
        document.getElementById("iconPlace").innerHTML = `<img src="/images/${icon}.svg" alt="weathericon">`;
        $(".icon").fadeIn();
    }
}

document.getElementById("submitButton").addEventListener("click", getconditions);
// execute on enter press
document.getElementById("locationInput").addEventListener("keypress", (event) => {
    // console.log(event.keyCode);
    if (event.keyCode === 13) {
        getconditions();
    }
});
