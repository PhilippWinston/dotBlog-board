// login form handler and API call

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      
      try {
        
      
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  debugger  
      if (response.ok) {
        const res = await response.json()
        debugger
        alert(res.message);

        document.location.replace('/');
      } else {
        const res = await response.json()
        console.log(JSON.stringify(response))
        debugger
        alert(res.message);
      }} catch (error) {
        console.log(JSON.stringify(error))
        
      }
    }
  };

  document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);