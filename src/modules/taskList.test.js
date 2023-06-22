// import TaskList from './taskList.js';
// import Task from './task.js';

// Object.defineProperty(window, 'localStorage', {
//   value: localStorageMock,
// });

// // Mock DOM manipulation
// document.body.innerHTML = `
//   <div id="ls-container"></div>
//   <button id="my-btn"></button>
//   <input id="input-box" type="text">
//   <button class="Remove-btn"></button>
//   <span class="icon"></span>
// `;

// describe('TaskList', () => {
//   let taskList;

//   beforeEach(() => {

//     localStorage.clear();
//     taskList = new TaskList();
//   });

//   describe('addTask', () => {
//     test('should add a new task to the task list', () => {
//       const description = 'New task description';

//       taskList.addTask(description);

//       expect(taskList.tasks.length).toBe(1);
//       expect(taskList.tasks[0]).toBeInstanceOf(Task);
//       expect(taskList.tasks[0].description).toBe(description);

//       expect(localStorage.getItem('tasks')).toEqual(JSON.stringify(taskList.tasks));
//     });
//     test('should add multiple tasks to the task list', () => {
//       const descriptions = ['Task 1', 'Task 2', 'Task 3'];

//       descriptions.forEach((description) => {
//         taskList.addTask(description);
//       });

//       expect(taskList.tasks.length).toBe(descriptions.length);

//       descriptions.forEach((description, index) => {
//         expect(taskList.tasks[index]).toBeInstanceOf(Task);
//         expect(taskList.tasks[index].description).toBe(description);
//       });

//       expect(localStorage.getItem('tasks')).toEqual(JSON.stringify(taskList.tasks));
//     });
//   });

//   describe('deleteTask', () => {
//     test('should delete the task at the given index', () => {

//       taskList.addTask('Task 1');
//       taskList.addTask('Task 2');
//       taskList.addTask('Task 3');

//       const index = 1;
//       const expectedTasks = [taskList.tasks[0], taskList.tasks[2]];

//       taskList.deleteTask(index);

//       expect(taskList.tasks.length).toBe(2);
//       expect(taskList.tasks).toEqual(expectedTasks);

//       expect(localStorage.getItem('tasks')).toEqual(JSON.stringify(taskList.tasks));
//     });
//   });
//   test('should delete the only task in the task list', () => {
//     const description = 'Task 1';
//     taskList.addTask(description);

//     const index = 0;

//     taskList.deleteTask(index);

//     expect(taskList.tasks.length).toBe(0);

//     expect(localStorage.getItem('tasks')).toEqual(JSON.stringify(taskList.tasks));
//   });
//   test('should not delete any task if the index is out of range', () => {

//     taskList.addTask('Task 1');
//     taskList.addTask('Task 2');
//     taskList.addTask('Task 3');

//     const index = 3;
//     const expectedTasks = taskList.tasks.slice();

//     taskList.deleteTask(index);

//     expect(taskList.tasks.length).toBe(expectedTasks.length);
//     expect(taskList.tasks).toEqual(expectedTasks);

//     expect(localStorage.getItem('tasks')).toEqual(JSON.stringify(taskList.tasks));
//   });

// });

import TaskList from './taskList.js';
import Task from './task.js';

// // Mock localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key],
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

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
      expect(taskList.tasks).toMatchObject(expectedTasks);
    });
  });
});
