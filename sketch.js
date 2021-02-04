SIZE = 20

function setup() {
	createCanvas(500, 500);
	background(0);

	nn = new NeuralNetwork(2, 3, 1)
	drawNeuralNetwork(nn)
	// XOR Problem
	dataset = {
		inputs:
			[[1, 1],
			[1, 0],
			[0, 1],
			[0, 0]],
		outputs:
			[[0],
			[1],
			[1],
			[0]]
	}
	train = true
}

function draw() {
	if (train) {
		for (var i = 0; i < 10000; i++) {
			var index = floor(random(4));
			nn.train(dataset.inputs[index], dataset.outputs[index])
		}
		if (nn.predict([0, 0])[0] < 0.04 && nn.predict([1, 0])[0] > 0.98 && nn.predict([1, 1])[0] < 0.04 && nn.predict([0, 1])[0] > 0.98) {
			train = false;
			console.log("terminou")
		}
	}
}
class Node{
	constructor(posX, posY){
		this.posX = posX
		this.posY = posY
		this.size = SIZE
	}

	draw(R=255, G=null, B=null){
		if (B==null){
			G = R
			B = R
		}
		ellipseMode(RADIUS);
		fill(R, G, B);
		circle(this.posX, this.posY, this.size)
	}
}
class weigth{
	constructor(node_init, node_end){
		this.posX1 = node_init.posX
		this.posY1 = node_init.posY
		this.posX2 = node_end.posX
		this.posY2 = node_end.posY
	}

	draw(R=255, G=null, B=null){
		if (B==null){
			G = R
			B = R
		}
		stroke(R, G, B);
		line(this.posX1, this.posY1, this.posX2, this.posY2)
	}
}
function drawNeuralNetwork(NN){
	offset_H_input = 50
	offset_V_input = 80
	offset_H_hidden = 200
	offset_V_hidden = 50
	offset_H_output = 350
	offset_V_output = 120
	position = 70

	i_nodes = []
	weights_ih = []
	h_nodes = []
	weights_ho = []
	o_nodes = []
	for (let i =0; i<NN.i_nodes; i++){
		i_nodes.push(new Node(offset_H_input, offset_V_input+i*position))
		i_nodes[i].draw(255)
	}
	for (let i =0; i<NN.h_nodes; i++){
		h_nodes.push(new Node(offset_H_hidden, offset_V_hidden+i*position))
		h_nodes[i].draw(255)
	}
	for (let i =0; i<NN.o_nodes; i++){
		o_nodes.push(new Node(offset_H_output, offset_V_output+i*position))
		o_nodes[i].draw(255)
	}
	for (let i =0; i<NN.i_nodes; i++){
		arr = []
		for (let j =0; j<NN.h_nodes; j++){
			arr.push(new weigth(i_nodes[i], h_nodes[j]))
			arr[j].draw(255)
		}
		weights_ih.push(arr)
	}
	for (let i =0; i<NN.h_nodes; i++){
		arr = []
		for (let j =0; j<NN.o_nodes; j++){
			arr.push(new weigth(h_nodes[i], o_nodes[j]))
			arr[j].draw(255)
		}
		weights_ho.push(arr)
	}
}