angular.module('rankerApp', [])
	.controller('RankerController', function() {
		var rankerController = this;
		var ranker = new AsyncRanker(["Apples", "Bananas", "Strawberries", "Pears", "Mangoes", "Durians"]);
		rankerController.currentSort = ranker.currentSort();
		rankerController.isSorted = ranker.isSorted();
		rankerController.decisionPair = ranker.decisionPair();
		rankerController.ranker = ranker;
	
		rankerController.refresh = function() {
			rankerController.currentSort = rankerController.ranker.currentSort();
			rankerController.isSorted = rankerController.ranker.isSorted();
			rankerController.decisionPair = rankerController.ranker.decisionPair();
		};
	 
		rankerController.decide = function(decision) {
			rankerController.ranker.decide(decision);
			rankerController.refresh();
		};
	
});