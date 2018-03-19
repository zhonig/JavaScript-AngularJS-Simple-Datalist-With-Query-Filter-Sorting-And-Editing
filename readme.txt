Create a small AngularJS app using best practices:
	Read in a preset list of clients(id, first name, last name, dob, height, weight, gender) from a json file.
	Display the clients in an index with the properties(first name, last name, dob) with the option of sorting by any column. 
	Add an input box to allow for searching the list by one of the columns.
	Add an 'edit' route that will display all the client data in a form and upon saving will update the file and return the user to the updated index list.
	
To prevent CORS error on localhost and Google Chrome Browser, paste the following commands into the windows "command prompt":
	cd C:\Program Files (x86)\Google\Chrome\Application
	chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security