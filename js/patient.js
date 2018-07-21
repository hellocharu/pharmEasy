// created table from the data from local storage
function CreateTableFromJSON(TABLE_DATA) {
    
    var patients_data = TABLE_DATA.user_data.patient,
        current_patient,
        tbody_pendingRequests = document.createElement("tbody"),
        tbody_approvedRequests = document.createElement("tbody"),
        prescriptions,
        pending_requests = [],
        approved_requests = [];
    
    
    // finding the logged in patient
    for(var i =0; i< patients_data.length; i++){
        if(patients_data[i].id == TABLE_DATA.session_info.id){
            current_patient = patients_data[i];
        }
    }
    
    // adding the specific user heading
    document.querySelector('.container h1 span').innerHTML = current_patient.name + ",";
    
    //storing the prescriptions
    prescriptions = current_patient.prescriptions;
    
    //iterating through the prescriptions under the patient's name and showing their status
    for(var i=0; i< prescriptions.length; i++){
        
        var doctor_data = prescriptions[i].action.doctors,
            pharmacist_data = prescriptions[i].action.pharmacist,
            prescription_name = prescriptions[i].prescription,
            prescription_id = prescriptions[i].id;
        
        // iterating through doctor's data
        for(var j=0;j<doctor_data.length;j++){

            if(doctor_data[j].status == "pending"){
                // add to pending list
                var requested_by_id = doctor_data[j].doctor_id;
                pending_requests.push({prescription_id,prescription_name,requested_by_id,approve_cta:"approve"})
                
            }
            
            else if(doctor_data[j].status == "approved"){
                // add to pending list
                var requested_by_id = doctor_data[j].doctor_id;
                approved_requests.push({prescription_id,prescription_name,requested_by_id,status:"approved"})
            }
            
        }
        
        // iterating through pharmacist's data
        
        for(var j=0;j<pharmacist_data.length;j++){

            if(pharmacist_data[j].status == "pending"){
                // add to pending list
                var requested_by_id = pharmacist_data[j].pharmacist_id;
                pending_requests.push({prescription_id,prescription_name,requested_by_id,approve_cta:"approve"})
                
            }
            
            else if(pharmacist_data[j].status == "approved"){
                // add to pending list
                var requested_by_id = pharmacist_data[j].pharmacist_id;
                approved_requests.push({prescription_id,prescription_name,requested_by_id,status:"approved"})
            }
            
        }
        
    }
    
    // populating the pending requests
    for(var i=0;i<pending_requests.length;i++){
        var tr = tbody_pendingRequests.insertRow(-1);
        for(var key in pending_requests[i]){
            var tabCell = tr.insertCell(-1);
            if(key == "approve_cta"){
                var cta = document.createElement("button");
                cta.innerHTML = "Approve";
                tabCell.appendChild(cta);
            }
            else{
                tabCell.innerHTML = pending_requests[i][key];  
            }
        }
    }
    
    //populating approved requests
    for(var i=0;i<approved_requests.length;i++){
        var tr = tbody_approvedRequests.insertRow(-1);
        for(var key in approved_requests[i]){
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = approved_requests[i][key]; 
        }
    }
    
     var divContainer = document.getElementsByClassName("table")[0];
        divContainer.appendChild(tbody_pendingRequests);
    
     var divContainer1 = document.getElementsByClassName("table")[1];
        divContainer1.appendChild(tbody_approvedRequests);
        return false;
    
}

// this function creates the table by fetching data from local storage
CreateTableFromJSON(JSON.parse(localStorage.getItem('added-items')));


// this function modifies table
function modifyTable(data,prescription_id,requested_by){
    var current_patient_id = data.session_info.id;
    
    for(var i=0; i< data.user_data.patient.length;i++){
        
       if(data.user_data.patient[i].id == current_patient_id){
           //var prescriptions = data.user_data.patient[i].prescriptions;
           
           for(var j=0; j<data.user_data.patient[i].prescriptions.length; j++){
              if(data.user_data.patient[i].prescriptions[j].id == prescription_id){
                    if(requested_by.includes("doctor") == true){
                       for(var k=0; k<data.user_data.patient[i].prescriptions[j].action.doctors.length; k++){
                         if(data.user_data.patient[i].prescriptions[j].action.doctors[k].doctor_id == requested_by){
                             data.user_data.patient[i].prescriptions[j].action.doctors[k].status = "approved";
                         }
                        } 
                    }else{
                        for(var k=0; k<data.user_data.patient[i].prescriptions[j].action.pharmacist.length; k++){
                         if(data.user_data.patient[i].prescriptions[j].action.pharmacist[k].pharmacist_id == requested_by){
                             data.user_data.patient[i].prescriptions[j].action.pharmacist[k].status = "approved";
                         }
                        } 
                    }
                    
              } 
           }
       }
    }
    localStorage.setItem('added-items', JSON.stringify(data));
}

// handling onclick of approve button approved
$('button').on('click',function(e){
    e.preventDefault();
    var $cells = $(this).parents('tr')[0].cells;

    var prescription_id = $cells[0].innerHTML,
        requested_by = $cells[2].innerHTML;
    
    // this function modifies the content of table based on new data
    modifyTable(JSON.parse(localStorage.getItem('added-items')),prescription_id,requested_by);
    window.location.reload(false); 

});