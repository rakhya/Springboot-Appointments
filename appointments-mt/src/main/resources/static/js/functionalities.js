$(document).ready(function(){
	
	//New button
    $("#newbtn").click(function(){
    	$("#addApps").slideToggle("slow");
    	$("#newdiv").hide();
    });
    
  //Cancel button
    $("#cancelbtn").click(function(event){
		event.preventDefault();
    	$("#addApps").hide();
    	$("#newdiv").show();
		$('form .form-control').each(function() {
			$(this).val('');
			$(this).removeClass().addClass("form-control");
			$(this).next("span").removeClass("error_show").addClass("error");
});
    });
    
    //Validation time
    $('#time').on('input', function() {
    	var input=$(this);
    	var is_name=input.val();
    	if(is_name){input.removeClass("invalid").addClass("valid");}
    	else{input.removeClass("valid").addClass("invalid");}
    });

    //Validation description
    $('#descinput').on('input', function() {
    	var input=$(this);
    	var is_name=input.val();
    	if(is_name){input.removeClass("invalid").addClass("valid");}
    	else{input.removeClass("valid").addClass("invalid");}
    });
    
    //Add button
    $("#addbtn").click(function(event){
    	var error_free=true;
    	$('form input').each(function(){
    		var valid=$(this).hasClass("valid");
    		var error_element=$(this).next("span");
    		if (!valid){error_element.removeClass("error").addClass("error_show"); error_free=false;}
    		else{error_element.removeClass("error_show").addClass("error");}
    		
    	});
    	
    	if (!error_free){
    		event.preventDefault(); 
    	}
    	else{
    		alert('No errors: Form data will be submitted');
    	}
    });
    

//AJAX GET Appointments
$("#searchbtn").click(function(){
	var desc = $("#descsearch").val().trim();
	if(desc==""){
		$('#descsearch').val('');
	}
	ajaxGet(desc);
});

// DO GET
function ajaxGet(desc){
	$.ajax({
		type : "GET",
		url : "http://localhost:8080/api/appointments/"+desc,
		success: function(result){
			if(result.length>0){
				$("#appsDiv").show();
				$("#noApps").hide();
				$("#appsTable").find("tr:gt(0)").remove();
				$.each(result, function (index, value) {
				$("#appsTable tr:last").after("<tr><td>"+value.date+"</td><td>"+value.time+"</td><td>"+value.description+"</td></tr>");
			});
			}else{
				$("#noApps").show();
				$("#appsDiv").hide();
				$("#noAppText").html("No appointments available for the given user input!");
			}
		},
		error : function(e) {
			alert("There is an error: ", e);
		}
	});	
}

//Get Appointments on home page load
$.ajax({
	type : "GET",
	url : window.location + "api/appointments",
	success: function(result){
		if(result.length>0){
			$("#noApps").toggle();
			$("#appsDiv").toggle();
			$.each(result, function (index, value) {
				$("#appsTable tr:last").after("<tr><td>"+value.date+"</td><td>"+value.time+"</td><td>"+value.description+"</td></tr>");
			});
		}			
	},
	error : function(e) {
		alert("There is an error: ", e);
	}
});

//Enter key to search for description
$("#descsearch").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#searchbtn").click();
    }
});

//date picker and validation
$( function() {
    $("#date").datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: 'M dd, yy'
    }).on('change', function() {
        if($(this).val()!=""){
        	$(this).removeClass("invalid").addClass("valid");
        }
        else{
        	$(this).removeClass("valid").addClass("invalid");
        }
    });
  });
    
});