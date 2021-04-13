import BinaryHeap from "./heap.js";

class Huffman {
	// function to encode input data into compressed data
	// takes in the inut data as parameter
	encode(data) {
		// getting heap from BinaryHeap class
		this.heap = new BinaryHeap();

		// storing the count of freq of each character of data in map
		const mp = new Map();
		for (let i = 0; i < data.length(); i++) {
			// if character is present in map
			if (data[i] in mp)
				// increase the frequency fro each character
				mp[data[i]] = mp[data[i]] + 1;
			// set the frequency as 1 for the character
			else mp[data[i]] = 1;
		}

		// Insert elements in the heap
		// push with -ve value as we need min heap
		for (const key in mp) {
			this.heap.insert([-mp[key], key]);
		}
	}
}
