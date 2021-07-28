//Creador de tareas
function Tasks() {
    this.fullTasks = [];

    this.newTask = (event) => {
        event.preventDefault();
        
        //checklist DIV
        const checklistDiv = document.createElement('div');
        checklistDiv.classList.add('checklist');
        checklistList.appendChild(checklistDiv);
        //Creador LI
        const newchecklist = document.createElement('li');
        checklistInput.value = checklistInput.value.trim()
        newchecklist.innerText = checklistInput.value;
        newchecklist.classList.add('checklist-item');
        checklistDiv.appendChild(newchecklist);
        //Boton de check
        const completedButton = document.createElement('button');
        completedButton.innerHTML = `<i class='fas fa-check'></i>`;
        completedButton.classList.add('check-btn');
        checklistDiv.appendChild(completedButton);
        completedButton.id = checklistInput.value;
        //Boton de Basura
        const trashButton = document.createElement('button');
        trashButton.innerHTML = `<i class='fas fa-trash'></i>`;
        trashButton.classList.add('trash-btn');
        checklistDiv.appendChild(trashButton); 
        //Limpiar el input 
        checklistInput.value ='';

        this.fullTasks.push({"nombre" : newchecklist.innerText, "estado" : false})

        this.buttonsEvents();
        this.saveStorage();
    }


//Botones de check y trash 
    this.buttonsEvents = () => {
        $(".trash-btn").off('click');
        
        $(".check-btn").click(function(){
            $(this).parent().addClass("completed");
            let changeState = myTasks.fullTasks.find(task => $(this)[0].id == task.nombre);
            changeState.estado = true;
            myTasks.saveStorage();
        });

        $(".trash-btn").click(function(){
            let deleteTask = myTasks.fullTasks.findIndex(task => $(this).parent()[0].innerText == task.nombre);
            myTasks.fullTasks.splice(deleteTask, 1);
            $(this).parent().hide(500, function() {$(this).remove();})
            myTasks.saveStorage();
        });
    }

//Local Storage
    this.saveStorage = () => {
        localStorage.setItem('todasLasTasks', JSON.stringify(this.fullTasks))
    }

    this.loadStorage = () => {
        if(localStorage.getItem('todasLasTasks')) {
            myTasks.fullTasks = JSON.parse(localStorage.getItem('todasLasTasks'));
            
            let checklistList = $(".checklist-list");
            myTasks.fullTasks.forEach((task) => {
                
                if(task.estado) {
                    checklistList.append(`
                                    <div class="checklist completed">
                                        <li class="checklist-item">${task.nombre}</li>
                                        <button id="${task.nombre}" class="check-btn">
                                            <i class='fas fa-check'></i>
                                        </button>
                                        <button class="trash-btn">
                                            <i class='fas fa-trash'></i>
                                        </button>
                                    `);
                } else {
                    checklistList.append(`
                                    <div class="checklist">
                                        <li class="checklist-item">${task.nombre}</li>
                                        <button id="${task.nombre}" class="check-btn">
                                            <i class='fas fa-check'></i>
                                        </button>
                                        <button class="trash-btn">
                                            <i class='fas fa-trash'></i>
                                        </button>
                                    `);
                }
            });
            
            this.buttonsEvents();
        }
    }
}