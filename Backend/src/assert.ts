// A node module for an assert function that throws errors
// Usage:
//     Throws an error with message if boolean IS NOT true
//     To import:
//         import { assert } from "./assert"; (give relative import path)
//     The object to be caught by a try-catch:
//     object {
//         message: string,
//         stack: string
//     }

export function assert(boolean, message="") {
	try {
		if(!boolean) {
			throw new Error(message);
		}
		else {
			return;
		}
	}
	catch(e) {
		throw new Error(message);
	}
}
