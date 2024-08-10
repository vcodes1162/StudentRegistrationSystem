// Wait until the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
   const form = document.getElementById('studentForm');    // Get the form element
   const recordsTable = document.getElementById('recordsTable');   // Get the table element for displaying records

   // Function to load student records from localStorage and display them in the table
   function loadRecords() {
       const students = JSON.parse(localStorage.getItem('students')) || [];    // Retrieve records from localStorage
       const tbody = recordsTable.querySelector('tbody');  // Gets the <tbody> element of the Table
       tbody.innerHTML = '';   // Clear Existing Rows in Table

       // Add each student record as a new row in the table
       students.forEach(student => {
           const row = document.createElement('tr');
           row.innerHTML = `
               <td>${student.name}</td>
               <td>${student.id}</td>
               <td>${student.email}</td>
               <td>${student.contact}</td>
               <td>
                   <button onclick="editRecord('${student.id}')">Edit</button> 
                   <button onclick="deleteRecord('${student.id}')">Delete</button>
               </td>
           `;
           tbody.appendChild(row); //Appends the child named row to the <tbody> element of the Table
       });
   }

   // Handle form submission to add or update a student record
   form.addEventListener('submit', function (event) {
       event.preventDefault(); // Prevent the default form submission behavior


       const studentName = form.studentName.value.trim();  // Get the student name from the form
       const studentId = form.studentId.value.trim();      // Get the student id from the form
       const emailId = form.emailId.value.trim();          // Get the student email-id from the form
       const contactNo = form.contactNo.value.trim();      // Get the student contact number from the form


       // Validation to ensure all fields are filled
       if (!studentName || !studentId || !emailId || !contactNo) {
           alert('All fields are required.');
           return;
       }

       // Validate that student name contains only letters and spaces
       if (!/^[A-Za-z\s]+$/.test(studentName)) {
           alert('Student Name must contain only letters and spaces.');
           return;
       }

       // Validate that student ID and contact number are numeric, and contact number is 10 digits.
       if (!/^\d+$/.test(studentId) || !/^\d{10}$/.test(contactNo)) {
           alert('Student ID must be numeric and Contact Number must be a 10-digit number.');
           return;
       }

       // Validate the email address format
       if (!/\S+@\S+\.\S+/.test(emailId)) {
           alert('Invalid email address.');
           return;
       }
       //Update Local Storage with New or Updated Student Record
       let students = JSON.parse(localStorage.getItem('students')) || [];   // Retrieve existing records
       students = students.filter(student => student.id !== studentId);     // Remove any existing record with the same ID
       students.push({ name: studentName, id: studentId, email: emailId, contact: contactNo });  //Adds New or Updates Student Record
       localStorage.setItem('students', JSON.stringify(students));    // Save updated records to localStorage

       form.reset();
       loadRecords();
   });

   // Function to edit a student record
   window.editRecord = function (id) {
       const students = JSON.parse(localStorage.getItem('students')) || [];   // Retrieve records
       const student = students.find(student => student.id === id);    // Find the student record with the specified ID

       if (student) {
           form.studentName.value = student.name;  // Fill the form with the student's data
           form.studentId.value = student.id;
           form.emailId.value = student.email;
           form.contactNo.value = student.contact;
       }
   };

   // Function to delete a student record
   window.deleteRecord = function (id) {
       if (confirm('Are you sure you want to delete this record?')) {      // Confirmation Dialog for Deletion of Record
           let students = JSON.parse(localStorage.getItem('students')) || [];
           students = students.filter(student => student.id !== id);
           localStorage.setItem('students', JSON.stringify(students));
           loadRecords();
       }
   };

   // Initial load of records when the page is first accessed
   loadRecords();
});
