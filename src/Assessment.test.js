/* eslint-env jest */

import Assessment from './Assessment';

it('Defaults to an empty array', () => {
    const a = new Assessment();
    expect(a.assessment.length).toBe(0);
});

it('Evaluates a label action', () => {
    const a = new Assessment([
        ['line1label', 'Demand', 'Correct!', 'Sorry, try again', 1],
        ['line1label', 'Alternative solution',
         'Correct!', 'Sorry, try again', 0.9],
        ['line1slope', 'increase', 'Correct!', 'Sorry, try again', 1],
        ['line1intercept', 'any',
         'Are you sure you\'re moving the right line?'],
        ['line2intercept', 'decrease', 'Correct!', 'Sorry, try again', 1]
    ]);
    let action = {name: 'line1label', value: 'Demand'};
    let response = {feedback: 'Correct!', score: 1, fulfilled: true};
    expect(a.evalAction(action)).toEqual(response);

    action = {name: 'line1label', value: 'demand'};
    response = {feedback: 'Correct!', score: 1, fulfilled: true};
    expect(a.evalAction(action)).toEqual(response);

    action = {name: 'line1label', value: ' demand  '};
    response = {feedback: 'Correct!', score: 1, fulfilled: true};
    expect(a.evalAction(action)).toEqual(response);

    action = {name: 'line1label', value: 'nope'};
    response = {feedback: 'Sorry, try again', score: 0, fulfilled: false};
    expect(a.evalAction(action)).toEqual(response);

    action = {name: 'not found', value: 'abc'};
    expect(a.evalAction(action)).toEqual(null);
});

it('Evaluates a line shift', () => {
    const a = new Assessment([
        ['line1label', 'Demand', 'Correct!', 'Sorry, try again', 1],
        ['line1label', 'Alternative solution',
         'Correct!', 'Sorry, try again', 0.9],
        ['line1intercept', 'up',
         'Line 1 moved up', 'Line 1 not moved up', 0.2],
        ['line2intercept', 'any',
         'Are you sure you\'re moving the right line?'],
    ]);
    let action = {name: 'line1intercept', value: 'up'};
    let response = {
        feedback: 'Line 1 moved up',
        score: 0.2,
        fulfilled: true
    };
    expect(a.evalAction(action)).toEqual(response);

    action = {name: 'line1intercept', value: 'down'};
    response = {
        feedback: 'Line 1 not moved up',
        score: 0,
        fulfilled: false
    };
    expect(a.evalAction(action)).toEqual(response);
});

it('Evaluates a line rotation (slope change)', () => {
    const a = new Assessment([
        ['line1label', 'Demand', 'Correct!', 'Sorry, try again', 1],
        ['line1label', 'Alternative solution', 'Correct!', 'Sorry, try again', 0.9],
        ['line1slope', 'increase',
         'Line 1 slope increased', 'Line 1 slope not increased', 0.2],
        ['line2slope', 'any', 'Are you sure you\'re moving the right line?']
    ]);
    let action = {name: 'line1slope', value: 'increase'};
    let response = {
        feedback: 'Line 1 slope increased',
        score: 0.2,
        fulfilled: true
    };
    expect(a.evalAction(action)).toEqual(response);

    action = {name: 'line1slope', value: 'decrease'};
    response = {
        feedback: 'Line 1 slope not increased',
        score: 0,
        fulfilled: false
    };
    expect(a.evalAction(action)).toEqual(response);
});

it('Evaluates state correctly', () => {
    const a = new Assessment([
        ['line1label', 'Demand', 'Correct!', 'Sorry, try again', 1],
        ['line1label', 'Alternative solution',
         'Correct!', 'Sorry, try again', 0.9],
        ['line1slope', 'increase',
         'Line 1 slope increased', 'Line 1 slope not increased', 0.2],
        ['line2slope', 'any', 'Are you sure you\'re moving the right line?'],
        ['line1intercept', 'any', 'Are you sure you need to shift this line?']
    ]);
    const state = {
        gTitle: 'mock graph state',
        gInstructions: 'Some random graph',
        gLine1OffsetYInitial: 0,
        gLine1OffsetY: 1.52,
        gLine1Label: 'abc'
    };

    const r = a.evalState(state);
    expect(r.length).toEqual(2);
    expect(r).toContainEqual({
        feedback: 'Sorry, try again',
        score: 0,
        fulfilled: false
    });
    expect(r).toContainEqual({
        feedback: 'Are you sure you need to shift this line?',
        score: undefined,
        fulfilled: true
    });
});
