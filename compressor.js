import BinaryHeap from "./maxHeap.js";

class Huffman {
	// Function to display the huffman
	display(node, modify, index = 1) {
		// Preorder tree traversal
		if (modify == true) {
			node = ["", node];
			if (node[1].length === 1) {
				node[1] = node[1][0];
			}
		}

		if (typeof node[1] === "string") {
			return String(index) + " = " + node[1];
		}

		// left node is twice of the index
		let left = this.display(node[1][0], modify, index * 2);
		// right node is twice of index + 1, property of heap
		let right = this.display(node[1][1], modify, index * 2 + 1);
		let res =
			String(index * 2) + " <= " + index + " => " + String(index * 2 + 1);
		return res + "\n" + left + "\n" + right;
	}

	// Function to convert huffman tree into string, simple inorder tree traversal
	stringify(node) {
		// Encoding Huffman tree
		// if we reach the leaf, we return 'c where c is the character
		// we add ' to decipher which is the path info and which is the character
		// eg 1100111 here we add 110'011'1, we know 110 is path and 0 is char
		// and 11 is path information and 1 is character whose path is 11
		if (typeof node[1] === "string") return "/'" + node[1];
		// we go to left node and add 0 and go to right node and add 1 recursively
		else
			return (
				"0" + this.stringify(node[1][0]) + "1" + this.stringify(node[1][1])
			);
	}

	// Get character to binary string mapping, this will be called in encoder
	// DFS traversal
	getMappings(node, path) {
		// Getting difference between leaf and internal nodes
		// in JS character type is actually string and array is an object
		// if the second thing in array is string(character), its leaf node
		// if it is object(array), it is internal node
		// as node structure node[frequency, [left character, right character]]
		if (typeof node[1] === "string") {
			// storing the path string value to a hashmap
			this.mappings[node[1]] = path;
			return;
		}

		// Building a path here recursively

		// when going to the left, we add 0 to path string
		// node[1] because frequency has to be one at least which means its present
		// node[0] which is the left character or first character
		this.getMappings(node[1][0], path + "0");
		// when going to the right, we add 1 to the path string
		// node[1] because frequency has to be one at least which means its present
		// node[0] which is the rightmost character or second character
		this.getMappings(node[1][1], path + "1");
	}

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

		// Get character to binary string mapping
		this.mapping = {};
		this.getMappings(huffman_encoder, "");

		// Mapping path of all character to a single Binary String
		// from the mappings, we take path of all character and store in binary_string as string
		let binary_string = "";
		for (let i = 0; i < data.length; i++) {
			binary_string = binary_string + this.mappings[data[i]];
		}

		// Binary string variable stores the encoded data now as a string
		// we have a single large string but to store it, we have to store it
		// in a groups of size 8 and map that string to an ASCII character
		// if not 8 bits, we can append extra 0 bits at the end
		// eg- 1100101110 = [11001011] [10]
		// [11001011] gets stored as ! in ASCII charcter
		// [10] becomes [10000000] after padding and ASCII representation is ,
		// hence this big data gets stored as !,

		// padding binary string to make multiple of size 8
		// rem is the number of bits that we need to add
		let rem = (8 - (binary_string % 8)) % 8;
		// padding consists of rem number of 0s to be padded
		let padding = "";
		// adding rem number of 0s to padding
		for (let i = 0; i < rem; i++) padding = padding + "0";

		// padding the binary string with 0s
		binary_string = binary_string + padding;

		// Binary string to corresponding ASCII  character array
		let result = "";
		// fro each block of 8 bits
		for (let i = 0; i < binary_string.length; i += 8) {
			// num stores corresponding ASCII code for each 8 bit block
			let num = 0;
			for (let j = 0; j < 8; j++) {
				// finding the corresponding ASCII value of each 8 bit block from 0 to 255
				num = num * 2 + (binary_string[i + j] - "0");
			}
			// finding ASCII character equivalent for ASCII value of each word and storing it in result
			result = result + String.fromCharCode(num);

			// Concatenating required information to decoded tree which will be displayed
			// converting huffman tree to string and passing it as result
			let final_res =
				this.stringify(huffman_encoder) + "\n" + rem + "\n" + result;
			let info =
				"Compression ratio achieved : " + data.length / final_res.length;
			info =
				"Compression is complete and File is sent to be downloaded!" +
				"\n" +
				info;

			// return encoded data, huffman tree and info from the function
			return [final_res, this.display(huffman_encoder, false), info];
		}
	}
}
