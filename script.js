function $(id) {
	return document.getElementById(id);
}

let c = $("canvas").getContext("2d");
let width = c.canvas.width;
let height = c.canvas.height;
drawBackground();

function drawBackground() {
	c.strokeStyle = "black";
	c.fillStyle = "white";
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

$("simulate").addEventListener("click", function () {
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
			c.fillStyle = "black";
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

	let output = "";

	output += `<p>Estimated Value of PI: ${estimation}</p>`;
	output += `<p>Difference: ${Math.abs(Math.PI-estimation)}</p>`;

	$("info").innerHTML = output;
});
