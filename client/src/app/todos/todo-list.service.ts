import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Todo} from './todo';
import {environment} from '../../environments/environment';

@Injectable()
export class TodoListService {
  readonly todoUrl: string = environment.API_URL + 'todos';

  constructor(private httpClient: HttpClient) {
  }

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.todoUrl);
  }

  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }

  filterTodos(todos: Todo[], searchOwner?: string, searchStatus?: string, searchBody?: string, searchCategory?: string): Todo[] {

    let filteredTodos = todos;

    // Filter by owneris
    if (searchOwner != null) {
      searchOwner = searchOwner.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return !searchOwner || todo.owner.toLowerCase().indexOf(searchOwner) !== -1;
      });
    }

    // Filter by status
    if (searchStatus != null) {
      searchStatus = searchStatus.toLowerCase();

      var isCompleteOrNot = true;
       if (searchStatus === "incomplete") {
         isCompleteOrNot = false;
       }

      filteredTodos = filteredTodos.filter(todo => {
        return !searchStatus || (todo.status === isCompleteOrNot);
      });
    }

    // Filter by body
    if (searchBody != null) {
      searchBody = searchBody.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return !searchBody || todo.body.toLowerCase().indexOf(searchBody) !== -1;
      });
    }

    // Filter by category
    if (searchCategory != null) {
      searchCategory = searchCategory.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => {
        return !searchCategory || todo.category.toLowerCase().indexOf(searchCategory) !== -1;
      });
    }

    return filteredTodos;
  }
}
