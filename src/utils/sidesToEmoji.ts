import type { Sides, Side } from '../types';

export default function sidesToEmoji(sides: Sides) {
	const {up, down, front, back, left, right} = sides;

	return `
${printSideWithPadding(up)}
${[...left[0], ...front[0], ...right[0], ...back[0]].join('')}
${[...left[1], ...front[1], ...right[1], ...back[2]].join('')}
${[...left[2], ...front[2], ...right[2], ...back[2]].join('')}
${printSideWithPadding(down)}
  `;
}

function printSideWithPadding(side: Side) {
	const paddedRows = side.map(row => {
		const stringifiedRow = row.join('');

		return stringifiedRow.padStart(stringifiedRow.length + 6, ' ');
	});

	return paddedRows.join('\n');
}