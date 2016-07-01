var Todo = {
    tasks:[],
    init:function(){
    this.render();
    },
    makeTaskHTML: function(task) {
    var checkClass = '',
        checkChecked = '';
    if (task.done) {
        checkClass = 'done';
        checkChecked = 'checked';
    }
    var html = '' +
        '<li class="task ' + checkClass + '" data-task-id="' + task.id + '">' +
            '<input class="task-done" type="checkbox" ' + checkChecked + ' />' +
            task.name +
            '<button class="task-del">-</button>' +
        '</li>';
    return html;},
    render: function() {
    var listHTML = '';
    this.tasks.forEach(function(task) {
        listHTML += this.makeTaskHTML(task);
    }, this);
    $('.task-list').html(listHTML);
},
addTaskFormSubmitted: function(form) {
    var taskField = form.elements.task;
    if (taskField.value.length) {
        this.addTask(taskField.value);
        taskField.value = '';
        this.render();
    }
},
addTask: function(task) {
    var lastTask,
        id = 1;
    if (this.tasks.length) {
        lastTask = this.tasks[0];
        id = lastTask.id + 1;
    }
    var newTask = {
        id: id,
        name: task,
        done: false
    };
    this.tasks.splice(0, 0, newTask);
},
toggleTask: function(el) {
    var task = this.findTask(el);
    task.done = !task.done;
    this.render();
},
findTask: function(taskEl) {
    var task,
        parent = $(taskEl).parent(),
        id = parent.attr('data-task-id');
    this.tasks.forEach(function(thisTask){
        if (thisTask.id == id) {
            task = thisTask;
         }
    });
    return task;
},
deleteTask: function(el) {
    var task = this.findTask(el),
    taskIndex = this.tasks.indexOf(task);
    this.tasks.splice(taskIndex, 1);
    this.render();
}
};
$(document).ready(function(){
    Todo.init();
});
$('form.task-entry-form').submit(function(event){
    event.preventDefault();
    Todo.addTaskFormSubmitted(this);
});
$(document).on("click", ".task-done", function(event) {
    Todo.toggleTask(this);
});
$(document).on("click", ".task-del", function(event) {
    Todo.deleteTask(this);
});
