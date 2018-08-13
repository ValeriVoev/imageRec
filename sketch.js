// Initialize the Image Classifier method with MobileNet
let classifier;
let p;
let slider;
let button;

// When the model is loaded
function modelLoaded() {
	console.log('Model Loaded!');
}

function gotFile(file) {

	let img = createImg(file.data, 'error loading image', function(){
		image(img, 0, 0, width, height);

	})
	img.hide();
	return img;
}

function predictImage(){
	let fileData = {
		data: c.canvas.toDataURL()
	}
	let img = gotFile(fileData);
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
}

// function mousePressed(){
// 	let fileData = {
// 		data: c.canvas.toDataURL()
// 	}
// 	gotFile(fileData)
// }

function mouseDragged(){
	noStroke();
	fill(colInput.value())
	ellipse(mouseX, mouseY, slider.value(), slider.value());
}

function setup() {
	c = createCanvas(800,600);
	background(200);
	textAlign(CENTER);
	text('drop an image and/or draw with your mouse', width / 2, height / 2);
	classifier = ml5.imageClassifier('MobileNet', modelLoaded);
	p = createP("Drag or draw an image and I'll try to guess what it is. Click the button to make a prediction.");
	button = createButton('Make a prediction');
	button.position(p.position().x + width - button.width, p.position().y);
	button.mousePressed(predictImage);
	sliderP = createP("Choose size of the brush using the slider");
	slider = createSlider(1, 20, 5);
	slider.style('width', '80px');
	slider.position(sliderP.position().x + width - slider.width, sliderP.position().y);
	colorP = createP("Choose color using the color picker");
	colInput = createInput('#000000', 'color');
	colInput.position(colorP.position().x + width - colInput.width, colorP.position().y);
}

function draw() {
	c.drop(gotFile)
	// console.log(colInput.value())

}
