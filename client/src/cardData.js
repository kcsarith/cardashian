export const playerTargetOptions = [
    { visibleText: 'None', value: "No one's" },
    { visibleText: 'Player', value: "When this player's" },
    { visibleText: 'Opponent', value: "When the opponent's" },
    { visibleText: 'Either', value: "When you or the opponent's" },
];
export const playerConditionOptions = [
    { visibleText: 'None', value: "no conditions" },
    { visibleText: 'Health', value: "health" },
    { visibleText: 'Currency', value: "currency" },
    { visibleText: 'Card on field', value: "is on the field" },
]

export const characterTargetOptions = [
    { visibleText: 'None', value: "No one's" },
    { visibleText: 'Player', value: "When this card's" },
    { visibleText: 'Opponent', value: "When the opponent character's" },
    { visibleText: 'Anyone', value: "If any character's" },
]
export const characterConditionOptions = [
    { visibleText: 'None', value: "no conditions" },
    { visibleText: 'Health', value: "health" },
    { visibleText: 'On Drop', value: "set" },
    { visibleText: 'On Attack', value: "attacking" },
    { visibleText: 'Turn Start', value: "about to start a turn." },
    { visibleText: 'Turn End', value: "at the end of a turn." },
    { visibleText: 'On Discard', value: "discarded" },
]

export const operatorOptions = [
    { visibleText: 'None', value: "" },
    { visibleText: '>', value: "is greater than" },
    { visibleText: '>=', value: "is at least" },
    { visibleText: '<', value: "is greater than" },
    { visibleText: '<=', value: "is at least" },
    { visibleText: '=', value: "is equal to" },
]

export const effectTargetOptions = [
    { visibleText: 'None', value: "no one" },
    { visibleText: 'Player', value: "The handler" },
    { visibleText: 'Opponent', value: "Your opponent" },
    { visibleText: 'Both Entities', value: "Both sides'" },
    { visibleText: 'Player Character', value: "One of your character's" },
    { visibleText: 'Opponent Character', value: "An opponent character's" },
    { visibleText: 'All Characters', value: "All characters'" },
];
export const effectOptions = [
    { visibleText: 'None', value: "" },
    { visibleText: 'Set Health', value: "sets their health to" },
    { visibleText: 'Decrease Health', value: "gets healed by" },
    { visibleText: 'Increase Health', value: "gets damaged by" },
    { visibleText: 'Increase Currency', value: "gets to increase currency by" },
    { visibleText: 'Decrease Currency', value: "get to decrease currency by" },
    { visibleText: 'Draw Card', value: "gets to draw" },
    { visibleText: 'Skip Turn', value: "has to skip" },
]
