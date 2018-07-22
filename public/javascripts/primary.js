function getconditions() {
    let location = document.getElementById("locationInput").value;

    // request weather conditions data from server
    $.ajax({
        url: `/conditions/${location}`,
        type: "GET",
        error (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        },
        success (data, textStatus, jqXHR) {
            console.log(data); // for debugging; disable for deployment
            createScheme(data);
        }
    });    
}

// check if temp data is present; if it is, create and render the color scheme
function createScheme(data) {
    // short-circuit execution if location data is missing
    if (data[0] === 0) {
        missingCond();
        return;
    }

    let temp = data.currently.temperature; // Fahrenheit
    let humidity = data.currently.humidity; // between 0 and 1 inclusive
    let icon = data.currently.icon; // icon call to corresponding filenames in /images
    let summary = data.currently.summary; // human readable conditions, 1-4 words usually

    // if temp data is missing, we can't make the color scheme, so we can abort the rest
    if (temp === undefined || data[0] === 0) {
        missingCond();
        return;
    } else {
        createGradient(temp);
        placeConditions(temp, humidity, data); // include all "data" to more easily add features
        placeDesc(summary);
        placeIcon(icon);
    }
}

// insert and fade in conditions description
function placeConditions(temp, humidity, data) {
    $(".conditions").fadeOut(400, "swing", replaceConditions);
    function replaceConditions() {
        document.getElementById("conditionsReport").innerHTML = `<span>Currently: 
                                ${Math.round(temp)} F with ${Math.round(humidity * 100)} 
                                percent humidity.</span>
                                <span class=latlon><i>Lat.: ${data.latitude}, 
                                Long.: ${data.longitude}</i></span>`;
        $(".conditions").fadeIn();
    }
}

// insert and fade in weather icon (after fadeOut if already visible)
function placeIcon(icon) {
    $(".icon").fadeOut(400, "swing", replace);
    function replace() {
        document.getElementById("iconPlace").innerHTML = `<img src="/images/${icon}.svg" alt="${icon} icon">`;
        $(".icon").fadeIn(600, "swing");
    }
}

// insert and fade in short weather description (after fadeOut if already visible)
function placeDesc(desc) {
    $(".iconDesc").fadeOut(400, "swing", replace);
    function replace() {
        document.getElementById("description").innerHTML = `<span>${desc}</span>`;
        $(".iconDesc").fadeIn(600, "swing");
    }
}

// create gradient for background color scheme use
function createGradient(temp) {
    $(".gradient").fadeOut(400, "swing", newGrad);

    function newGrad() {
        // create map object for gradient points, cooler to warmer
        let colorMap = {
            0: [ "#3949ab", "#9FA8DA"],
            1: [ "#1565c0", "#42A5F5" ],
            2: [ "#00838f", "#26C6DA" ],
            3: [ "#00838f", "#26C6DA" ],
            4: [ "#558b2f", "#9CCC65" ],
            5: [ "#558b2f", "#9CCC65" ],
            6: [ "#afb42b", "#DCE775" ],
            7: [ "#afb42b", "#DCE775" ],
            8: [ "#bf360c", "#FF7043" ],
            9: [ "#b71c1c", "#EF5350" ]
        }

        // map temp to colorMap object
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
}

// if something went wrong with either API, or location data is missing, give error
function missingCond() {
    $(".gradient").fadeOut(400, "swing");
    $(".conditions").fadeOut(400, "swing", placeMissingError);

    function placeMissingError() {
        document.getElementById("conditionsReport").innerHTML = "Location is invalid or missing data. Please try again.";
        $(".conditions").fadeIn(600, "swing");
    }

    // Give user some error feedback
    placeDesc("Oops!");
    placeIcon("error");
    return;
}

document.getElementById("submitButton").addEventListener("click", getconditions);
// execute on enter press
document.getElementById("locationInput").addEventListener("keypress", (event) => {
    // console.log(event.keyCode); // for debugging
    if (event.keyCode === 13) {
        getconditions();
    }
});
