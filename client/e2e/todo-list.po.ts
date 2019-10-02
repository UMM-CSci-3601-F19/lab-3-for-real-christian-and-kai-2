import {browser, by, element, Key} from 'protractor';

export class TodoPage {
  navigateTo() {
    return browser.get('/todos');
  }

  //http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
  highlightElement(byObject) {
    function setStyle(element, style) {
      const previous = element.getAttribute('style');
      element.setAttribute('style', style);
      setTimeout(() => {
        element.setAttribute('style', previous);
      }, 200);
      return "highlighted";
    }
    return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
  }

  getTodoTitle() {
    let title = element(by.id('todo-list-title')).getText();
    this.highlightElement(by.id('todo-list-title'));
    return title;
  }

  typeAnId(tarId: string) {
    let input = element(by.id('todoId'));
    input.click();
    input.sendKeys(tarId);
  }

  clearTodo(){
    let button = element(by.id('clearTodo'));
    button.click();
  }

  typeAOwner(owner: string) {
    let input = element(by.id('todoOwner'));
    input.click();
    input.sendKeys(owner);
  }

  selectAStatus(status: string) {
    let selectBox = element(by.id('todoStatus'));
    selectBox.click();
    if (status === "incomplete") {
      browser.actions().sendKeys(Key.ARROW_DOWN).perform();
    }
    browser.actions().sendKeys(Key.ENTER).perform();
  }

  typeABody(body: string) {
    let input = element(by.id('todoBody'));
    input.click();
    input.sendKeys(body);
  }

  repeatBackspace(counter: number) {
    while (counter > 0) {
      this.backspace();
      counter--;
    }
  }

  typeACategory(category: string) {
    let input = element(by.id('todoCategory'));
    input.click();
    input.sendKeys(category);
  }

  backspace() {
    browser.actions().sendKeys(Key.BACK_SPACE).perform();
  }

  getUniqueTodo(body: string) {
    let realBody = element(by.id(body)).getText();
    this.highlightElement(by.id(body));
    return realBody;
  }

  clearTodos(){
    let button = element(by.id('clearTodos'));
    button.click();
  }
}
