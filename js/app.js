
// load the data from the local storage on load of page
$(document).ready(function(){
    if (localStorage.getItem("added-items") === null) {
        localStorage.setItem('added-items', JSON.stringify(data));
    }
});

// this handles the dropdown
$("#dropdown").on("click", function(e){
  if($(this).hasClass("open")) {
    $(this).removeClass("open");
    $(this).children("ul").slideUp("fast");
  } else {
    $(this).addClass("open");
    $(this).children("ul").slideDown("fast");
  }
});
            
$("#dropdown li a").on('click', function(e){
    $("#dropdown div")[0].innerText = $(this)[0].innerText;
});


// action on click of login button
$('.loginbtn').on("click",function(e){
    e.preventDefault();
    
    // fetch the value of username and role from here
    
    var user_id = $('#txtUserName')[0].value.toLowerCase(),
        role = $("#dropdown div")[0].innerText.toLowerCase();
    
    var added_items = JSON.parse(localStorage.getItem('added-items'));
    
    // storing in local, the current session values 
    if(user_id != "null"){
        added_items.session_info.id = user_id;
        added_items.session_info.role = role;
        localStorage.setItem('added-items', JSON.stringify(added_items));  
    }
    
    // open page based on roles
    
    if(role == "doctor"){
        var url = $(this).data('target-doctor');
        location.replace(url);
    }
    
    else if(role == "patient"){
        var url = $(this).data('target-patient');
        location.replace(url);
    }
    
    else {
        var url = $(this).data('target-pharmacist');
        location.replace(url);
    }
    
});