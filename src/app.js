const express = require('express');
const port = process.env.PORT;
const userRouter = require('./routers/user');
const bodyparser = require("body-parser")
const path = require("path");
require('./db/db');

const app = express();

app.use(express.json());


app.use(bodyparser.urlencoded({ extended: false }));
app.use(userRouter);
// Testing routing here...
app.use(express.static("public"));

app.get("/", function(req, res) {
	res.redirect("index.html")
});

app.get("/login", function (req, res) {
	res.redirect("login.html")
});

// app.post("/user/register", function (req, res) {
// 	res.redirect("intakeform.html")
// });

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
