function $(id) {
	return document.getElementById(id);
}

let c = $("canvas").getContext("2d");
let width = c.canvas.width;
let height = c.canvas.height;
let darkMode;
let data = {};

if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
	darkMode = true;
} else {
	darkMode = false;
}

drawBackground();

function drawBackground() {
	c.strokeStyle = darkMode ? "white" : "black";
	c.fillStyle = darkMode ? "black" : "white";
	// draw white background
	c.beginPath();
	c.rect(1, 1, width - 2, height - 2);
	c.fill();
	c.stroke();
	// draw main circle
	c.beginPath();
	c.arc(width / 2, height / 2, width / 2, 0, 2 * Math.PI);
	c.stroke();
}

$("simulate").addEventListener("click", simulate);

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
	darkMode = e.matches ? true : false;
	simulate();
});

function simulate() {
	const darts = $("points").value;
	const origin = { x: 0.5, y: 0.5 };
	let points = [];
	let totalInCircle = 0;

	drawBackground();

	for (let i = 0; i < darts; i++) {
		let point = {
			x: Math.random(),
			y: Math.random(),
		};

		if (distance(point, origin) < 0.5) {
			point.inCircle = true;
			totalInCircle++;
			c.fillStyle = "hsl(217, 71%, 53%)";
		} else {
			point.inCircle = false;
			c.fillStyle = darkMode ? "white" : "black";
		}

		if (points.length < width * 20) {
			c.beginPath();
			c.arc(point.x * width, point.y * height, 1, 0, Math.PI * 2);
			c.fill();
		}

		points.push(point);
	}

	function distance(pointA, pointB) {
		return Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
	}

	let estimation = 4 * (totalInCircle / darts);
	let difference = Math.abs(Math.PI - estimation);

	let output = "";

	output += `<p>Estimated Value of PI: ${estimation}</p>`;
	output += `<p>Difference: ${difference}</p>`;

	$("info").innerHTML = output;

	data = {
		totalPoints: darts,
		totalPointsInCircle: totalInCircle,
		estimatedValueOfPI: estimation,
		estimatedValueDifference: difference,
		points: points,
	};
}

// Ended up being too big of a file usually, around
// 30 MB, which crashes Notepad when you try to open
// it and sometimes crashes the site itself. Cool
// idea, but didn't execute well. I could always use
// the PasteBin API to host the file, but its more
// work than it's worth. Maybe another time...

/* $("copy").addEventListener("click", function () {
	let e = document.createElement("a");
	e.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(data)));
	console.log(JSON.stringify(data))
	e.setAttribute("download", "simulationData.json");
	e.style.display = "none";
	document.body.appendChild(e);
	e.click();
	document.body.removeChild(e);
}); */
