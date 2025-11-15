const test = require('node:test');
const assert = require('node:assert');

const { buildReportMessage, DEFAULT_PARAGRAPH } = require('../js/onclick.js');

test('builds morning style message with share appended directly', () => {
    const message = buildReportMessage({
        greetingFn: () => 'おはようございます',
        workTypeFn: () => '出社',
        businessText: '共通業務',
        mtgFn: () => 'MTG',
        todoFn: () => 'TODO',
        shareFn: () => '共有'
    });

    const expected = [
        'おはようございます',
        '出社',
        '共通業務',
        'MTG\nTODO'
    ].join(DEFAULT_PARAGRAPH) + '共有';

    assert.strictEqual(message, expected);
});

test('builds evening style message with remaining tasks block', () => {
    const message = buildReportMessage({
        greetingFn: () => 'こんばんは',
        workTypeFn: () => '在宅',
        businessText: '共通業務',
        mtgFn: () => 'MTG',
        todoFn: () => 'TODO',
        shareFn: () => '共有',
        remailingFn: () => '残タスク',
        trailingBuilder: ({ paragraph, remailingText, shareText }) => {
            const remailing = remailingText();
            const share = shareText();
            if (remailing && share) {
                return remailing + paragraph + share;
            }
            return remailing || share;
        }
    });

    const expected = [
        'こんばんは',
        '在宅',
        '共通業務',
        'MTG\nTODO'
    ].join(DEFAULT_PARAGRAPH) + '残タスク' + DEFAULT_PARAGRAPH + '共有';

    assert.strictEqual(message, expected);
});

test('falls back to template business text when not provided', () => {
    globalThis.temp = { common: { business: 'テンプレート業務' } };

    const message = buildReportMessage({
        greetingFn: () => 'hi',
        workTypeFn: () => 'wt',
        mtgFn: () => 'mtg',
        todoFn: () => 'todo',
        shareFn: () => 'share'
    });

    const expected = [
        'hi',
        'wt',
        'テンプレート業務',
        'mtg\ntodo'
    ].join(DEFAULT_PARAGRAPH) + 'share';

    assert.strictEqual(message, expected);
    delete globalThis.temp;
});
