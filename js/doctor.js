// created table from the data from local storage
function CreateTableFromJSON(TABLE_DATA) {
    var doctors_data = TABLE_DATA.user_data.doctor,
        patients_data = TABLE_DATA.user_data.patient,
        current_doctor,
        prescription_id,
        tbody = document.createElement("tbody"),
        col = [];
     
    // finding the logged in doctor
    for(var i=0;i<doctors_data.length;i++){
        if(doctors_data[i].id == TABLE_DATA.session_info.id){
            current_doctor = doctors_data[i];
        }
    }
    
    // adding the specific user heading
    document.querySelector('.container h1 span').innerHTML = current_doctor.name + ",";
    
    // add data based on the current user(doctor) and the patients under it and their documents
    for(var i=0;i<current_doctor.patients.length;i++){
        var patient_id = current_doctor.patients[i];
        
        for(var k=0;k<patients_data.length;k++){
            if(patient_id == patients_data[k].id){
                var prescriptions = patients_data[k].prescriptions;
                var prescription_array= [];
                for(var m=0; m<prescriptions.length;m++){
                    var prescription_name = prescriptions[m].prescription;
                    
                    prescription_id  =  prescriptions[m].id;
                    
                    var doctors = prescriptions[m].action.doctors
                    var patient_name = patients_data[k].name
                    for(var p=0;p<doctors.length;p++){
                        if(current_doctor.id == doctors[p].doctor_id){
                            var status = doctors[p].status; 
                            col.push({patient_id,patient_name,prescription_name,status});
                        }
                    }

                }
            }
        }
    }
    
    // create table dynamically based on data pushed in col variable
    for(var i=0;i<col.length;i++){
        var tr = tbody.insertRow(-1);
        for(var key in col[i]){
            var tabCell = tr.insertCell(-1);
            if(key == "status" && col[i][key] == ""){
               var cta = document.createElement('button');
                cta.classList.add("request-cta");
                cta.innerHTML = "request"
                tabCell.appendChild(cta)
            }
            else if(key == "status" && col[i][key] == "approved"){
                var anchor = document.createElement('a');
                anchor.innerHTML = "View Document"
                tabCell.appendChild(anchor);
            }
            else if(key== "prescription_name"){
                var prescription_id_element = document.createElement('p');
                var prescription_name_element = document.createElement('p');
                
                prescription_id_element.classList.add("hidden");
                prescription_id_element.innerHTML = prescription_id;
                
                prescription_name_element.innerHTML = col[i][key];
                prescription_name_element.classList.add("document-name");
                tabCell.appendChild(prescription_name_element);
                tabCell.appendChild(prescription_id_element);
            }
            else
            tabCell.innerHTML = col[i][key]; 
        }
    }
    
        
    
    var divContainer = document.getElementsByClassName("table")[0];
        divContainer.appendChild(tbody);
}


// this creates table from the data in local storage
CreateTableFromJSON(JSON.parse(localStorage.getItem('added-items')));

// this function modifies the content of table based on new data i.e. after click of request button
function modifyTable(data,patient_id,prescription_id){
    var current_doctor_id = data.session_info.id;
    
    for(var i=0; i< data.user_data.patient.length;i++){
        
       if(data.user_data.patient[i].id == patient_id){
           //var prescriptions = data.user_data.patient[i].prescriptions;
           
           for(var j=0; j<data.user_data.patient[i].prescriptions.length; j++){
              if(data.user_data.patient[i].prescriptions[j].id == prescription_id){
                   for(var k=0; k<data.user_data.patient[i].prescriptions[j].action.doctors.length; k++){
                     if(data.user_data.patient[i].prescriptions[j].action.doctors[k].doctor_id == current_doctor_id){
                         data.user_data.patient[i].prescriptions[j].action.doctors[k].status = "pending";
                     }
                    }
              } 
           }
       }
    }
    localStorage.setItem('added-items', JSON.stringify(data));
}

// handling onclick of approve button approved
$('.request-cta').on('click', function(e){
    e.preventDefault();
    var $cells = $(this).parents('tr')[0].cells;

    var patient_id = $cells[0].innerHTML,
        prescription_id = $cells[2].querySelector('.hidden').innerHTML;
    
// this function modifies the content of table based on new data
     modifyTable(JSON.parse(localStorage.getItem('added-items')),patient_id,prescription_id);
    window.location.reload(false); 
});