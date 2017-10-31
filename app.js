const express = require("express");
const app = express();


app.get("/", function (req, res) {
    // console.log(req);
    console.log('header', req.headers);
    res.sendFile(process.cwd() + "/index.html");
});

console.log("header", app.get("user-agent"));

// Route for input
app.get("/:input", function (req, res) {
    console.log("params", req.params.input);
    res.send(parseInput(req.params.input));
});

function parseInput(input) {
    let returnObj = { "unix": null, "natural": null };

    // Attempt to process alpha string as a date
    if (input.match(/[a-zA-Z]/)) {
        const d = Date.parse(input);
        if (!Number.isNaN(d)) {
            returnObj.unix = d / 1000;
            returnObj.natural = formatTimestamp(input);
        }
    } else {
        // Process number as UNIX timestamp
        const num = +input;
        if (num > 0) {
            returnObj.unix = num;
            returnObj.natural = formatTimestamp(num * 1000);
        }
    }
 
    return returnObj;
}

function formatTimestamp(timeStamp) {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(timeStamp).toLocaleDateString('en-US', dateOptions);
}

app.listen(3000, timeService);

function timeService() {
    console.log("Listening on port 3000");
}
