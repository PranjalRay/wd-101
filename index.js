document.addEventListener('DOMContentLoaded', function () {
    const formElement = document.querySelector('#registrationForm');
    if (!formElement) {
        console.error('Form element not found!');
        return;
    }

    loadUsers();

    formElement.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;

        // Validate Email
        if (!validateEmail(email)) {
            alert('Invalid email address.');
            return;
        }

        // Validate Age
        const age = calculateAge(new Date(dob));
        if (age < 18 || age > 55) {
            alert('Age must be between 18 and 55.');
            return;
        }

        // Store the user data
        const user = { name, email, password, dob, acceptTerms };
        saveUser(user);

        // Add user to the table
        addUserToTable(user);

        // Clear the form after submission
        formElement.reset();
    });

    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return emailPattern.test(email);
    }

    function calculateAge(dob) {
        const diff = Date.now() - dob.getTime();
        const age = new Date(diff).getUTCFullYear() - 1970;
        return age;
    }

    function saveUser(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => addUserToTable(user));
    }

    function addUserToTable(user) {
        const table = document.getElementById('history');
        const row = table.insertRow();
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.acceptTerms ? 'True' : 'False'}</td>
        `;
    }
});
