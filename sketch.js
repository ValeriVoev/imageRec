// Initialize the Image Classifier method with MobileNet
let classifier;
let p;
let slider;

// When the model is loaded
function modelLoaded() {
	console.log('Model Loaded!');
}

function gotFile(file) {

	let img = createImg(file.data, 'error loading image', function(){
		image(img, 0, 0, width, height);
		classifier.predict(img, function(err, results) {
			if (err) {
				console.log(err)
			}
			//console.log(results);
			let label = results[0].className;
			let prob = round(results[0].probability*100);
			p.html('This is ' + label +". I am about " + prob + "% certain.");
			// fill(0);
			// textSize(16);
			// text('Predicted: ' + label, width / 2, height / 2)
		});
	})
	img.hide();
}

function mousePressed(){
	let fileData = {
		data: c.canvas.toDataURL()
	}
	gotFile(fileData)
}

function mouseDragged(){
	noStroke();
	fill(colInput.value())
	ellipse(mouseX, mouseY, slider.value(), slider.value());
}

function setup() {
	c = createCanvas(600,500);
	background(200);
	textAlign(CENTER);
	text('drop an image and/or draw with your mouse', width / 2, height / 2);
	classifier = ml5.imageClassifier('MobileNet', modelLoaded);
	p = createP("Drag an image and I'll tell you what it is.");
	createP("Choose size of the brush using the slider");
	slider = createSlider(1, 20, 5);
	slider.style('width', '80px');
	createP("Choose color using the color picker");
	colInput = createInput('#ffffff', 'color')


}

function draw() {
	c.drop(gotFile)
	// console.log(colInput.value())

}
