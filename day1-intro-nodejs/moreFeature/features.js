const readline = require('readline');
const fs = require('fs');

const DATA_FILE = 'tasks.json';

if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

function loadTasks() {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function saveTasks(tasks) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

function addTask(title, dueDate) {
    if (!title || !dueDate) {
        console.log('Enter task title and due date!');
        return;
    }

    const tasks = loadTasks();
    const newTask = {
        id: tasks.length + 1,
        title,
        dueDate,
        completed: false
    };

    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`✅ Task added: "${title}" (Due: ${dueDate})`);
}

function listTasks() {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log('📭 No tasks available.');
        return;
    }

    console.log('\n📋 Your Tasks:\n');
    tasks.forEach(task => {
        const status = task.completed ? '✅ Completed' : '🕓 Pending';
        console.log(`${task.id}. ${task.title} | Due: ${task.dueDate} | Status: ${status}`);
    });
    console.log('');
}

function completeTask(identifier) {
    const tasks = loadTasks();
    let taskFound = false;

    const updatedTasks = tasks.map(task => {
        if (
            task.id === Number(identifier) ||
            task.title.toLowerCase() === identifier.toLowerCase()
        ) {
            task.completed = true;
            taskFound = true;
        }
        return task;
    });

    if (taskFound) {
        saveTasks(updatedTasks);
        console.log(`✅ Task "${identifier}" marked as completed.`);
    } else {
        console.log(`❌ Task "${identifier}" not found.`);
    }
}

function updateTask(identifier, newTitle, newDueDate) {
    const tasks = loadTasks();
    let taskFound = false;

    const updatedTasks = tasks.map(task => {
        if (task.id === Number(identifier) || task.title.toLowerCase() === identifier.toLowerCase()) {
            if (newTitle) task.title = newTitle;
            if (newDueDate) task.dueDate = newDueDate;
            taskFound = true;
        }
        return task;
    });

    if (taskFound) {
        saveTasks(updatedTasks);
        console.log(`✅ Task "${identifier}" updated.`);
    } else {
        console.log(`❌ Task "${identifier}" not found.`);
    }
}

function deleteTask(identifier) {
    const tasks = loadTasks();
    const filteredTasks = tasks.filter(task =>
        !(task.id === Number(identifier) || task.title.toLowerCase() === identifier.toLowerCase())
    );

    if (filteredTasks.length === tasks.length) {
        console.log(`❌ Task "${identifier}" not found.`);
    } else {
        saveTasks(filteredTasks);
        console.log(`🗑️ Task "${identifier}" deleted.`);
    }
}

function searchTasks(query) {
    const tasks = loadTasks();
    const lowerQuery = query.toLowerCase();

    const results = tasks.filter(
        task => task.title.toLowerCase().includes(lowerQuery) || task.dueDate.includes(query)
    );

    if (results.length === 0) {
        console.log(`🔍 No tasks found matching "${query}".`);
        return;
    }

    console.log(`\n🔍 Search results for "${query}":\n`);
    results.forEach(task => {
        const status = task.completed ? '✅ Completed' : '🕓 Pending';
        console.log(`${task.id}. ${task.title} | Due: ${task.dueDate} | Status: ${status}`);
    });
    console.log('');
}

function showHelp() {
    console.log(`
📖 Available Commands:
  - add-task         → Add a new task
  - list-tasks       → List all tasks
  - complete-task    → Mark a task as completed
  - update-task      → Update task title or due date
  - delete-task      → Delete a task
  - search-tasks     → Search tasks by title or due date
  - exit             → Exit the application
`);
}

// CLI
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🧠 Welcome to the Terminal Task Manager!');
showHelp();

function promptCommand() {
    rl.question('\n👉 Enter command: ', command => {
        switch (command.trim()) {
            case 'add-task':
                rl.question('📝 Task title: ', title => {
                    rl.question('📅 Due date: ', dueDate => {
                        addTask(title.trim(), dueDate.trim());
                        promptCommand();
                    });
                });
                break;

            case 'list-tasks':
                listTasks();
                promptCommand();
                break;

            case 'complete-task':
                rl.question('✅ Task ID or title to complete: ', identifier => {
                    completeTask(identifier.trim());
                    promptCommand();
                });
                break;

            case 'update-task':
                rl.question('✏️ Task ID or title to update: ', identifier => {
                    rl.question('🔤 New title (or press Enter to skip): ', newTitle => {
                        rl.question('📅 New due date (or press Enter to skip): ', newDueDate => {
                            updateTask(identifier.trim(), newTitle.trim() || null, newDueDate.trim() || null);
                            promptCommand();
                        });
                    });
                });
                break;

            case 'delete-task':
                rl.question('🗑️ Task ID or title to delete: ', identifier => {
                    deleteTask(identifier.trim());
                    promptCommand();
                });
                break;

            case 'search-tasks':
                rl.question('🔍 Enter search query (title or date): ', query => {
                    searchTasks(query.trim());
                    promptCommand();
                });
                break;

            case 'exit':
                rl.close();
                break;

            default:
                console.log('❌ Unknown command. Type "help" to see available commands.');
                promptCommand();
        }
    });
}

promptCommand();
