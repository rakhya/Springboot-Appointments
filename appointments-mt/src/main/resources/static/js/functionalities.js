$(document).ready(function(){
    $("#newbtn").click(function(){
    	$("#addApps").slideToggle("slow");
    	$("#newdiv").hide();
    });
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
    
    $('#date').on('input', function() {
    	var input=$(this);
    	var is_name=input.val();
    	if(is_name){input.removeClass("invalid").addClass("valid");}
    	else{input.removeClass("valid").addClass("invalid");}
    });

    $('#time').on('input', function() {
    	var input=$(this);
    	var is_name=input.val();
    	if(is_name){input.removeClass("invalid").addClass("valid");}
    	else{input.removeClass("valid").addClass("invalid");}
    });

    $('#descinput').on('input', function() {
    	var input=$(this);
    	var is_name=input.val();
    	if(is_name){input.removeClass("invalid").addClass("valid");}
    	else{input.removeClass("valid").addClass("invalid");}
    });
    
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
    
function ajaxPost(appData){
		
		$.ajax({
			type : "POST",
			contentType : "application/json",
			data : JSON.stringify(appData),
			dataType : 'json',
			url : window.location + "api/add/appointment",
			success : function(result) {
				if(result.status == "Done"){
					console.log("successfully posted done")
					/*$("#postResultDiv").html("<p style='background-color:#7FA7B0; color:white; padding:20px 20px 20px 20px'>" + 
												"Post Successfully! <br>" +
												"---> Customer's Info: FirstName = " + 
												result.data.firstname + " ,LastName = " + result.data.lastname + "</p>");*/
				}else{
					console.log("sucessfully posted")
					//$("#postResultDiv").html("<strong>Error</strong>");
				}
				console.log(result);
			}/*,
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}*/
		});
		
		// Reset FormData after Posting
		//resetData();

	}

//GET REQUEST
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
		else{
			console.log("size of array: "+result.length);
		}				
	},
	error : function(e) {
		alert("There is an error: ", e);
	}
});


$("#descsearch").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#searchbtn").click();
    }
});
    
    
});