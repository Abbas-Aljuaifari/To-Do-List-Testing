/**
 * @jest-environment jsdom
 */

document.body.innerHTML = `
    <div class="to-do-app">
        <div class="row">
            <input
            type="text"
            id="input-box"
            />
            <button class="add-btn" id="my-btn">Add</button>
        </div>
        <ul class="list-contaner" id="ls-contaner"></ul>
        <div class="remove-button">
            <button class="Remove-btn">Clear all completed</button>
        </div>
    </div>
    `;

describe('add button', () => {
  test('adds an item', async () => {
    await import('../index.js');
    const taskInput = document.getElementById('input-box');
    const addButton = document.getElementById('my-btn');

    taskInput.value = 'Task 1';
    addButton.click();

    const task = document.getElementsByClassName('task-item')[0];
    console.log('here', task);

    expect(task.innerText).toEqual('Task 1');
  });
});
