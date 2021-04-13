// MAX HEAP IMPLEMENTATION

class BinaryHeap {
	// creates an empty array for heap when an instance of class is created
	constructor() {
		this.heap = [];
	}

	// insert the data in the heap
	insert(value) {
		this.heap.push(value);
		// calling heapify function to reconstruct array to heap property
		this.heapify();
	}

	// finding size of binary heap as its array
	size() {
		return this.heap.length;
	}

	// to find if the heap is empty or not, return true if it is
	empty() {
		if (this.size() === 0) {
			return true;
		} else {
			return false;
		}
	}

	// using iterative approach to convert array into binary heap
	heapify() {
		// last index is one less than the size
		let index = this.size() - 1;

		/*
        Property of ith element in binary heap - 
            left child is at = (2*i)th position
            right child is at = (2*i+1)th position
            parent is at = floor(i/2)th position
        */

		// converting entire array into heap from behind to front
		// just like heapify function to create it MAX HEAP
		while (index > 0) {
			// pull out element from the array and find parent element
			let element = this.heap[index],
				parentIndex = Math.floor((index - 1) / 2),
				parent = this.heap[parentIndex];

			// if parent is greater or equal, its already a heap hence break
			if (parent[0] >= element[0]) break;
			// else swap the values as we're creating a max heap
			this.heap[index] = parent;
			this.heap[parentIndex] = element;
			index = parentIndex;
		}
	}

	// getting max value from top as its max heap and calling sinkdown function
	// to reset the array as heap again
	extractMax() {
		const max = this.heap[0];
		const tmp = this.heap.pop();
		if (!this.empty()) {
			this.heap[0] = tmp;
			this.sinkDown(0);
		}
		return max;
	}

	sinkDown(index) {
		// finding left, right and parent element as largest as its max heap
		// and we're using the property of heaps here
		let left = 2 * index + 1,
			right = 2 * index + 2,
			largest = index;
		const length = this.size();

		// console.log(this.heap[left], left, length, this.heap[right], right, length, this.heap[largest]);

		if (left < length && this.heap[left][0] > this.heap[largest][0]) {
			largest = left;
		}
		if (right < length && this.heap[right][0] > this.heap[largest][0]) {
			largest = right;
		}
		// swap values
		if (largest !== index) {
			let tmp = this.heap[largest];
			this.heap[largest] = this.heap[index];
			this.heap[index] = tmp;
			this.sinkDown(largest);
		}
	}
}

export default { BinaryHeap };
