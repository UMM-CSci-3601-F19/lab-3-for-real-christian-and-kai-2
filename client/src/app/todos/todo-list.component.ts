import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: []
})

export class TodoListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public todos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoBody: string;
  public todoCategory: string;


  // Inject the UserListService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private todoListService: TodoListService) {

  }

  public updateOwner(newOwner: string): void {
    this.todoOwner = newOwner;
    this.updateFilter();
  }

  public updateBody(newBody: string): void {
    this.todoBody = newBody;
    this.updateFilter();
  }

  public updateCategory(newCategory: string): void {
    this.todoCategory = newCategory;
    this.updateFilter();
  }

  public updateFilter() {
    this.filteredTodos =
      this.todoListService.filterTodos(
        this.todos,
        this.todoOwner,
        this.todoBody,
        this.todoCategory);
  }

  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  ngOnInit(): void {
    const todos: Observable<Todo[]> = this.todoListService.getTodos();
    todos.subscribe(
      returnedTodos => {
        this.todos = returnedTodos;
      },
      err => {
        console.log(err);
      });
  }
}
