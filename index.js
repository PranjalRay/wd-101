document.addEventListener('DOMContentLoaded', function () {
    const formElement = document.querySelector('#registrationForm');
    if (!formElement) {
        console.error('Form element not found!');
        return;
    }
    loadUsers();
    formElement.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;
        const age = calculateAge(new Date(dob));
        if (age < 18 || age > 55) {
            alert('Age must be between 18 and 55.');
            return;
        }
        const user = { name, email, password, dob, acceptTerms };
        saveUser(user);
        addUserToTable(user);
    });
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
