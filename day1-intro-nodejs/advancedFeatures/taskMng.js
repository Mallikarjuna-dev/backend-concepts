const readline = require('readline');
const fs = require('fs');

const TASK_FILE = 'tasks.json';
const PREF_FILE = 'preferences.json';

if (!fs.existsSync(TASK_FILE)) fs.writeFileSync(TASK_FILE, JSON.stringify([]));
if (!fs.existsSync(PREF_FILE)) fs.writeFileSync(PREF_FILE, JSON.stringify({ filter: 'all' }));

function loadTasks() {
    return JSON.parse(fs.readFileSync(TASK_FILE, 'utf-8'));
}

function saveTasks(tasks) {
    fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
}

function loadPreferences() {
    return JSON.parse(fs.readFileSync(PREF_FILE, 'utf-8'));
}

function savePreferences(pref) {
    fs.writeFileSync(PREF_FILE, JSON.stringify(pref, null, 2));
}

function isValidDate(dateStr) {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !isNaN(new Date(dateStr).getTime());
}

function addTask(title, dueDate) {
    if (!title.trim()) return console.log('❌ Task title cannot be empty.');
    if (!isValidDate(dueDate)) return console.log('❌ Due date must be in YYYY-MM-DD format.');

    const tasks = loadTasks();
    const newTask = {
        id: tasks.length + 1,
        title: title.trim(),
        dueDate,
        completed: false
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`✅ Task added: "${newTask.title}" (Due: ${newTask.dueDate})`);
}

function listTasks() {
    const tasks = loadTasks();
    const { filter } = loadPreferences();

    const filtered = tasks.filter(task =>
        filter === 'all' ||
        (filter === 'pending' && !task.completed) ||
        (filter === 'completed' && task.completed)
    );

    if (filtered.length === 0) {
        console.log('📭 No tasks match the selected filter.');
        return;
    }

    console.log(`\n📋 Tasks (${filter}):\n`);
    filtered.forEach(task => {
        const status = task.completed ? '✅ Completed' : '🕓 Pending';
        console.log(`${task.id}. ${task.title} | Due: ${task.dueDate} | Status: ${status}`);
    });
}

function completeTask(identifier) {
    const tasks = loadTasks();
    let found = false;

    const updated = tasks.map(task => {
        if (task.id === Number(identifier) || task.title.toLowerCase() === identifier.toLowerCase()) {
            task.completed = true;
            found = true;
        }
        return task;
    });

    if (found) {
        saveTasks(updated);
        console.log(`✅ Task "${identifier}" marked as completed.`);
    } else {
        console.log(`❌ Task "${identifier}" not found.`);
    }
}

function updateTask(identifier, newTitle, newDueDate) {
    const tasks = loadTasks();
    let found = false;

    const updated = tasks.map(task => {
        if (task.id === Number(identifier) || task.title.toLowerCase() === identifier.toLowerCase()) {
            if (newTitle.trim()) task.title = newTitle.trim();
            if (newDueDate.trim() && isValidDate(newDueDate)) {
                task.dueDate = newDueDate;
            } else if (newDueDate.trim()) {
                console.log('❌ Invalid date format. Use YYYY-MM-DD.');
                return task;
            }
            found = true;
        }
        return task;
    });

    if (found) {
        saveTasks(updated);
        console.log(`✅ Task "${identifier}" updated.`);
    } else {
        console.log(`❌ Task "${identifier}" not found.`);
    }
}

function deleteTask(identifier) {
    const tasks = loadTasks();
    const remaining = tasks.filter(task =>
        !(task.id === Number(identifier) || task.title.toLowerCase() === identifier.toLowerCase())
    );

    if (remaining.length === tasks.length) {
        console.log(`❌ Task "${identifier}" not found.`);
    } else {
        saveTasks(remaining);
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
        console.log(`🔍 No results found for "${query}".`);
    } else {
        console.log(`\n🔍 Results for "${query}":\n`);
        results.forEach(task => {
            const status = task.completed ? '✅ Completed' : '🕓 Pending';
            console.log(`${task.id}. ${task.title} | Due: ${task.dueDate} | Status: ${status}`);
        });
    }
}

function setPreference(option) {
    const valid = ['all', 'completed', 'pending'];
    if (!valid.includes(option)) {
        console.log(`❌ Invalid preference. Use one of: ${valid.join(', ')}`);
        return;
    }

    savePreferences({ filter: option });
    console.log(`⚙️ Preference updated. Now showing only "${option}" tasks.`);
}

function showHelp() {
    console.log(`
📖 Available Commands:
  - add-task            → Add a new task
  - list-tasks          → List tasks (based on preference)
  - complete-task       → Mark a task as completed
  - update-task         → Update task title or due date
  - delete-task         → Delete a task
  - search-tasks        → Search tasks by title or due date
  - set-preference      → Set task display filter (all/completed/pending)
  - exit                → Exit the application
`);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🧠 Welcome to the Advanced Task Manager!');
showHelp();

function promptCommand() {
    rl.question('\n👉 Enter command: ', command => {
        switch (command.trim()) {
            case 'add-task':
                rl.question('📝 Task title: ', title => {
                    rl.question('📅 Due date (YYYY-MM-DD): ', dueDate => {
                        addTask(title, dueDate);
                        promptCommand();
                    });
                });
                break;

            case 'list-tasks':
                listTasks();
                promptCommand();
                break;

            case 'complete-task':
                rl.question('✅ Task ID or title: ', identifier => {
                    completeTask(identifier);
                    promptCommand();
                });
                break;

            case 'update-task':
                rl.question('✏️ Task ID or title: ', identifier => {
                    rl.question('🔤 New title (or press Enter to skip): ', newTitle => {
                        rl.question('📅 New due date (or press Enter to skip): ', newDueDate => {
                            updateTask(identifier, newTitle, newDueDate);
                            promptCommand();
                        });
                    });
                });
                break;

            case 'delete-task':
                rl.question('🗑️ Task ID or title: ', identifier => {
                    deleteTask(identifier);
                    promptCommand();
                });
                break;

            case 'search-tasks':
                rl.question('🔍 Search title/date: ', query => {
                    searchTasks(query);
                    promptCommand();
                });
                break;

            case 'set-preference':
                rl.question('🎛️ Set filter (all/completed/pending): ', option => {
                    setPreference(option.trim().toLowerCase());
                    promptCommand();
                });
                break;

            case 'exit':
                rl.close();
                break;

            default:
                console.log('❌ Unknown command. Type "help" to see available options.');
                promptCommand();
        }
    });
}

promptCommand();