const name = document.getElementById('name');
const age = document.getElementById('age');
const gen = document.getElementById('gen');
const feet = document.getElementById('feet');
const inch = document.getElementById('inch');
const kg = document.getElementById('kg');

const submit = document.getElementById('submit');
const update = document.getElementById('update');


function validate() {
    if (name.value == '') {
        return false;
    }
    if (age.value == '' || age.value < 1) {
        return false;
    }
    if (gen.value == '') {
        return false;
    }
    if ((feet.value == '' && inch.value == '')) {
        return false;
    }
    if (kg.value == '') {
        return false;
    }
    return true;
}

var meterval = 0, bmival = 0, health = '';

submit.addEventListener('click', () => {
    if (validate()) {
        if(feet.value==''){
            feet.value=0;
        }
        if(inch.value==''){
            inch.value=0;
        }
        meterval = (parseFloat(feet.value) * 0.3048 + parseFloat(inch.value) * 0.0254).toFixed(2);
        bmival = (parseFloat(kg.value) / Math.pow(meterval, 2)).toFixed(2);
        if (bmival < 18.5) {
            health = 'underwait';
        }
        else if (bmival >= 18.5 && bmival <= 24.9) {
            health = 'normal wait';

        }
        else if (bmival >= 25.0 && bmival <= 29.9) {
            health = 'pre-obesity';
        }
        else {
            health = 'overweight';
        }

        let data = localStorage.getItem("data");
        if (data == null) {
            dataObj = [];
        }
        else {
            dataObj = JSON.parse(data);
        }

        let hval = `${feet.value}'${inch.value}"`;

        dataObj.push({
            "name": name.value,
            "age": age.value,
            "gender": gen.value,
            "height": hval,
            "weight": kg.value,
            "bmi": bmival,
            "condition": health,
        });
        localStorage.setItem("data", JSON.stringify(dataObj));
        name.value = ''; age.value = ''; gen.value = ''; feet.value = ''; inch.value = ''; kg.value = '';
        showdata();
    }
    else {
        alert("Sorry, please provide all the details correctly");
        return;
    }
})



function showdata() {
    let data = localStorage.getItem("data");
    if (data == null) {
        dataObj = [];
    }
    else {
        dataObj = JSON.parse(data);
    }
    let html = '';
    dataObj.forEach((element, index) => {
        html += `<div class="card datacard my-2 mx-2" style="width: 22rem;">
    <div class="card-body">
        <h5 class="card-title green" id="title">${element.name}</h5>
        <p class="card-text">Age:&nbsp;&nbsp;${element.age} years</p>
        <p class="card-text">Gender:&nbsp;&nbsp;${element.gender}</p>
        <p class="card-text">Height:&nbsp;&nbsp;${element.height}</p>
        <p class="card-text">Weight:&nbsp;&nbsp;${element.weight} Kg</p>
        <p class="card-text">BMI:&nbsp;&nbsp;${element.bmi} Kg/m<sup>2</sup></p>
        <p class="card-text">Health Condition:&nbsp;&nbsp;<strong>${element.condition}</strong></p>
        <button type="button" class="btn btn-danger" onclick="Delete(${index})">Delete</button>
        <button type="button" class="btn btn-warning" onclick="Edit(${index})">Edit</button>
    </div>
</div>`;
    });
    if(dataObj.length!=0){
        document.getElementById('data').innerHTML = html;
    }
    else{
        document.getElementById('data').innerHTML=`<div class="alert alert-warning" role="alert">
        Nothing to show,please fill the above forms
      </div>`;
    }
}

document.onload = showdata();

function Delete(index) {
    let data = localStorage.getItem("data");
    if (data == null) {
        dataObj = [];
    }
    else {
        dataObj = JSON.parse(data);
    }
    dataObj.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(dataObj));
    showdata();
}


function Edit(index) {
    submit.style.display = 'none';
    update.style.display = 'block';
    let data = localStorage.getItem("data");
    if (data == null) {
        dataObj = [];
    }
    else {
        dataObj = JSON.parse(data);
    }
    name.value = dataObj[index].name;
    age.value = dataObj[index].age;
    gen.value = dataObj[index].gender;
    feet.value = dataObj[index].height.substring(0, 1);
    inch.value = dataObj[index].height.substring(2, dataObj[index].height.length - 1);
    kg.value = dataObj[index].weight;

    update.addEventListener('click', () => {
        if (validate() == true) {
            if(feet.value==''){
                feet.value=0;
            }
            if(inch.value==''){
                inch.value=0;
            }
            meterval = (parseFloat(feet.value) * 0.3048 + parseFloat(inch.value) * 0.0254).toFixed(2);
            bmival = (parseFloat(kg.value) / Math.pow(meterval, 2)).toFixed(2);
            if (bmival < 18.5) {
                health = 'underwait';

            }
            else if (bmival >= 18.5 && bmival <= 24.9) {
                health = 'normal wait';
    
            }
            else if (bmival >= 25.0 && bmival <= 29.9) {
                health = 'pre-obesity';

            }
            else {
                health = 'overweight';

            }

            let heival = `${feet.value}'${inch.value}"`;
            dataObj[index].name = name.value;
            dataObj[index].age = age.value;
            dataObj[index].gender = gen.value;
            dataObj[index].height = heival;
            dataObj[index].weight = kg.value;
            dataObj[index].bmi = bmival;
            dataObj[index].condition = health;
            localStorage.setItem('data',JSON.stringify(dataObj));
            name.value = ''; age.value = ''; gen.value = ''; feet.value = ''; inch.value = ''; kg.value = '';
            submit.style.display = 'block';
            update.style.display = 'none';
            showdata();
        }
        else {
            alert("Sorry, please provide all the details correctly");
            return;
        }
    })
}

document.getElementById('search').addEventListener('input',()=>{
    let searchval=document.getElementById('search').value.toLowerCase();
    let data=Array.from(document.getElementsByClassName('datacard'));
    data.forEach((element)=>{
        let text=element.querySelector('.card-title').innerText.toLowerCase();
        if(text.includes(searchval)){
            element.style.display='block';
        }
        else{
            element.style.display='none';
        }
    })
})