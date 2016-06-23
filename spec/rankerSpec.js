var ranker = require("../ranker");

describe("ranker.js", function() {
	describe("AsyncRanker", function () {
		var input;
		var sorted;
		var asyncRanker;
		
		beforeEach(function() {
			input = [4, 2, 5, 1, 9, 9, 9, 2, 3, 0, 1, 2, 3, 4, 5, 1];
			sorted = input.slice();
			sorted.sort();
			asyncRanker = new ranker.AsyncRanker(input);
		});
		
		it("is initially unsorted", function() {
			expect(asyncRanker.isSorted()).toBe(false);
		});
		it("stores the input properly", function() {
			expect(asyncRanker.currentSort()).toEqual(input);
		});
		it("can give a decision pair", function() {
			var pair = asyncRanker.decisionPair();
			expect(pair.length).toEqual(2);
		});
		it("can take a decision", function() {
			asyncRanker.decide(true);
		});
		it("can create a ranking based on binary decisions", function() {
			var NumberDecider = function(ranker) {
				this._ranker = ranker;
				this._limit = 1000;
			};
			NumberDecider.prototype.getSorted = function() {
				var i;
				for (i = 0; i < this._limit && !this._ranker.isSorted(); i += 1) {
					var decisionPair = this._ranker.decisionPair();
					expect(decisionPair[0]).not.toBe(null);
					expect(decisionPair[1]).not.toBe(null);
					var decision = decisionPair[0] < decisionPair[1];
					this._ranker.decide(decision);
				}
				if(i >= this._limit) {
					return null;
				}
				else {
					return this._ranker.currentSort();
				}
			};
			
			var decider = new NumberDecider(asyncRanker);
			ranked = decider.getSorted();
			
			expect(ranked).not.toBe(null);
			expect(ranked).toEqual(sorted);
			});
			
		});
	});