//Form Logic

function firstNameCheck() {
    var validatedFirstName = document.forms["page-form"]["first-name"].value;
        if (validatedFirstName.length >= 1) {
            document.getElementById("first-name-valid").style.display = "block";
            document.getElementById("first-name-invalid").style.display = "none";
            document.getElementById("first-name").style.border = "none";
        }  
}

function lastNameCheck() {
    var validatedLastName = document.forms["page-form"]["last-name"].value;
        if (validatedLastName.length >= 1) {
            document.getElementById("last-name-valid").style.display = "block";
            document.getElementById("last-name-invalid").style.display = "none";
            document.getElementById("last-name").style.border = "none";
        }  
}

function emailCheck() {
    var validatedEmail = document.forms["page-form"]["email"].value;
        if (validatedEmail.includes(".") && validatedEmail.includes("@")) {
            document.getElementById("email-valid").style.display = "block";
            document.getElementById("email-invalid").style.display = "none";
            document.getElementById("email").style.border = "none";
        }  
}

function phoneNumberCheck() {
    var validatedPhoneNumber = document.forms["page-form"]["phone"].value;
        if (validatedPhoneNumber.length >= 7) {
            document.getElementById("phone-valid").style.display = "block";
            document.getElementById("phone-invalid").style.display = "none";
            document.getElementById("phone").style.border = "none";
        }  
}

function diagnosisCheck() {
    var validatedDiagnosis = document.forms["page-form"]["diagnosis"].value;
    console.log(validatedDiagnosis);
        if (validatedDiagnosis.length >= 1) {
            document.getElementById("diagnosis-valid").style.display = "block";
            document.getElementById("diagnosis-invalid").style.display = "none";
            document.getElementById("diagnosis").style.border = "none";
        }  
}
$('#page-form').submit(function(e) {
    e.preventDefault();
});
      
function formSubmit() {
    var firstName = document.forms["page-form"]["first-name"].value;
    var lastName = document.forms["page-form"]["last-name"].value;
    var email = document.forms["page-form"]["email"].value;
    var phoneNumber = document.forms["page-form"]["phone"].value;
    var diagnosis = document.forms["page-form"]["diagnosis"].value;
   
    if (firstName == "") {
        document.getElementById("first-name-invalid").style.display = "block";
        document.getElementById("first-name").style.border = "2px solid #BC3B41";
    } else if (lastName == "") {
        document.getElementById("last-name-invalid").style.display = "block";
        document.getElementById("last-name").style.border = "2px solid #BC3B41";
     } else if (email == "") {
        document.getElementById("email-invalid").style.display = "block";
        document.getElementById("email").style.border = "2px solid #BC3B41";
    } else if (phoneNumber == "") {
        document.getElementById("phone-invalid").style.display = "block";
        document.getElementById("phone").style.border = "2px solid #BC3B41";
    } else if (diagnosis == "") {
        document.getElementById("diagnosis-invalid").style.display = "block";
        document.getElementById("diagnosis").style.border = "2px solid #BC3B41";
    } else {
        console.log("Form submitted")
        document.getElementById("page-form").style.display = "none";
        document.getElementById("privacy-policy-container").style.display = "none";
        document.getElementById("form-success-message-container").style.display = "block";
        submitToAPI();
    }
 }
 function formSubmitContentPage() {
    var firstName = document.forms["page-form"]["first-name"].value;
    var lastName = document.forms["page-form"]["last-name"].value;
    var email = document.forms["page-form"]["email"].value;
    var phoneNumber = document.forms["page-form"]["phone"].value;
   
    if (firstName == "") {
        document.getElementById("first-name-invalid").style.display = "block";
        document.getElementById("first-name").style.border = "2px solid #BC3B41";
    } else if (lastName == "") {
        document.getElementById("last-name-invalid").style.display = "block";
        document.getElementById("last-name").style.border = "2px solid #BC3B41";
     } else if (email == "") {
        document.getElementById("email-invalid").style.display = "block";
        document.getElementById("email").style.border = "2px solid #BC3B41";
    } else if (phoneNumber == "") {
        document.getElementById("phone-invalid").style.display = "block";
        document.getElementById("phone").style.border = "2px solid #BC3B41";
    } else {
        console.log("Form submitted")
        document.getElementById("page-form").style.display = "none";
        document.getElementById("privacy-policy-container").style.display = "none";
        document.getElementById("form-success-message-container").style.display = "block";
        submitToAPI();
    }
 }
 function submitToAPI() {
    var URL = "https://fl32i0sxy2.execute-api.us-east-1.amazonaws.com/mailme/contact-us";

    var formID = $("#form-id").val();
    var firstname = $("#first-name").val();
    var lastname = $("#last-name").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    if ( $( "#diagnosis" ).length ) {
        var diagnosis = $("#diagnosis").val();
        var data = {
            formID : formID,
            firstname : firstname,
            lastname : lastname,
            phone : phone,
            email : email,
            diagnosis : diagnosis
          };
    } else {
        var data = {
            formID : formID,
            firstname : firstname,
            lastname : lastname,
            phone : phone,
            email : email
          };
    }

    $.ajax({
      type: "POST",
      url : "https://fl32i0sxy2.execute-api.us-east-1.amazonaws.com/mailme/contact-us",
      dataType: "json",
      crossDomain: "true",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),

      
      success: function () {
        // clear form and show a success message
        document.getElementById("contact-form").reset();
    location.reload();
      },
      error: function () {
        // show an error message
        console.log('nada');
      }});
  }

 