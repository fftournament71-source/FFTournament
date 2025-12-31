// admin.js
if(localStorage.getItem('admin_logged_in') !== 'true'){
  alert('Please login as admin');
  location.href = 'admin_login.html';
}

function loadRequests(){
  const reqList = JSON.parse(localStorage.getItem('deposit_requests')||'[]');
  const container = document.getElementById('requestList');
  container.innerHTML = '';
  if(reqList.length === 0){
    container.innerHTML = '<div class="card">No deposit requests</div>';
    return;
  }

  reqList.reverse().forEach(r=>{
    const div = document.createElement('div');
    div.className = 'request-item';
    div.innerHTML = `
      <div>
        <div><strong>${r.user}</strong> — <span class="small">${new Date(r.created).toLocaleString()}</span></div>
        <div style="margin-top:6px">Amount: <strong>BDT ${r.amount}</strong> (${r.method})</div>
        <div class="small">Number: ${r.number} | TxID: ${r.txid}</div>
        <div style="margin-top:6px">Status: <span class="badge">${r.status}</span></div>
      </div>
      <div class="request-actions">
        ${r.status === 'pending' ? `<button class="btn btn-green" onclick="approve('${r.id}')">Approve</button>
        <button class="btn btn-blue" onclick="reject('${r.id}')">Reject</button>` : ''}
      </div>
    `;
    container.appendChild(div);
  });
}

function saveRequests(arr){ localStorage.setItem('deposit_requests', JSON.stringify(arr)); }

function approve(id){
  const arr = JSON.parse(localStorage.getItem('deposit_requests')||'[]');
  const idx = arr.findIndex(a=>a.id === id);
  if(idx === -1) return alert('Request not found');

  if(confirm('Approve this request and add amount to user?')){
    arr[idx].status = 'approved';
    saveRequests(arr);

    // add to user's balance
    const users = JSON.parse(localStorage.getItem('users')||'{}');
    const userId = arr[idx].user;
    if(!users[userId]) users[userId] = { balance:0, name: 'Demo User' };
    users[userId].balance = (users[userId].balance || 0) + Number(arr[idx].amount);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Approved and balance updated');
    loadRequests();
  }
}

function reject(id){
  const arr = JSON.parse(localStorage.getItem('deposit_requests')||'[]');
  const idx = arr.findIndex(a=>a.id === id);
  if(idx === -1) return alert('Request not found');
  if(confirm('Reject this request?')){
    arr[idx].status = 'rejected';
    saveRequests(arr);
    alert('Request rejected');
    loadRequests();
  }
}

function logoutAdmin(){
  localStorage.removeItem('admin_logged_in');
  location.href = 'admin_login.html';
}

loadRequests();