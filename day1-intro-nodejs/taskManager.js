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
    tasks.forEach((task, index) => {
        const status = task.completed ? '✅ Completed' : '🕓 Pending';
        console.log(`${index + 1}. ${task.title} | Due: ${task.dueDate} | Status: ${status}`);
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

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('📌 Welcome to the Terminal Task Manager!');
console.log('Available Commands:\n- add-task\n- list-tasks\n- complete-task\n- exit\n');

function promptCommand() {
    rl.question('Enter command: ', command => {
        if (command === 'exit') {
            rl.close();
            return;
        }

        switch (command) {
            case 'add-task':
                rl.question('Enter task title: ', title => {
                    rl.question('Enter due date: ', dueDate => {
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
                rl.question('Enter task ID or title: ', identifier => {
                    completeTask(identifier.trim());
                    promptCommand();
                });
                break;

            default:
                console.log('Unknown command. Try again.');
                promptCommand();
        }
    });
}

promptCommand();
