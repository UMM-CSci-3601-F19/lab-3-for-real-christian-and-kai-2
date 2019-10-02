import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {FormsModule} from '@angular/forms';

import {CustomModule} from '../custom.module';

import {Todo} from './todo';
import {TodoListComponent} from './todo-list.component';
import {TodoListService} from './todo-list.service';

describe('Todo list', () => {

  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => of([
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
      ])
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [TodoListComponent],
      // providers:    [ UserListService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the todos', () => {
    expect(todoList.todos.length).toBe(3);
  });

  it('contains a user named \'Christian\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Christian')).toBe(true);
  });

  it('contain a user named \'Kai\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Kai')).toBe(true);
  });

  it('doesn\'t contain a user named \'Santa\'', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Santa')).toBe(false);
  });

  it('have two todos that their status is complete', () => {
    expect(todoList.todos.filter((todo: Todo) => todo.status === true).length).toBe(2);
  });

  it('have two todos that their category is \'software design\'', () => {
    expect(todoList.todos.filter((todo: Todo) => todo.category === "software design").length).toBe(2);
  });

  it('has one todo that its body is \'They are great.\'', () => {
    expect(todoList.todos.filter((todo: Todo) => todo.body === "They are great.").length).toBe(1);
  });

  it('function showAllTodos() works', () => {
    todoList.filteredTodos = null;
    todoList.showAllTodos();
    expect(todoList.filteredTodos.length).toBe(3);
  });

  it('function clearFilteredTodo() works', () => {
    todoList.todoId = "Kai_id";
    todoList.filteredTodo = ({
      id: "Kai_id",
      owner: "Kai",
      status: false,
      body: "I wrote something.",
      category: "software design"
    });
    todoList.clearFilteredTodo();
    expect(todoList.todoId).toBe("");
    expect(!todoList.filteredTodo).toBe(true);
  });

  it('function clearFilteredTodos() works', () => {
    todoList.todoBody = "I wrote something.";
    todoList.filteredTodos = [
      {
      id: "Kai_id",
      owner: "Kai",
      status: false,
      body: "I wrote something.",
      category: "software design"
      },{
      id: 'Christian_id',
      owner: "Christian",
      status: true,
      body: "I wrote something.",
      category: "homework",
      }];
    expect(todoList.filteredTodos.length).toBe(2);
    todoList.clearFilteredTodos();
    expect(todoList.todoBody).toBe("");
    expect(!todoList.filteredTodos).toBe(true);
  });
});

describe('Misbehaving Todo List', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    // stub UserService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.create(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CustomModule],
      declarations: [TodoListComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a UserListService', () => {
    // Since the observer throws an error, we don't expect users to be defined.
    expect(todoList.todos).toBeUndefined();
  });
});
