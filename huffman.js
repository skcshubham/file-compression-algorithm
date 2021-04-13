import BinaryHeap from "./maxHeap.js";

class Huffman {
	// function to encode input data into compressed data
	// takes in the inut data as parameter
	encode(data) {
		// getting heap from BinaryHeap class
		this.heap = new BinaryHeap();

		// storing the count of freq of each character of data in hashmap
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
			// we are not simply pushing a value but an array into heap [frequency, characterKey]
			this.heap.insert([-mp[key], key]);
		}

		// Creating HUFFMAN TREE
		// continuing until the heap has more than 1 element
		while (this.heap.size() > 1) {
			// taking out two character from heap with least frequency
			const node1 = this.heap.extractMax();
			const node2 = this.heap.extractMax();

			// creating new node with frequency = sum of both nodes pulled out
			// and the characters are pushed to node too as [leftChild, rightChild]
			const node = [node1[0] + node2[0], [node1, node2]];
			// pushing the sum node back into the heap
			this.heap.insert(node);
		}

		// Extracting the final node from heap and
		// it will be the Huffman tree itself
		const huffman_encoder = this.heap.extractMax();
	}
}
