document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('orderForm');
    const phoneInput = document.getElementById('phone');
    const nameInput = document.getElementById('fullName');
    const streetInput = document.getElementById('street');
    const buildingInput = document.getElementById('building');
    const submitBtn = document.getElementById('submitBtn');

    // Create the array of address inputs to validate
    const addressInputs = [streetInput, buildingInput];

    // Prevent letters and format phone input
    phoneInput.addEventListener('input', (e) => {
        // Remove everything that isn't a digit
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 11) value = value.slice(0, 11);
        
        // Update the input value to only show numbers
        e.target.value = value;
        
        if (value.length === 11) {
            setValid(phoneInput);
        } else {
            setInvalid(phoneInput);
        }
    });

    nameInput.addEventListener('blur', () => {
        const value = nameInput.value.trim();
        const nameParts = value.split(' ').filter(part => part.length > 0);
        
        if (nameParts.length >= 2) {
            setValid(nameInput);
        } else {
            setInvalid(nameInput);
        }
    });

    form.addEventListener('submit', (e) => {
        // ALWAYS call preventDefault first to stop the page from reloading
        e.preventDefault();
        
        let isValid = true;

        // Validate Phone (exactly 11 digits)
        const phoneDigits = phoneInput.value.replace(/\D/g, '');
        if (phoneDigits.length < 11) {
            setInvalid(phoneInput);
            isValid = false;
        } else {
            setValid(phoneInput);
        }

        // Validate Name
        if (nameInput.value.trim().split(' ').filter(p => p).length < 2) {
            setInvalid(nameInput);
            isValid = false;
        } else {
            setValid(nameInput);
        }

        // Validate Address
        addressInputs.forEach(input => {
            if (!input || input.value.trim() === '') {
                setInvalid(input);
                isValid = false;
            } else {
                setValid(input);
            }
        });

        if (isValid) {
            showSuccess();
        } else {
            // Optional: smooth scroll to the first error
            const firstError = document.querySelector('.border-red-500');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    function setInvalid(el) {
        if (!el) return;
        el.classList.remove('border-gray-100', 'focus:ring-green-500');
        el.classList.add('border-red-500', 'focus:ring-red-500');
    }

    function setValid(el) {
        if (!el) return;
        el.classList.remove('border-red-500', 'focus:ring-red-500');
        el.classList.add('border-green-500', 'focus:ring-green-500');
    }

    function showSuccess() {
        submitBtn.disabled = true;
        submitBtn.innerText = "ЗАКАЗ ОФОРМЛЕН!";
        submitBtn.classList.replace('bg-green-400', 'bg-gray-900');
        submitBtn.classList.add('text-white');
        
        setTimeout(() => {
            window.location.href = "./index.html";
        }, 2000);
    }
});