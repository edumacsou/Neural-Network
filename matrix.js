class Matrix {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;

		this.data = [];

		for (let i = 0; i < rows; i++) {
			let arr = [];
			for (let j = 0; j < cols; j++) {
				arr.push(0)
			}
			this.data.push(arr)
		}
	}


	//Diverse operations

	static arrayToMatrix(arr){
		let matrix = new Matrix(arr.length, 1)
		matrix.map((num, i, j)=>{
			return arr[i]
		})
		return matrix
	}

	static matrixToArray(obj){
		let arr = []
		obj.map((elm, i, j)=>{
			arr.push(elm)
		})
		return arr
	}

	randomize() {
		this.map((num, i, j)=>{
			return Math.floor(Math.random()*10)
		})
	}

	print() {
		console.table(this.data)
	}

	map(func) {
		this.data = this.data.map((arr, i) => {
			return arr.map((num, j) => {
				return func(num, i, j)
			})
		})
	}

	static map(A, func) {
		let matrix = new Matrix(A.rows, A.cols)
		matrix.data = matrix.data.map((arr, i) => {
			return arr.map((num, j) => {
				return func(A.data[i][j], i, j)
			})
		})
		return matrix
	}

	static transpose(A){
		let matrix = new Matrix(A.cols, A.rows)
		matrix.map((num, i, j)=>{
			return A.data[j][i]
		})
		return matrix
	}


	// Static operations between Matrix and Scalar
	static scalar_multiply(A, scalar) {
		let matrix = new Matrix(A.rows, A.cols);
		matrix.map((num, i, j) =>{
			return A.data[i][j] * scalar
		})
		return matrix
	}

	// Static operations between Matrix and Matrix

	static hadamard(A, B) {
		let matrix = new Matrix(A.rows, B.cols);
		matrix.map((num, i, j) =>{
			return A.data[i][j] * B.data[i][j]
		})
		return matrix
	}

	static add(A, B) {
		let matrix = new Matrix(A.rows, A.cols);
		matrix.map((num, i, j) => {
			return (A.data[i][j] + B.data[i][j])
		})
		return matrix
	}

	static subtract(A, B) {
		let matrix = new Matrix(A.rows, A.cols);
		matrix.map((num, i, j) => {
			return (A.data[i][j] - B.data[i][j])
		})
		return matrix
	}

	static multiply(A, B) {
		let matrix = new Matrix(A.rows, B.cols);
		matrix.map((num, i, j) =>{
			let sum = 0
			for (let k=0; k<A.cols; k++){
				const n1 = A.data[i][k]
				const n2 = B.data[k][j]
				sum += n1*n2 
			}
			return sum
		})
		return matrix
	}
}