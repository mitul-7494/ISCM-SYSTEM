document.querySelector("[id='manage-customers'] > form").addEventListener("submit", function (event) {
    // Prevent the form from submitting by default
    event.preventDefault();

    // Get username, password, and balance input values
    var username = document.getElementById("cust-username").value.trim();
    var password = document.getElementById("cust-password").value.trim();
    var balance = parseInt(document.getElementById("balance").value.trim());

    // Check if username meets minimum length requirement
    if (username.length < 3 || username.length > 15) {
        alert("Username must be between 6 and 15.");
        return; // Exit the function early if validation fails
    }

    // Check if password meets minimum length requirement
    if (password.length < 6 || password.length > 15) {
        alert("Password must be between 6 and 15.");
        return; // Exit the function early if validation fails
    }

    // Check if balance is within the range of 0 to 100,000
    if (balance < 0 || balance > 100000) {
        alert("Balance must be between 0 and 100,000.");
        return; // Exit the function early if validation fails
    }

    // If all validations pass, submit the form
    this.submit();
});

document.querySelector("[id='manage-sales'] > form").addEventListener("submit", function (event) {
    // Prevent the form from submitting by default
    event.preventDefault();

    // Get username and password input values
    var username = document.getElementById("sales-username").value.trim();
    var password = document.getElementById("sales-password").value.trim();

    // Check if username meets minimum length requirement
    if (username.length < 3 || username.length > 15) {
        alert("Username must be between 6 and 15.");
        return; // Exit the function early if validation fails
    }

    // Check if password meets minimum length requirement
    if (password.length < 6 || password.length > 15) {
        alert("Password must be between 6 and 15.");
        return; // Exit the function early if validation fails
    }

    // If both validations pass, submit the form
    this.submit();
});

const searchParams = new URLSearchParams(window.location.search);
var message = searchParams.get('e')
if (message != null) {
    alert(message)
}
var x = window.location.href.split('?')
if (x.length != 1) {
    location.assign(x[0]);
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'flex';
}
showSection("manage-sales")

function seter(i) {
    i = i.parentElement.parentElement.parentElement;
    document.getElementById("sales-username").value = i.children[0].innerText;
    document.getElementById("sales-password").value = i.children[1].innerText;
    document.documentElement.scrollTop = 0;
}

function cuseter(i) {
    i = i.parentElement.parentElement.parentElement;
    document.getElementById("cust-username").value = i.children[0].innerText;
    document.getElementById("cust-password").value = i.children[1].innerText;
    document.getElementById("balance").value = i.children[2].innerText;
}