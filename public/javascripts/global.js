var Users = {
	// Userlist data array for filling in info box
	userListData : [],
	tableContent : '',
	init: function(){
		this.getUserList();
		this.setEvents();
	},
	setEvents: function(){
		// Username link click
		$('#userList table tbody').on('click', 'td a.linkshowuser', this.showUserInfo);
		// Add User button click
		$('#btnAddUser').on('click', this.addUser);
		// Delete user link click
		$('#userList table tbody').on('click','td a.linkdeleteuser', this.removeUser);
		// Edit user link
		$('#userList table tbody').on('click','td a.linkedit', this.setEdit);
		$('#btnEditUser').on('click',this.saveEdit);
	},
	getUserList: function(){
		// jQuery AJAX call for JSON
		$.getJSON( '/users/userlist',this.populateTable);
	},
	renderUsers: function(index,elem){
             Users.tableContent +=  '<tr>' 
					+ '<td><a href="#" class="linkshowuser" rel="' 
							+ index + '">' 
							+ this.username + '</a></td>'
					+ '<td>' + this.email + '</td>'
					+ '<td><a href="#" class="linkedit" rel="' + index + '">'
						+ 'edit</a></td>'
					+ '<td><a href="#" class="linkdeleteuser" rel="' + this.id + '">'
						+ 'delete</a></td>'
					+ '</tr>';		
			//console.log(Users.tableContent);
	},
	populateTable: function (data){
		Users.userListData = data;
		// Empty content string
		Users.tableContent = '';
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, Users.renderUsers);
        // Inject the whole content string into our existing HTML table
		var tbody = $('#userList table tbody');
        tbody.html(Users.tableContent);
    },
	showUserInfo: function (event) {
		// Prevent Link from Firing
		event.preventDefault();
		// Retrieve username from link rel attribute
		var arrayPosition = parseInt($(this).attr('rel'));
		// Get our User Object
		var thisUserObject = Users.userListData[arrayPosition];

		//Populate Info Box
		$('#userInfoName').text(thisUserObject.fullname);
		$('#userInfoAge').text(thisUserObject.age);
		$('#userInfoGender').text(thisUserObject.gender);
		$('#userInfoLocation').text(thisUserObject.location);
	},
	validate: function(){
		    var errorCount = 0;
			$('#addUser input').each(function(index, val) {
				if($(this).val() === '') {
					console.log($(this));
					errorCount++; 
				}
			});
			//return 0;
			return errorCount;
	},
	serializeNew: function(){
		var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        };
		return newUser;
	},	
	postNewUser: function(newUser){
		        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done( Users.donePostUser);
	},
	donePostUser: function(response){
			console.log(response.toString());
            // Check for successful (blank) response
            if (response.msg === '') {
				//alert('New user successfully added !');
                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                Users.getUserList();
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
		
	},
	addUser: function(event){
		event.preventDefault();
		var errorCount = Users.validate();
		if (errorCount <= 1) {
			var newUser = Users.serializeNew();
			Users.postNewUser(newUser);
		}
		else { 
			// If errorCount is more than 0, error out
			alert('Please fill in all fields');
			return false;
		}
	},
	deleteUser: function(id){
		console.log('delete ' + id);
			$.ajax({
				type: 'DELETE',
				url: '/users/deleteuser/' + id
			}).done( Users.deleteUserDone)
	},
	deleteUserDone: function(response){
			// Check for a successful (blank) response
			if (response.msg !== '') {
				alert('Error: ' + response.msg);
			}

			// Update the table
			Users.getUserList();
	},
	removeUser: function(event){
		event.preventDefault();

		// Pop up a confirmation dialog
		var confirmation = confirm('Are you sure you want to delete this user?');

		// Check and make sure the user confirmed
		if (confirmation === true) {
			var id =  $(this).attr('rel');
			// If they did, do our delete
			Users.deleteUser(id);
		}
		else {
			// If they said no to the confirm, do nothing
			return false;

		}		
	},
	setEdit:  function(event){
		event.preventDefault();
		// Retrieve username from link rel attribute
		var arrayPosition = parseInt($(this).attr('rel'));
		// Get our User Object
		var thisUserObject = Users.userListData[arrayPosition];
		
		$('#addUser fieldset input#inputUserName').val(thisUserObject.username);
		$('#addUser fieldset input#inputUserEmail').val(thisUserObject.email);
		$('#addUser fieldset input#inputUserFullname').val(thisUserObject.fullname);
		$('#addUser fieldset input#inputUserAge').val(thisUserObject.age);
		$('#addUser fieldset input#inputUserLocation').val(thisUserObject.location);
		$('#addUser fieldset input#inputUserGender').val(thisUserObject.gender);
		$('#addUser fieldset input#inputUserId').val(thisUserObject.id);
		$('#addUser fieldset button#btnEditUser').prop('disabled', false);
		$('#addUser fieldset button#btnAddUser').prop('disabled', true);
		
	},
	getEditId: function(){
		return $('#addUser fieldset input#inputUserId').val();
	},
	putUpdateUser:function(user,id){
		$.ajax({
			type: 'PUT',
			data: user,
			url: '/users/putuser/' + id
		}).done( Users.putUpdateUserDone)
	},
	putUpdateUserDone: function(response){
		// Check for a successful (blank) response
		if (response.msg !== '') {
			alert('Error: ' + response.msg);
		}else{
			$('#addUser fieldset input').val('');
			$('#addUser fieldset button#btnEditUser').prop('disabled', true);
			$('#addUser fieldset button#btnAddUser').prop('disabled', false);

		}

		// Update the table
		Users.getUserList();
	},
	saveEdit: function(event){
		event.preventDefault();
		
		var errorCount = Users.validate();
		if (errorCount == 0) {
			var updateUser = Users.serializeNew();
			var userId = Users.getEditId();	
			Users.putUpdateUser(updateUser,userId);
		}
		else { 
			// If errorCount is more than 0, error out
			alert('Please fill in all fields');
			return false;
		}
	},
		
};
	
	



// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    Users.init();

});




