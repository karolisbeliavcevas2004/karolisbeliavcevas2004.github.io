
const toggleButton = document.getElementById('toggle-theme');


const currentTheme = localStorage.getItem('theme');


if (currentTheme) {
    document.body.classList.add(currentTheme);
}


toggleButton.addEventListener('click', () => {
    
    document.body.classList.toggle('dark-mode');

    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.setItem('theme', 'light-mode');
    }
});

const scrollToTopBtn = document.getElementById('scrollToTopBtn');


window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block"; 
    } else {
        scrollToTopBtn.style.display = "none"; 
    }
};


scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});

function updateClock() {
    const now = new Date(); 
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0'); 
    const seconds = now.getSeconds().toString().padStart(2, '0'); 
    
    const timeString = `${hours}:${minutes}:${seconds}`; 
    document.getElementById('clock').textContent = timeString; 
}


updateClock();


setInterval(updateClock, 1000);


function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}


function validatePhone(phone) {
    const phonePattern = /^\+?[0-9]{10,15}$/;
    return phonePattern.test(phone);
}


function validateAddress(address) {
    return address.trim() !== '';
}


function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block'; 
}


function showSuccess(message) {
    const successMessage = document.getElementById('success-message');
    successMessage.textContent = message;
    successMessage.style.display = 'block';
}


document.getElementById('submitButton').addEventListener('click', () => {

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    const question1 = parseInt(document.getElementById('question1').value);
    const question2 = parseInt(document.getElementById('question2').value);
    const question3 = parseInt(document.getElementById('question3').value);
    const question4 = parseInt(document.getElementById('question4').value);
    const question5 = parseInt(document.getElementById('question5').value);

    // Patikrinti įvestis
    if (!validateEmail(email)) {
        showError('Prašome įvesti galiojantį el. pašto adresą.');
        return;
    }
    if (!validatePhone(phone)) {
        showError('Prašome įvesti galiojantį telefono numerį.');
        return;
    }
    if (!validateAddress(address)) {
        showError('Prašome įvesti adresą.');
        return;
    }

   
    document.getElementById('error-message').style.display = 'none';

 
    const formData = {
        firstName,
        lastName,
        email,
        phone,
        address,
        ratings: {
            question1,
            question2,
            question3,
            question4,
            question5,
        },
    };

   
    const averageRating = (
        (question1 + question2 + question3 + question4 + question5) / 5
    ).toFixed(2);

   
    let averageColor = 'green'; 
    if (averageRating <= 4) {
        averageColor = 'red';
    } else if (averageRating <= 7) {
        averageColor = 'orange';
    }

    // Išvedame rezultatą į konsolę
    console.log(formData);

  
    const output = document.getElementById('output');
    output.innerHTML = `
        <p>Vardas: ${formData.firstName}</p>
        <p>Pavardė: ${formData.lastName}</p>
        <p>El. paštas: ${formData.email}</p>
        <p>Telefonas: ${formData.phone}</p>
        <p>Adresas: ${formData.address}</p>
        <p>1. Kaip patiko svetainės dizainas? ${formData.ratings.question1}</p>
        <p>2. Ar buvo lengva naudotis svetaine? ${formData.ratings.question2}</p>
        <p>3. Ar radote norimą informaciją? ${formData.ratings.question3}</p>
        <p>4. Kaip vertinate svetainės greitį? ${formData.ratings.question4}</p>
        <p>5. Ar rekomenduotumėte šią svetainę? ${formData.ratings.question5}</p>
        <p><strong>${formData.firstName} ${formData.lastName} (${formData.email}) ${formData.phone} ${formData.address}: Vidurkis - <span style="color: ${averageColor}">${averageRating}</span></strong></p>
    `;

  
    showSuccess('Forma sėkmingai pateikta!');
});