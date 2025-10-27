const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const TEMPLATE_COMMON = {
  workType: '■出社/在宅',
  business: '■業務─────────────────',
  remaining: '【残タスク】',
  share: '■共有事項'
};

const TEMPLATE_MORNING = {
  greeting1: 'おはようございます。',
  greeting2: '本日のタスクを報告いたします。'
};

const TEMPLATE_EVENING = {
  greeting1: 'お疲れ様です。',
  greeting2: '本日の業務を終了します。'
};

const loadScripts = (dom, scripts) => {
  scripts.forEach((relativePath) => {
    const scriptPath = path.resolve(__dirname, '..', relativePath);
    const content = fs.readFileSync(scriptPath, 'utf-8');
    const script = dom.window.document.createElement('script');
    script.textContent = content;
    dom.window.document.head.appendChild(script);
  });
};

const mockClipboard = (dom) => {
  const writeText = jest.fn().mockResolvedValue();
  Object.defineProperty(dom.window.navigator, 'clipboard', {
    configurable: true,
    value: { writeText }
  });
  dom.window.alert = jest.fn();
  return writeText;
};

const createMorningHtml = () => `
  <input id="userName" value="田中" />
  <div>
    <input type="radio" name="workType" id="workTypeOffice" value="出社" checked>
    <input type="radio" name="workType" id="workTypeRemote" value="在宅">
  </div>
  <div id="mtgGroup">
    <div class="oneBlock" id="mtgElement1">
      <div class="minusButton"></div>
      <div class="timeBlock">
        <div>
          <div>開始時間</div>
          <select id="MtgStartTime1">
            <option value="9:00" selected>9:00</option>
            <option value="9:30">9:30</option>
            <option value="10:00">10:00</option>
          </select>
        </div>
        <div>
          <div>終了時間</div>
          <select id="MtgEndTime1">
            <option value="9:30" selected>9:30</option>
            <option value="10:00">10:00</option>
            <option value="10:30">10:30</option>
          </select>
        </div>
      </div>
      <div class="inputBlock">
        <div>内容</div>
        <input type="text" id="MtgText1" value="朝会" />
      </div>
    </div>
  </div>
  <div id="todoGroup">
    <div class="oneBlock" id="todoElement1">
      <div class="selectBlock">
        <div>項目名</div>
        <input type="text" id="todoTitle1" value="開発" />
      </div>
      <div>
        <div class="title">内容</div>
        <div class="inputBox">
          <textarea id="todoText1">API実装</textarea>
        </div>
      </div>
    </div>
  </div>
  <textarea id="share">資料を参照</textarea>
  <div id="previewArea"></div>
  <button id="copyButton"></button>
  <button id="mtgAddButton"></button>
  <button id="todoAddButton"></button>
`;

const createEveningHtml = () => `
  <input id="userName" value="佐藤" />
  <div>
    <input type="radio" name="workType" id="workTypeOffice" value="出社">
    <input type="radio" name="workType" id="workTypeRemote" value="在宅" checked>
  </div>
  <div id="mtgGroup">
    <div class="oneBlock" id="mtgElement1">
      <div class="minusButton"></div>
      <div class="timeBlock">
        <div>
          <div>開始時間</div>
          <select id="MtgStartTime1">
            <option value="13:00" selected>13:00</option>
            <option value="13:30">13:30</option>
            <option value="14:00">14:00</option>
          </select>
        </div>
        <div>
          <div>終了時間</div>
          <select id="MtgEndTime1">
            <option value="13:30" selected>13:30</option>
            <option value="14:00">14:00</option>
            <option value="14:30">14:30</option>
          </select>
        </div>
      </div>
      <div class="inputBlock">
        <div>内容</div>
        <input type="text" id="MtgText1" value="定例MTG" />
      </div>
    </div>
  </div>
  <div id="todoGroup">
    <div class="oneBlock" id="todoElement1">
      <div class="selectBlock">
        <div>項目名</div>
        <input type="text" id="todoTitle1" value="レビュー" />
      </div>
      <div>
        <div class="title">内容</div>
        <div class="inputBox">
          <textarea id="todoText1">仕様確認</textarea>
        </div>
      </div>
    </div>
  </div>
  <textarea id="remaining">追加調整</textarea>
  <textarea id="share">特記事項なし</textarea>
  <div id="previewArea"></div>
  <button id="copyButton"></button>
  <button id="mtgAddButton"></button>
  <button id="todoAddButton"></button>
`;

const morningScripts = [
  'js/onclick.js',
  'MorningLoad.js',
  'json/templates.js',
  'js/greeting.js',
  'js/workType.js',
  'js/mtg.js',
  'js/todo.js',
  'js/share.js'
];

const eveningScripts = [
  'js/onclick.js',
  'eveningLoad.js',
  'json/templates.js',
  'js/greeting.js',
  'js/workType.js',
  'js/mtg.js',
  'js/todo.js',
  'js/share.js',
  'js/remaining.js'
];

describe('morning report flow', () => {
  let dom;
  let clipboardMock;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
      url: 'http://localhost',
      runScripts: 'dangerously'
    });
    dom.window.document.body.innerHTML = createMorningHtml();
    loadScripts(dom, morningScripts);
    clipboardMock = mockClipboard(dom);
    if (typeof dom.window.onload === 'function') {
      dom.window.onload();
    }
  });

  test('generateMorningPreview returns expected string', () => {
    const preview = dom.window.eval('generateMorningPreview()');
    const expectedGreeting = `${TEMPLATE_MORNING.greeting1}\n田中です。\n${TEMPLATE_MORNING.greeting2}`;
    const expectedWorkType = `${TEMPLATE_COMMON.workType}\n出社`;
    const expectedBusiness = TEMPLATE_COMMON.business;
    const expectedMtg = `【MTG】\n9:00-9:30 朝会\n`;
    const expectedTodo = `【本日作業】\n◇開発\nAPI実装\n\n`;
    const expectedShare = `${TEMPLATE_COMMON.share}\n資料を参照`;
    const expected = `${expectedGreeting}\n\n${expectedWorkType}\n\n${expectedBusiness}\n\n${expectedMtg}\n${expectedTodo}${expectedShare}`;

    expect(preview).toBe(expected);
  });

  test('setMorning triggers alert and copies preview text', () => {
    const expected = dom.window.eval('generateMorningPreview()');

    dom.window.eval('setMorning()');

    expect(dom.window.alert).toHaveBeenCalledWith('コピーが実行されました');
    expect(clipboardMock).toHaveBeenCalledWith(expected);
  });

  test('mtgAddButton reuses previous finish time and adds removal handler', () => {
    const { document, Event } = dom.window;
    document.getElementById('MtgEndTime1').value = '10:00';

    dom.window.eval('mtgAddButton()');

    const mtgGroup = document.getElementById('mtgGroup');
    expect(mtgGroup.children.length).toBe(2);

    const newIndex = mtgGroup.children.length;
    expect(document.getElementById(`MtgStartTime${newIndex}`).value).toBe('10:00');
    expect(document.getElementById(`MtgEndTime${newIndex}`).value).toBe('10:30');

    const removeButton = document.getElementById(`mtgMinusTime${newIndex}`);
    removeButton.dispatchEvent(new Event('click', { bubbles: true }));

    expect(mtgGroup.children.length).toBe(1);
  });

  test('todoAddButton appends removable block', () => {
    const { document, Event } = dom.window;

    dom.window.eval('todoAddButton()');

    const todoGroup = document.getElementById('todoGroup');
    expect(todoGroup.children.length).toBe(2);
    const removeButton = document.getElementById(`todoMinusElement${todoGroup.children.length}`);
    removeButton.dispatchEvent(new Event('click', { bubbles: true }));

    expect(todoGroup.children.length).toBe(1);
  });
});

describe('evening report flow', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
      url: 'http://localhost',
      runScripts: 'dangerously'
    });
    dom.window.document.body.innerHTML = createEveningHtml();
    loadScripts(dom, eveningScripts);
    if (typeof dom.window.onload === 'function') {
      dom.window.onload();
    }
  });

  test('generateEveningPreview returns expected string', () => {
    const preview = dom.window.eval('generateEveningPreview()');
    const expectedGreeting = `${TEMPLATE_EVENING.greeting1}\n佐藤です。\n${TEMPLATE_EVENING.greeting2}`;
    const expectedWorkType = `${TEMPLATE_COMMON.workType}\n在宅`;
    const expectedBusiness = TEMPLATE_COMMON.business;
    const expectedMtg = `【MTG】\n13:00-13:30 定例MTG\n`;
    const expectedTodo = `【本日作業】\n◇レビュー\n仕様確認\n\n`;
    const expectedRemaining = `${TEMPLATE_COMMON.remaining}\n追加調整`;
    const expectedShare = `${TEMPLATE_COMMON.share}\n特記事項なし`;
    const expected = `${expectedGreeting}\n\n${expectedWorkType}\n\n${expectedBusiness}\n\n${expectedMtg}\n${expectedTodo}${expectedRemaining}\n\n${expectedShare}`;

    expect(preview).toBe(expected);
  });
});
