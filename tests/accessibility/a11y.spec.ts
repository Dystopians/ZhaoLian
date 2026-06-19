import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

async function expectNoCriticalA11yViolations(page: import('@playwright/test').Page) {
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((violation) =>
    ['critical', 'serious'].includes(violation.impact ?? ''),
  );
  expect(serious).toEqual([]);
}

test('title and content notice pass automated accessibility scan', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '出去一趟：赵廉案卷' })).toBeVisible();
  await expectNoCriticalA11yViolations(page);
});

test('reading and wait mode pass automated accessibility scan', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '开始新案卷' }).click();
  for (const label of [
    '暂不填写。',
    '听日语谈话。',
    '查看酒厂账簿。',
    '今晚以前。',
    '带来。',
    '审问。',
    '拿起名单重新解释。',
    '不作解释。',
    '记录：证言没有记录他的动作。',
    '写入：称呼由“赵”变为“郁”。',
    '查看回国路线图。',
    '查看农场和酒厂账目。',
    '查看未装满的箱子。',
    '记录为“……先生”。',
    '记录门口：睡衣、木屐、门槛。',
  ]) {
    await page.getByRole('button', { name: label }).click();
  }
  await expect(page.getByRole('button', { name: '等。' })).toBeVisible();
  await expectNoCriticalA11yViolations(page);
});
