package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TodoJpaResource {
	
	private TodoService todoService;
	private TodoRepository todoRepository;
	
	public TodoJpaResource(TodoService todoService,TodoRepository todoRepository) {
		super();
		this.todoService = todoService;
		this.todoRepository = todoRepository;
	}
	
	@GetMapping("/auth")
	public String authCheck() {
		return "Success";
	}

	@GetMapping("/users/{username}/todos")
	public List<Todo> retrieveTodos(@PathVariable String username){
		return todoRepository.findByUsername(username);
	}
	
	@GetMapping("/users/{username}/todos/{id}")
	public Todo retrieveTodo(@PathVariable String username, @PathVariable int id){
		return todoRepository.findById(id).get();
	}
	
	@DeleteMapping("/users/{username}/todos/{id}")
	public void deleteTodo(@PathVariable String username, @PathVariable int id){
		todoRepository.deleteById(id);
	}
	
	@PutMapping("/users/{username}/todos/{id}")
	public Todo updateTodo(@PathVariable String username, @PathVariable int id,
			                               @RequestBody Todo todo ){
		todoRepository.save(todo);
		return todo;
	}
	
	@PostMapping("/users/{username}/todos")
	public Todo createTodo(@PathVariable String username,@RequestBody Todo todo ){
		todo.setUsername(username);
		todo.setId(null);
		return todoRepository.save(todo);
		//return todoService.addTodo(username, todo.getDescription(), 
				                   //todo.getTargetDate(), false);
	}
	
}
