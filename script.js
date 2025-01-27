document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const signupLink = document.getElementById('signupLink');
    const loginLink = document.getElementById('loginLink');
    const loginContainer = document.getElementById('loginContainer');
    const signupContainer = document.getElementById('signupContainer');

    if (!loginForm || !signupForm) {
        console.error('Forms not found');
        return;
    }

    // Alternar entre login e cadastro
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'block';
    });

    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        signupContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // Login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (email && password) {
            const button = this.querySelector('button');
            button.textContent = 'Entrando...';
            button.disabled = true;
            
            try {
                if (window.Android) {
                    window.Android.onLoginSuccess(email, password);
                } else {
                    console.error('Android interface not found');
                    button.textContent = 'Entrar';
                    button.disabled = false;
                }
            } catch (error) {
                console.error('Error:', error);
                button.textContent = 'Entrar';
                button.disabled = false;
            }
        } else {
            alert('Por favor, preencha todos os campos');
        }
    });

    // Cadastro
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('As senhas não coincidem');
            return;
        }
        
        if (name && email && password) {
            const button = this.querySelector('button');
            button.textContent = 'Cadastrando...';
            button.disabled = true;
            
            try {
                if (window.Android) {
                    window.Android.onSignupSuccess(name, email, password);
                } else {
                    console.error('Android interface not found');
                    button.textContent = 'Cadastrar';
                    button.disabled = false;
                }
            } catch (error) {
                console.error('Error:', error);
                button.textContent = 'Cadastrar';
                button.disabled = false;
            }
        } else {
            alert('Por favor, preencha todos os campos');
        }
    });
});