const DELETE_FLAG = '__delete__';

export default function simplifyHistory(rawHistory: string[]) {
	const history = [...rawHistory];

	for (let index = 0; index < history.length; index++) {
		const currentMove = history[index];
		const nextMove = history[index + 1];

		if (currentMove === DELETE_FLAG) {
			continue;
		}

		const isMoveAlreadySimplified = currentMove.includes('2');
    
		if (!isMoveAlreadySimplified && currentMove === nextMove) {
			history[index] = currentMove.includes('\'') ? `${currentMove[0]}2'` : `${currentMove}2`;
			history[index + 1] = DELETE_FLAG;
		}
	}

	return history.filter(entry => entry !== DELETE_FLAG);
}