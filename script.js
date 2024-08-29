    
    let btnAdd = document.getElementById('btn_new_task')
    let btnDeleteTasks = document.getElementById('delete_tasks') 
    let chek = 1
    let nameTask = document.getElementById('name_task'),
    descTask = document.getElementById('desc_task')
    
    const tasks = document.getElementById('tasks')
    btnAdd.addEventListener('click', e=>{
        if(descTask.value == ''){
            alert('вы не ввели описание задачи')
        }
        else{
            addNewTask(nameTask.value,descTask.value,chek);
            getTasks()
            nameTask.value = ''
            descTask.value = ''
            chek++
        }
    })

    btnDeleteTasks.addEventListener('click', e=>{
        localStorage.clear()
        chek = 1
        let allTask = document.getElementsByClassName('task')
        while (allTask.length) {
            allTask[0].parentNode.removeChild(allTask[0]);
          }
    })

    function addNewTask(name,desc,id){
        if(name == '') name = 'без названия'
        const task = {
            id,
            name,
            desc
        }
        localStorage.setItem(`task${id}`, JSON.stringify(task))

    }
    function getTasks(){
        const tasks = document.getElementById('tasks')
        const taskNew = document.createElement('div')
        for(let key=1; key<=localStorage.length; key++){
            taskNew.classList.add(`task`)
            taskNew.setAttribute('id',`task${key}`)
            const allTasks = localStorage.getItem(`task${key}`)
            const taskList = JSON.parse(allTasks)
            taskNew.innerHTML = `
                <h2 class="nameTask">${taskList.name}</h2>
                <p class="descTask">${taskList.desc}</p>
                
                <button id="btn_change" onclick="chacge(${taskList.id})" class="btn_change">Редактировать</button>
                <button class="close">&#x2718</button>
            `
            
        }
        tasks.appendChild(taskNew);
    }
    
    tasks.addEventListener('click', function(event) {
        if(event.target.closest('.close'))
            event.target.closest('.task').remove()
            
    })
    
    
    function chacge(id_change_task){
        const taskChange = localStorage.getItem(`task${id_change_task}`)
        const taskList = JSON.parse(taskChange)
        nameTask.value = taskList.name
        descTask.value = taskList.desc
        btnAdd.disabled = true
        const task = document.getElementById(`task${id_change_task}`)
        const btnSave = document.createElement('button')
        btnSave.innerHTML = `Сохранить`
        btnSave.classList.add('btn_save_change')
        btnSave.setAttribute('id', id_change_task)
        task.appendChild(btnSave);
        btnSave.addEventListener('click', function(){
            saveChange(id_change_task)
            this.remove()
        })
    }

    function saveChange(id_save_task){
        const taskSave = localStorage.getItem(`task${id_save_task}`)
        const taskList = JSON.parse(taskSave)
        taskList.name = nameTask.value
        taskList.desc = descTask.value
        localStorage.setItem(`task${id_save_task}`, JSON.stringify(taskList))
        btnAdd.disabled = false
        const oldTask = document.getElementById(`task${id_save_task}`)
        oldTask.remove()
        getTasks()
        nameTask.value = ''
        descTask.value = ''
    }



