import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Todo} from './todo';
import {TodoListService} from './todo-list.service';

describe('Todo list service: ', () => {
  // A small collection of test todos
  const testTodos: Todo[] = [
    {
      id: 'Christian_id',
      owner: "Christian",
      status: true,
      body: "I wrote something.",
      category: "homework",
    },
    {
      id: "Kai_id",
      owner: "Kai",
      status: false,
      body: "I wrote something.",
      category: "software design",
    },
    {
      id: "KK_id",
      owner: "KK",
      status: true,
      body: "They are great.",
      category: "software design",
    }
  ];
  let todoListService: TodoListService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoListService = new TodoListService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('getTodos() calls api/todos', () => {
    // Assert that the todos we get from this call to getTodos()
    // should be our set of test todos. Because we're subscribing
    // to the result of getTodos(), this won't actually get
    // checked until the mocked HTTP request "returns" a response.
    // This happens when we call req.flush(testUsers) a few lines
    // down.
    todoListService.getTodos().subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(todoListService.todoUrl);
    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(testTodos);
  });

  it('getTodoById() calls api/todos/id', () => {
    const targetTodo: Todo = testTodos[1];
    const targetId: string = targetTodo.id;
    todoListService.getTodoById(targetId).subscribe(
      todo => expect(todo).toBe(targetTodo)
    );
    const expectedUrl: string = todoListService.todoUrl + '/' + targetId;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetTodo);
  });

  it('filterTodos() filters by owner', () => {
    expect(testTodos.length).toBe(3);
    let todoOwner = 'K';
    expect(todoListService.filterTodos(testTodos, todoOwner, null, null, null).length).toBe(2);
  });

  it('filterTodos() filters by status', () => {
    expect(testTodos.length).toBe(3);
    let todoStatus = 'incomplete';
    expect(todoListService.filterTodos(testTodos, null, todoStatus, null, null).length).toBe(1);
  });

  it('filterTodos() filters by body', () => {
    expect(testTodos.length).toBe(3);
    let todoBody = 'wrote';
    expect(todoListService.filterTodos(testTodos, null, null, todoBody, null).length).toBe(2);
  });

  it('filterTodos() filters by category', () => {
    expect(testTodos.length).toBe(3);
    let todoCategory = 'o';
    expect(todoListService.filterTodos(testTodos, null, null, null, todoCategory).length).toBe(3);
  });

  it('filterTodos() filters by owner and status', () => {
    expect(testTodos.length).toBe(3);
    let todoOwner = 'K';
    let todoStatus = 'incomplete';
    expect(todoListService.filterTodos(testTodos, todoOwner, todoStatus, null, null).length).toBe(1);
  });

  it('filterTodos() filters by owner and body', () => {
    expect(testTodos.length).toBe(3);
    let todoOwner = 'K';
    let todoBody = 'wrote';
    expect(todoListService.filterTodos(testTodos, todoOwner, null, todoBody, null).length).toBe(1);
  });

  it('filterTodos() filters by owner and category', () => {
    expect(testTodos.length).toBe(3);
    let todoOwner = 'K';
    let todoCategory = 'o';
    expect(todoListService.filterTodos(testTodos, todoOwner, null, null, todoCategory).length).toBe(2);
  });

  it('filterTodos() filters by status and body', () => {
    expect(testTodos.length).toBe(3);
    let todoStatus = 'incomplete';
    let todoBody = 'wrote';
    expect(todoListService.filterTodos(testTodos, null, todoStatus, todoBody, null).length).toBe(1);
  });

  it('filterTodos() filters by status and category', () => {
    expect(testTodos.length).toBe(3);
    let todoStatus = 'incomplete';
    let todoCategory = 'o';
    expect(todoListService.filterTodos(testTodos, null, todoStatus, null, todoCategory).length).toBe(1);
  });

  it('filterTodos() filters by body and category', () => {
    expect(testTodos.length).toBe(3);
    let todoBody = 'wrote';
    let todoCategory = 'o';
    expect(todoListService.filterTodos(testTodos, null, null, todoBody, todoCategory).length).toBe(2);
  });

  it('filterTodos() filters by owner, status, and body', () => {
    expect(testTodos.length).toBe(3);
    let todoOwner = 'K';
    let todoStatus = 'incomplete';
    let todoBody = 'wrote';
    expect(todoListService.filterTodos(testTodos, todoOwner, todoStatus, todoBody, null).length).toBe(1);
  });

  it('filterTodos() filters by owner, status, and category', () => {
    expect(testTodos.length).toBe(3);
    let todoOwner = 'K';
    let todoStatus = 'incomplete';
    let todoCategory = 'o';
    expect(todoListService.filterTodos(testTodos, todoOwner, todoStatus, null, todoCategory).length).toBe(1);
  });

  it('filterTodos() filters by status, body, and category', () => {
    expect(testTodos.length).toBe(3);
    let todoStatus = 'incomplete';
    let todoBody = 'are';
    let todoCategory = 'o';
    expect(todoListService.filterTodos(testTodos, null, todoBody, todoStatus, todoCategory).length).toBe(0);
  });

  it('filterTodos() filters by owner, status, body, and category', () => {
    expect(testTodos.length).toBe(3);
    let todoOwner = 'K';
    let todoStatus = 'incomplete';
    let todoBody = 'are';
    let todoCategory = 'o';
    expect(todoListService.filterTodos(testTodos, todoOwner, todoBody, todoStatus, todoCategory).length).toBe(0);
  });
});
