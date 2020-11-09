export const playerTargetOptions = [
    { visible_text: 'None', value: "" },
    { visible_text: 'Player', value: "When your" },
    { visible_text: 'Opponent', value: "When the opponent's" },
    { visible_text: 'Either', value: "When you or the opponent's" },
];
export const playerConditionOptions = [
    { visible_text: 'None', value: "" },
    { visible_text: 'Health', value: "health" },
    { visible_text: 'Currency', value: "currency" },
    { visible_text: 'Card on field', value: "is on the field" },
]

export const characterTargetOptions = [
    { visible_text: 'None', value: "" },
    { visible_text: 'Player', value: "When this card's" },
    { visible_text: 'Opponent', value: "When the opponent character's" },
    { visible_text: 'Anyone', value: "If any character's" },
]
export const characterConditionOptions = [
    { visible_text: 'None', value: "" },
    { visible_text: 'Health', value: "health" },
    { visible_text: 'On Drop', value: "set" },
    { visible_text: 'On Attack', value: "attacking" },
    { visible_text: 'Turn Start', value: "about to start a turn." },
    { visible_text: 'Turn End', value: "at the end of a turn." },
    { visible_text: 'On Discard', value: "discarded" },
]

export const operatorOptions = [
    { visible_text: 'None', value: "" },
    { visible_text: '>', value: "is greater than" },
    { visible_text: '>=', value: "is at least" },
    { visible_text: '<', value: "is greater than" },
    { visible_text: '<=', value: "is at least" },
    { visible_text: '=', value: "is equal to" },
]

export const effectTargetOptions = [
    { visible_text: 'None', value: "" },
    { visible_text: 'Player', value: "The handler" },
    { visible_text: 'Opponent', value: "Your opponent" },
    { visible_text: 'Both Entities', value: "Both sides'" },
    { visible_text: 'Player Character', value: "One of your character's" },
    { visible_text: 'Opponent Character', value: "An opponent character's" },
    { visible_text: 'All Characters', value: "All characters'" },
];
export const effectOptions = [
    { visible_text: 'None', value: "" },
    { visible_text: 'Set Health', value: "sets their health to" },
    { visible_text: 'Decrease Health', value: "gets healed by" },
    { visible_text: 'Increase Health', value: "gets damaged by" },
    { visible_text: 'Increase Currency', value: "gets to increase currency by" },
    { visible_text: 'Decrease Currency', value: "get to decrease currency by" },
    { visible_text: 'Draw Card', value: "gets to draw" },
    { visible_text: 'Skip Turn', value: "has to skip" },
]
