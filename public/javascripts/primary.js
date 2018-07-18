function getconditions() {
    let coors = document.getElementById("locationInput").value;

    // remove whitespace
    let cleanCoors = coors.replace(" ", "");
    console.log(cleanCoors);

    /*
    $.ajax({
        url: "/getconditions", // use req.params here
        type: "GET",
        error
    });
    */
}

document.getElementById("submitButton").addEventListener("click", getconditions);
// execute on enter press
document.getElementById("locationInput").addEventListener("keypress", (event) => {
    console.log(event.keyCode);
    if (event.keyCode === 13) {
        getconditions();
    }
});
