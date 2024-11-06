document.getElementsByTagName("form")[0].addEventListener("submit", async event => {
    event.preventDefault();
    const request = await fetch("/api/set/", {method: "POST", mode: "cors", headers: {"content-type":"application/json"}, body: JSON.stringify({"message":document.getElementById("input").value})});
    let response = await request.text();
    try {
        response = JSON.parse(response);
    } catch(error) {
        response = {"error":true, "message":`Invalid API endpoint configuration. Error message: ${response}`};
    };
    if(response.error != false) {
        alert(`Error changing message: ${response.message}`);
    } else {
        alert("Message set sucessfully, go to the home page to see it.");
    };
});