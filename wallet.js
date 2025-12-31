let username = localStorage.getItem("logged_user");
let balance = JSON.parse(localStorage.getItem("user_balance")) || {};

if (!balance[username]) balance[username] = 0;

document.getElementById("balance").innerText = "BDT " + balance[username];// wallet.js
// Demo user id
const USER_ID = 'user1';

// ensure user object
function ensureUser() {
  let users = JSON.parse(localStorage.getItem('users')||'{}');
  if(!users[USER_ID]) {
    users[USER_ID] = { balance: 0, name: 'Demo User' };
    localStorage.setItem('users', JSON.stringify(users));
  }
}
function showBalance(){
  ensureUser();
  const users = JSON.parse(localStorage.getItem('users')||'{}');
  document.getElementById('balance').innerText = 'BDT ' + (users[USER_ID].balance || 0);
}
showBalance();
