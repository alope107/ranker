/*
	Object for asynchronously sorting a list with control flow handled by the comparator.
	Currently implements an insertion sort.
*/

//input: the array of unsorted data
var AsyncRanker = function(input) {
	this._currentSort = input;
	this._isSorted = false;
	this._i = 1;
	this._j = this._i;
};

//whether sorting is finished
AsyncRanker.prototype.isSorted = function() {
	return this._i >= this._currentSort.length;
};

//the array as it is currently sorted
AsyncRanker.prototype.currentSort = function() {
	return this._currentSort;
};	

//returns the two items the comparator must compare if there are still comparisons to be made
//if there are no more comparisons to be made (list is fully sorted), returns null
AsyncRanker.prototype.decisionPair = function() {
	if(this.isSorted()) {
		return null;
	}
	return [this._currentSort[this._j], this._currentSort[this._j - 1]];
};

//takes input from the comparator to continue sorting process
//decision: boolean True if second item in decision pair is to be ranked lower, False if it is to be ranked higher
AsyncRanker.prototype.decide = function(decision) {
	//if A[j-1] > A[j]
	if(decision) {
		var temp = this._currentSort[this._j];
		this._currentSort[this._j] = this._currentSort[this._j - 1];
		this._currentSort[this._j - 1] = temp;
		this._j -= 1;
	}
	//Terminate loop
	if(!decision || this._j <= 0) {
		this._i += 1;
		this._j = this._i;
	}
};

module.exports = {AsyncRanker : AsyncRanker};