/**
 * @jest-environment jsdom
 */

import TaskList from '../modules/taskList.js';
import Task from '../modules/task.js';

describe('TaskList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('deleteTask', () => {
    it('should delete the only task in the task list', () => {
      const taskList = new TaskList();
      taskList.addTask('Task 1');
      taskList.deleteTask(0);
      expect(taskList.tasks.length).toBe(0);
    });

    it('should not delete any task if the index is out of range', () => {
      const taskList = new TaskList();
      taskList.addTask('Task 1');
      taskList.deleteTask(1);
      expect(taskList.tasks.length).toBe(1);
    });
  });

  describe('toggleComplete', () => {
    it('should toggle the completion status of a task', () => {
      const taskList = new TaskList();
      taskList.addTask('Task 1');
      const index = 0;
      taskList.toggleComplete(index);
      expect(taskList.tasks[index].completed).toBe(true);
    });

    it('should not toggle the completion status if the index is out of range', () => {
      const taskList = new TaskList();
      taskList.addTask('Task 1');
      const index = 1;
      taskList.toggleComplete(index);
      expect(taskList.tasks[0].completed).toBe(false);
    });
  });

  describe('editTaskDescription', () => {
    it('should edit the description of a task', () => {
      const taskList = new TaskList();
      taskList.addTask('Task 1');
      const index = 0;
      const newDescription = 'Updated Task 1';
      taskList.editTaskDescription(index, newDescription);
      expect(taskList.tasks[index].description).toBe(newDescription);
    });

    it('should not edit the description if the index is out of range', () => {
      const taskList = new TaskList();
      taskList.addTask('Task 1');
      const index = 1;
      const newDescription = 'Updated Task 1';
      taskList.editTaskDescription(index, newDescription);
      expect(taskList.tasks[0].description).not.toBe(newDescription);
    });
  });

  describe('clearCompleted', () => {
    it('should clear all completed tasks from the task list', () => {
      const taskList = new TaskList();
      taskList.addTask('Task 1');
      taskList.addTask('Task 2');
      taskList.tasks[0].completed = true;
      taskList.clearCompleted();
      const expectedTasks = [new Task('Task 2', false)];
      expect(taskList.tasks.length).toBe(expectedTasks.length);
      expect(taskList.tasks).toEqual(expectedTasks);
    });
  });
});
