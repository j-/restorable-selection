(function () {

var __DEV__ = false;

function restorableSelection (node) {
	var selection, previousRange, newRange;
	selection = window.getSelection();

	try {
		previousRange = selection.getRangeAt(0);
	} catch (err) {
		if (err.name === 'IndexSizeError') {
			if (__DEV__) {
				console.debug('Index size error encountered');
			}
			// Nothing was previously selected
			// Ignore this error
		} else {
			throw err;
		}
	}

	newRange = document.createRange();
	newRange.selectNodeContents(node);
	selection.removeAllRanges();
	selection.addRange(newRange);

	return function restoreSelection () {
		selection.removeAllRanges();
		if (previousRange) {
			selection.addRange(previousRange);
		} else if (__DEV__) {
			console.debug('No previous selection range to restore');
		}
	};
}

window.restorableSelection = restorableSelection;

})();
