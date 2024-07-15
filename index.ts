#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


// Print a welcom message
console.log(chalk.blue.bold("\n \t Welcome to \'Mehak ishrat\' - To-Do list"));

let todolist:string[] = []
let condition = true

let main = async()  => {
    while (condition){
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.yellow("\n Select an option you want to do:\n"),
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo-List", "Exit"]
            }
        ])
        if(option.choice === "Add Task"){
            await addTask()
        }
        else if(option.choice === "Delete Task"){
            await deleteTask()
        }

        else if(option.choice === "Update Task"){
            await updateTask()
        }

        else if(option.choice === "View Todo-List"){
            await viewTask()
        }

        else if(option.choice === "Exit"){
            condition = false;
        }
    }
}
// function to add a task in To-do list
let addTask = async() => {
    let newtask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.yellow("\n Enter your new task \n:")
        }
    ])
    todolist.push(newtask.task)
    console.log(chalk.green(`\n ${newtask.task} task added successfully in todo list\n`));
}

// function to view all todo_list Task
let viewTask = async() => {
    console.log(chalk.green("\n Your To-do lis: \n"));
    todolist.forEach((task, index) => {
        console.log(chalk.magenta(`${index +1}: ${task}`));
    })
}

// function to delete a task from the list
let deleteTask = async() => {
    await viewTask()
    let indexTask = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow("\n Enter the 'index no' of the task you want to delete \n")
        }
    ]);
    let deletedTask = todolist.splice(indexTask.index -1, 1) // => (1) only delete one value
    console.log(chalk.green(`\n \'${deletedTask}\' this task has been deleted successfully from your To-do list \n`));

}
// Function to update a task
let updateTask = async() => {
    await viewTask()
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow("\n Enter the 'index no' of the task you want to update \n")
        },
        {
            name: "newTask",
            type: "input",
            message: chalk.yellow("\n Enter new task name:")
        }
    ])
    todolist[update_task_index.index -1] = update_task_index.newTask
    console.log(chalk.green(`Task at index no: ${update_task_index.index} updated successfully [For updated list check "view to-do list"]`));
}
main();
