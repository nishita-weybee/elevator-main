const numOfElevator = prompt('Enter the number of elevator');
const numOfFloor = prompt('Enter the number of floor');

const elevator = numOfElevator;
const floor = numOfFloor;
const height = 100;
const width = 150;

let elevatorArr = [];
for (i = 0; i < elevator; i++) {
    elevatorArr.push({ id: i + 1, active: false, at: 1 });
}

const elevatorBody = document.querySelector('.elevator');
const liftBtn = document.querySelector('.lift-btn');
elevatorBody.style.height = `${floor * 100 + 100}px`;
elevatorBody.style.width = `${width * elevator + 250}px`;

for (let i = 1; i <= elevator; i++) {
    let html = `
    <div class="lift-container" style="height: ${floor * height + 100}px +  ; width: ${width}px">
        <div class="single-lift" style="height: ${floor * height}px; width: ${width}px" >
            <div class="compartment" id="compartment-${i}" style="height: ${height}px; width: ${width}px; top:${floor * 100 - 100}px">1</div>
        </div>
        <label class="switch">
            <input type="checkbox" class="btn-1"  id="${i}"  onclick="maintenance(${i})">
            <span class="slider round"></span>
        </label>
    </div>`;
    elevatorBody.insertAdjacentHTML("afterbegin", html);
}

for( let i = 1; i<=floor; i++ ){
     let topBtn =  `
     <div class="floor">
        <span class="number">${i}</span>
        <button class="btn" id="up-${i}" onclick="movement(id)"> <i class="fa-solid fa-caret-up"></i></button>
     </div>
     `;

     let bottomBtn = `
     <div class="floor">
        <span class="number">${i}</span>
        <button class="btn" id="down-${i}" onclick="movement(id)"><i class="fa-solid fa-caret-down"></i></button>
     </div>
     `;

     let btn = `
     <div class="floor">
        <span class="number">${i}</span>
        <button class="btn" id="up-${i}" onclick="movement(id)"> <i class="fa-solid fa-caret-up"></i>
        </button>
        <button class="btn" id="down-${i}" onclick="movement(id)"> <i class="fa-solid fa-caret-down"></i>
        </button>
     </div>
     `;

    if(i === 1 ){
        liftBtn.insertAdjacentHTML("afterbegin",topBtn);
    }else if(i === floor){
        liftBtn.insertAdjacentHTML("afterbegin",bottomBtn);
    }else{
        liftBtn.insertAdjacentHTML("afterbegin",btn);
    }
}

const movement = id => {
    btnPressed = Number(id.slice(-1));
    let minDistance = elevatorArr.map(elevator => Math.abs(elevator.at - btnPressed))
    let num = minDistance.indexOf(Math.min(...minDistance));
    let index = elevatorArr.map(elevator => elevator.id).indexOf(elevatorArr[num].id);
    let compartment = document.querySelector(`#compartment-${elevatorArr[index].id}`);

    let flow = null;
    let elevatorON = floor - elevatorArr[index].at;
    let floorON = floor - btnPressed;
    let position = elevatorON * height;
    clearInterval(flow);
    flow = setInterval(elevatorSlide, 5);
    
 
    function elevatorSlide() {
        if (elevatorON - floorON > 0) {
            if (position == floorON * height) {
                clearInterval(flow);
            } else {
                position--;
                compartment.style.top = position + "px";
                compartment.innerHTML = `${floor - Math.round(position / 100)}`;
            }
        }
        else {
            if (position == floorON * height) {
               
                clearInterval(flow);
            } else {
                position++;
              
                compartment.style.top = position + "px";
                compartment.innerHTML = `${floor - Math.round(position / 100)}`;
            }
        }
    }
    elevatorArr[index].at = btnPressed; 
}


const maintenance = liftId => {
    let elevator = document.getElementById(liftId);
    let index = elevatorArr.map(elevator => elevator.id).indexOf(liftId);

   
    if (elevator.checked) {
        elevatorArr[index].active = elevator.checked;
        let compartment = document.getElementById(`compartment-${elevatorArr[index].id}`);
        let slide = null;
        let position = (floor - elevatorArr[index].at) * height;
        clearInterval(slide);
        slide = setInterval(maintananceMode, 5);
        function maintananceMode() {
            if (position == (floor - 1) * 100){
                clearInterval(slide);
            }
            else {
                position++;
                compartment.style.top = position + "px";
                compartment.innerHTML = `${floor - Math.round(position / 100)}`;
            }
        }
        elevatorArr[index].elevatorOn = 1;
        compartment.style.border = "1px solid red";
        elevatorArr.splice(index, 1);
    }


    else {
        elevatorArr.push({ id: liftId, active: false, at: 1 });
        index = elevatorArr.map(elevator => elevator.id).indexOf(liftId);
        console.log(index);
        let compartment = document.getElementById(`compartment-${elevatorArr[index].id}`);
        console.log(compartment);
        compartment.style.border = "none";
    }
}



