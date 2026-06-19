import { expect, test } from '@playwright/test';

const path = [
  '写下“赵廉”。',
  '听日语谈话。',
  '询问回来的人。',
  '明天上午。',
  '让我先核对姓名。',
  '审问。',
  '说口音太重。',
  '不作解释。',
  '记录：证言没有记录他的动作。',
  '写入：称呼由“赵”变为“郁”。',
  '查看农场和酒厂账目。',
  '查看写有赵廉的证件。',
  '查看回国路线图。',
  '记录为“……先生”。',
  '记录门口：睡衣、木屐、门槛。',
] as const;

async function clickPath(page: import('@playwright/test').Page, labels: readonly string[]) {
  for (const label of labels) {
    await clickVisibleButton(page, label);
  }
}

async function clickVisibleButton(page: import('@playwright/test').Page, label: string) {
  const button = page.getByRole('button', { name: label });
  await expect(button).toBeVisible();
  await button.click({ force: true });
}

async function activateLocatorByKeyboard(locator: import('@playwright/test').Locator) {
  await expect(locator).toBeVisible();
  await locator.press('Enter');
}

async function expectEndingVisualLoaded(page: import('@playwright/test').Page) {
  const visual = page.locator('.ending-visual img');
  await expect(visual).toHaveAttribute(
    'src',
    /ending-(monument|case-file|home|untranslated|testimony-weave|delay-shadow)/,
  );
  await expect(visual).toHaveJSProperty('naturalWidth', 1280);
  await expect(visual).toHaveJSProperty('naturalHeight', 720);
  await expect
    .poll(async () => {
      const box = await page.locator('.ending-visual').boundingBox();
      const viewport = page.viewportSize();
      if (!box || !viewport) return false;
      return box.y >= 0 && box.y < viewport.height;
    })
    .toBe(true);
}

test('player can start, wait to dawn, and generate an ending', async ({ page, browserName }) => {
  test.skip(
    browserName === 'firefox',
    'Firefox smoke coverage runs in this matrix; full golden path is covered elsewhere.',
  );
  await page.goto('/');
  await page.getByRole('button', { name: '开始新案卷' }).click();
  await clickPath(page, path);
  await expect(page.getByRole('button', { name: '等。' })).toBeVisible();
  for (const label of ['等。', '再等一会儿。', '继续等。', '还等。', '等到天亮。']) {
    await clickVisibleButton(page, label);
  }
  await expect(page.getByRole('heading', { name: '八月三十日' })).toBeVisible();
  await clickPath(page, [
    '写作：尚不能判断。',
    '去咖啡店。',
    '去道路方向。',
    '你以前见过那个青年吗？',
    '请从赵老板走出家门以前说起。',
    '你怎样判断车里的人可能是日本人？',
    '请从你走到那条路上时说起。',
    '请从他起身时说起，包括衣服和鞋。',
    '门外称呼听清了吗？',
    '固定后来调查簇。',
    '把两个日期标为冲突。',
  ]);
  await page.getByRole('radio', { name: /暂不规定主次/ }).check();
  await page.getByRole('button', { name: '确认并生成案卷结局' }).click();
  await expect(page.getByText('无论你如何编目，他都没有从门外回来。')).toBeVisible();
  await expect(page.getByText('案卷完成：相対性理論 - スマトラ警備隊')).toBeVisible();
  await expect(page.locator('.context-rail')).toContainText(/END-[A-F]/);
  await expect(page.locator('.yu-excerpt')).toContainText(/郁达夫/);
  await expectEndingVisualLoaded(page);
});

test('core path can be completed with keyboard-activated controls and visible focus', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'chromium',
    'Deep keyboard completion is covered in Chromium; other projects run completion, smoke, and reflow coverage.',
  );
  await page.goto('/');
  const startButton = page.locator('.title-screen .button.primary');
  await startButton.focus();
  await expect(startButton).toBeFocused();
  const outlineStyle = await startButton.evaluate(
    (element) => getComputedStyle(element).outlineStyle,
  );
  expect(outlineStyle).not.toBe('none');

  await page.keyboard.press('Enter');
  for (const label of path) {
    await activateLocatorByKeyboard(page.getByRole('button', { name: label }));
  }

  for (const label of ['等。', '再等一会儿。', '继续等。', '还等。', '等到天亮。']) {
    await activateLocatorByKeyboard(page.getByRole('button', { name: label }));
  }

  for (const label of [
    '写作：尚不能判断。',
    '去咖啡店。',
    '去道路方向。',
    '你以前见过那个青年吗？',
    '请从赵老板走出家门以前说起。',
    '你怎样判断车里的人可能是日本人？',
    '请从你走到那条路上时说起。',
    '请从他起身时说起，包括衣服和鞋。',
    '门外称呼听清了吗？',
    '固定后来调查簇。',
    '把两个日期标为冲突。',
  ]) {
    await activateLocatorByKeyboard(page.getByRole('button', { name: label }));
  }

  await expect(page.locator('.report-form')).toBeVisible();
  const radio = page.locator('.radio-option input[type="radio"]').first();
  await radio.focus();
  await page.keyboard.press('Space');
  await expect(radio).toBeChecked();
  await activateLocatorByKeyboard(page.locator('.report-form button[type="submit"]'));
  await expect(page.locator('.context-rail')).toContainText(
    /纪念碑|赵廉失踪案|家中未归者|未译之词|证词互校|延宕疑云/,
  );
  await expect(page.locator('.context-rail')).toContainText(/END-[A-F]/);
  await expect(page.locator('.yu-excerpt')).toContainText(/郁达夫/);
  await expectEndingVisualLoaded(page);
});

test('dossier and source mode are available without blocking progress', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '开始新案卷' }).click();
  await page.getByRole('button', { name: '打开案卷抽屉' }).click();
  await expect(page.getByRole('dialog', { name: '案卷抽屉' })).toBeVisible();
  await page.getByRole('button', { name: '关闭案卷' }).click();
  await page.getByRole('button', { name: '设置' }).click();
  await page.getByLabel('来源模式').check();
  await page.getByRole('button', { name: '阅读' }).click();
  await expect(page.getByRole('button', { name: /重构：查看材料层级说明/ }).first()).toBeVisible();
});

test('generated visuals and local music controls render in the app shell', async ({ page }) => {
  await page.addInitScript(() => {
    const win = window as Window & { __audioPlayCalls?: string[] };
    win.__audioPlayCalls = [];
    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
      configurable: true,
      get() {
        return !(this as HTMLMediaElement & { __playing?: boolean }).__playing;
      },
    });
    HTMLMediaElement.prototype.play = function play() {
      (this as HTMLMediaElement & { __playing?: boolean }).__playing = true;
      win.__audioPlayCalls?.push(this.currentSrc || this.src);
      return Promise.resolve();
    };
    HTMLMediaElement.prototype.pause = function pause() {
      (this as HTMLMediaElement & { __playing?: boolean }).__playing = false;
    };
  });
  await page.goto('/');
  await expect(page.locator('.title-visual img')).toHaveAttribute('src', /scene-archive-desk/);
  await page.getByRole('button', { name: '开始新案卷' }).click();
  await expect(page.locator('.context-visual img')).toHaveAttribute('src', /scene-archive-desk/);
  await expect(page.locator('.music-button')).toBeVisible();
  await page.waitForFunction(
    () => (window as Window & { __audioPlayCalls?: string[] }).__audioPlayCalls?.length,
  );
  await page.getByRole('button', { name: '方法与史料' }).click();
  await expect(page.locator('.visual-gallery img')).toHaveCount(5);
});

test('bad save import is rejected as controlled text', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '设置' }).click();
  const chooserPromise = page.waitForEvent('filechooser');
  await page.getByLabel('导入存档 JSON').click();
  const chooser = await chooserPromise;
  await chooser.setFiles({
    name: 'bad-save.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{bad json'),
  });
  await expect(page.getByText('存档不是有效 JSON。')).toBeAttached();
});

test('autosave restores scene and choices after reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '开始新案卷' }).click();
  await clickPath(page, path.slice(0, 2));
  await expect(page.getByRole('button', { name: path[2] })).toBeVisible();
  await page.waitForFunction(() => (localStorage.getItem('zhao-lian-autosave') ?? '').length > 0);
  await page.reload();
  await page.locator('.title-screen .actions .button').nth(1).click();
  await expect(page.getByRole('button', { name: path[2] })).toBeVisible();
});

test('core play does not issue third-party network requests', async ({ page }) => {
  const externalRequests: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    const localHosts = new Set(['localhost', '127.0.0.1', '::1']);
    if (!localHosts.has(url.hostname) && url.protocol !== 'data:') {
      externalRequests.push(request.url());
    }
  });

  await page.goto('/');
  await page.getByRole('button', { name: '开始新案卷' }).click();
  for (let step = 0; step < 4; step += 1) {
    await page.locator('.choice-button').first().click();
  }
  expect(externalRequests).toEqual([]);
});

test('required mobile viewport has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
});

test('200 percent text scaling keeps primary controls usable', async ({ page }) => {
  await page.goto('/');
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  await expect(page.locator('.title-screen .button.primary')).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
});
