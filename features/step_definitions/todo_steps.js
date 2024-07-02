const { Given, When, Then, After } = require('@cucumber/cucumber');
const chai = require('chai');
const expect = chai.expect;
const { Builder, By, until, Key } = require('selenium-webdriver');
require('chromedriver');

let driver;

Given('I am on the todo list page', async function () {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get('http://localhost:3000');
});

When('I enter {string} into the input field', async function (item) {
  const inputField = await driver.findElement(By.css('input[placeholder="add item . . . "]'));
  await inputField.sendKeys(item);
});

When('I click the {string} button', async function (buttonText) {
  const button = await driver.findElement(By.xpath(`//button[contains(text(), '${buttonText}')]`));
  await button.click();
});

Then('I should see {string} in the todo list', async function (item) {
  await driver.wait(until.elementLocated(By.css('.list-group-item')), 5000);
  const todoItems = await driver.findElements(By.css('.list-group-item'));
  const todoTexts = await Promise.all(todoItems.map(el => el.getText()));
  expect(todoTexts.some(text => text.includes(item))).to.be.true;
});

Given('I have an item {string} in the todo list', async function (item) {
  const inputField = await driver.findElement(By.css('input[placeholder="add item . . . "]'));
  await inputField.sendKeys(item);
  const addButton = await driver.findElement(By.xpath("//button[contains(text(), 'ADD')]"));
  await addButton.click();
});

When('I click the {string} button next to {string}', async function (buttonText, item) {
  const todoItems = await driver.findElements(By.css('.list-group-item'));
  for (let todoItem of todoItems) {
    const text = await todoItem.getText();
    if (text.includes(item)) {
      const button = await todoItem.findElement(By.xpath(`.//button[contains(text(), '${buttonText}')]`));
      await button.click();
      break;
    }
  }
});

Then('I should not see {string} in the todo list', async function (item) {
  const todoItems = await driver.findElements(By.css('.list-group-item'));
  const todoTexts = await Promise.all(todoItems.map(el => el.getText()));
  expect(todoTexts.every(text => !text.includes(item))).to.be.true;
});

When('I change it to {string}', async function (newItem) {
  await driver.wait(async () => {
    try {
      const alert = await driver.switchTo().alert();
      await alert.sendKeys(newItem);
      await alert.accept();
      return true;
    } catch (error) {
      return false;
    }
  }, 5000, 'Prompt did not appear');
});

Then('I should see an alert with message {string}', async function (expectedMessage) {
  const alert = await driver.switchTo().alert();
  const alertText = await alert.getText();
  expect(alertText).to.equal(expectedMessage);
  await alert.accept();
});

Then('I should still see only one {string} in the todo list', async function (item) {
  await driver.wait(until.elementLocated(By.css('.list-group-item')), 5000);
  const todoItems = await driver.findElements(By.css('.list-group-item'));
  const todoTexts = await Promise.all(todoItems.map(el => el.getText()));
  const itemCount = todoTexts.filter(text => text.includes(item)).length;
  expect(itemCount).to.equal(1);
});

Then('I should still see {string} in the todo list', async function (item) {
  await driver.wait(until.elementLocated(By.css('.list-group-item')), 5000);
  const todoItems = await driver.findElements(By.css('.list-group-item'));
  const todoTexts = await Promise.all(todoItems.map(el => el.getText()));
  expect(todoTexts.some(text => text.includes(item))).to.be.true;
});

After(async function () {
  if (driver) {
    await driver.quit();
  }
});
