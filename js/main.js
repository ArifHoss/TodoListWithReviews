Vue.component('todo-container', {
    data: function () {
        return {
            todos: []
        }

    },

    template: `
      <div>
      <form v-on:submit.prevent="addNewTodo">
        <lable for="adpt"></lable>
        <input v-model="newTime" id="adpt" type="time" required>
        <input v-model="newTodoText" id="new-todo" placeholder="E.G.Submit lab..." required>
        <button>Add</button>
      </form>
      <ul>
        <li
            v-for="(todo,index) in todos"
            v-bind:style="{color:todo.prioColor}"
        >
          {{ todo.time }}
          {{ todo.title }}
          {{ todo.prio }}
          <button v-on:click="todos.splice(index,1)">Done</button>
          <button v-on:click="changePrio(index)">Change Prio</button>
        </li>
      </ul>
      </div>
    `,

    methods: {
        addNewTodo: function () {
            this.todos.push({
                id: this.nextTodoId++,
                time: this.newTime,
                title: this.newTodoText,
                prio: 0
            })

        },
        changePrio: function (selected) {
            this.todos[selected].prio += 1
            this.todos[selected].prioColor = 'blue'

        }
    },
})

new Vue({
    el: '#todo-list-link'
})