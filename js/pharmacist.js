function CreateTableFromJSON(TABLE_DATA) {
    var pharmacist_data = TABLE_DATA.user_data.pharmacist,
        patients_data = TABLE_DATA.user_data.patient,
        current_pharmacist,
        tbody = document.createElement("tbody"),
        col = [],
        status,
        check = "false",
        prescription_id;
     
    
    for(var i=0;i<pharmacist_data.length;i++){
        if(pharmacist_data[i].id == TABLE_DATA.session_info.id){
            current_pharmacist = pharmacist_data[i];
        }
    }
        
    document.querySelector('.container h1 span').innerHTML = current_pharmacist.name + ",";
    
    for(var k=0;k<patients_data.length;k++){
            var prescriptions = patients_data[k].prescriptions;
            var prescription_array= [];
            for(var m=0; m<prescriptions.length;m++){
                var prescription_name = prescriptions[m].prescription;
                    prescription_id  =  prescriptions[m].id;
                var pharmacist = prescriptions[m].action.pharmacist
                var patient_name = patients_data[k].name,
                    patient_id = patients_data[k].id; 
                
                for(var p=0;p<pharmacist.length;p++){
                    if(current_pharmacist.id == pharmacist[p].pharmacist_id){
                        check = "true";
                        status = pharmacist[p].status;
                    }
                }
                
                if(check == "true"){
                    col.push({patient_id,patient_name,prescription_name,status});
                }
                
                else {
                   status = "";
                   col.push({patient_id,patient_name,prescription_name,status});
                }
                
                check = "false";
            }
    }
    
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

CreateTableFromJSON(JSON.parse(localStorage.getItem('added-items')));

function modifyTable(data,patient_id,prescription_id){
    var current_pharmacist_id = data.session_info.id;
    
    for(var i=0; i< data.user_data.patient.length;i++){
        
       if(data.user_data.patient[i].id == patient_id){
           
           for(var j=0; j<data.user_data.patient[i].prescriptions.length; j++){
              if(data.user_data.patient[i].prescriptions[j].id == prescription_id){
                  data.user_data.patient[i].prescriptions[j].action.pharmacist.push({pharmacist_id : current_pharmacist_id, status : "pending"});
              } 
           }
       }
    }
    localStorage.setItem('added-items', JSON.stringify(data));
}


$('.request-cta').on('click', function(e){
    e.preventDefault();
    var $cells = $(this).parents('tr')[0].cells;

    var patient_id = $cells[0].innerHTML,
        prescription_id = $cells[2].querySelector('.hidden').innerHTML;
    

    modifyTable(JSON.parse(localStorage.getItem('added-items')),patient_id,prescription_id);
    window.location.reload(false); 
});