import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
  let args = arguments;
  /*
    // queue 100ms wait between test
    //This delay is only put here so that you can watch the browser do its' thing.
    //If you're tired of it taking long you can remove this call
    origFn.call(browser.driver.controlFlow(), function () {
      return protractor.promise.delayed(100);
    });
  */
  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
  });

  it('should get and highlight Todo Name attribute ', () => {
    page.navigateTo();
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  it('should type a specific id in filter id box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAnId("58895985c1849992336c219b");
    expect(page.getUniqueTodo("Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam " +
      "commodo. Aute minim incididunt ex commodo.")).toEqual("Ipsum esse est ullamco magna tempor anim laborum " +
      "non officia deserunt veniam commodo. Aute minim incididunt ex commodo.");
    page.clearTodo();
    page.typeAnId("58895985a22c04e761776d54");
    expect(page.getUniqueTodo("In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum " +
      "non labore ex sint esse.")).toEqual("In sunt ex non tempor cillum commodo amet incididunt anim qui " +
      "commodo quis. Cillum non labore ex sint esse.");
  });

  it('should type something in filter owner box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAOwner("f");
    expect(page.getUniqueTodo("Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam " +
      "commodo. Aute minim incididunt ex commodo.")).toEqual("Ipsum esse est ullamco magna tempor anim laborum " +
      "non officia deserunt veniam commodo. Aute minim incididunt ex commodo.");
    page.backspace();
    page.typeAOwner("blanche")
    expect(page.getUniqueTodo("In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum " +
      "non labore ex sint esse.")).toEqual("In sunt ex non tempor cillum commodo amet incididunt anim qui " +
      "commodo quis. Cillum non labore ex sint esse.");
  });

  it('should select something in filter status box and check that it returned correct element', () => {
    page.navigateTo();
    page.selectAStatus("incomplete");
    expect(page.getUniqueTodo("Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam " +
      "commodo. Aute minim incididunt ex commodo.")).toEqual("Ipsum esse est ullamco magna tempor anim laborum " +
      "non officia deserunt veniam commodo. Aute minim incididunt ex commodo.");
  });

  it('should type something in filter body box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeABody("Ipsum");
    expect(page.getUniqueTodo("Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam " +
      "commodo. Aute minim incididunt ex commodo.")).toEqual("Ipsum esse est ullamco magna tempor anim laborum " +
      "non officia deserunt veniam commodo. Aute minim incididunt ex commodo.");
    page.repeatBackspace(5);
    page.typeABody("cillum")
    expect(page.getUniqueTodo("In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum " +
      "non labore ex sint esse.")).toEqual("In sunt ex non tempor cillum commodo amet incididunt anim qui " +
      "commodo quis. Cillum non labore ex sint esse.");
  });

  it('should type something in filter category box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeACategory("video");
    expect(page.getUniqueTodo("Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam " +
      "commodo. Aute minim incididunt ex commodo.")).toEqual("Ipsum esse est ullamco magna tempor anim laborum " +
      "non officia deserunt veniam commodo. Aute minim incididunt ex commodo.");
  });

  it('should filter by all fields and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAOwner("fry")
    page.selectAStatus("incomplete");
    page.typeABody("Ipsum");
    page.typeACategory("video");
    expect(page.getUniqueTodo("Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam " +
      "commodo. Aute minim incididunt ex commodo.")).toEqual("Ipsum esse est ullamco magna tempor anim laborum " +
      "non officia deserunt veniam commodo. Aute minim incididunt ex commodo.");
    page.clearTodos();
    page.typeAOwner("fry")
    page.selectAStatus("complete");
    page.typeABody("Ipsum");
    page.typeACategory("video");
    expect(page.getUniqueTodo("Ipsum dolore incididunt ut ex amet. Ut velit dolor cillum do Lorem magna et aute " +
      "reprehenderit.")).toEqual("Ipsum dolore incididunt ut ex amet. Ut velit dolor cillum do Lorem magna et " +
      "aute reprehenderit.");
  });
});
