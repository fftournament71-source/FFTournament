// admin_login.js
function adminLogin(){
  const u = document.getElementById('adminUser').value.trim();
  const p = document.getElementById('adminPass').value.trim();

  const ADMIN_USER = 'admin';
  const ADMIN_PASS = '12345';

  if(u === ADMIN_USER && p === ADMIN_PASS){
    localStorage.setItem('admin_logged_in', 'true');
    alert('Login successful');
    location.href = 'admin.html';
  } else {
    alert('Incorrect admin credentials');
  }
}