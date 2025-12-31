// registrations.js
// key: "tournamentRegs" (array of registrations)
// each reg: { id, name, email, uid, whatsapp, type, method, txn, time, status }

(function(){
  // helper to read & write
  window._getRegs = function(){
    return JSON.parse(localStorage.getItem("tournamentRegs")) || [];
  };
  window._saveRegs = function(arr){
    localStorage.setItem("tournamentRegs", JSON.stringify(arr));
  };
})();

// submit from register.html
function submitRegistration(){
  let name = document.getElementById("reg_name").value.trim();
  let email = document.getElementById("reg_email").value.trim();
  let uid = document.getElementById("reg_uid").value.trim();
  let whatsapp = document.getElementById("reg_whatsapp").value.trim();
  let type = document.getElementById("reg_type").value;
  let method = document.getElementById("reg_method").value;
  let txn = document.getElementById("reg_txn").value.trim();

  if(!name || !email){
    alert("Name and Email required");
    return;
  }
  if(!type){ alert("Select Solo/Duo/Squad"); return; }
  if(!method){ alert("Select payment method"); return; }
  if(!txn){ alert("Enter transaction ID"); return; }

  let regs = _getRegs();

  let reg = {
    id: "REG"+Date.now(),
    name, email, uid, whatsapp, type, method, txn,
    time: new Date().toLocaleString(),
    status: "pending" // pending / approved / rejected
  };

  regs.push(reg);
  _saveRegs(regs);

  alert("Registration submitted — pending admin approval.");
  // clear form
  document.getElementById("reg_name").value = "";
  document.getElementById("reg_email").value = "";
  document.getElementById("reg_uid").value = "";
  document.getElementById("reg_whatsapp").value = "";
  document.getElementById("reg_type").value = "";
  document.getElementById("reg_method").value = "";
  document.getElementById("reg_txn").value = "";
}

// load user regs by email (my-registrations.html)
function loadMyRegistrations(){
  let email = document.getElementById("view_email").value.trim();
  if(!email){ alert("Enter your email"); return; }
  let regs = _getRegs().filter(r => r.email.toLowerCase() === email.toLowerCase());
  let out = "";

  if(!regs.length){
    out = "<p style='color:#aaa'>No registrations found for this email.</p>";
  } else {
    out = "<table style='width:100%;border-collapse:collapse;color:#fff'><thead><tr style='text-align:left'><th>#</th><th>Type</th><th>Method</th><th>TXN</th><th>Time</th><th>Status</th></tr></thead><tbody>";
    regs.forEach((r,i)=>{
      let cls = r.status==="pending" ? "status-pending" : (r.status==="approved"?"status-approved":"status-rejected");
      out += `<tr style="border-bottom:1px solid #222"><td>${i+1}</td><td>${r.type}</td><td>${r.method}</td><td>${r.txn}</td><td>${r.time}</td><td class="${cls}">${r.status.toUpperCase()}</td></tr>`;
    });
    out += "</tbody></table>";
  }
  document.getElementById("myList").innerHTML = out;
}

// ADMIN functions (admin.html)
function checkAdmin(){
  if(localStorage.getItem("t_admin_logged") !== "true"){
    window.location.href = "admin_login.html";
    return false;
  }
  return true;
}

function loadRegistrations(){
  if(!checkAdmin()) return;
  let regs = _getRegs();
  let tbody = document.querySelector("#regsTable tbody");
  if(!tbody) return;
  if(!regs.length){
    tbody.innerHTML = `<tr><td colspan="11" style="color:#aaa">No registrations yet.</td></tr>`;
    return;
  }

  let html = "";
  regs.forEach((r, idx) => {
    html += `<tr>
      <td>${idx+1}</td>
      <td>${escapeHtml(r.name)}</td>
      <td>${escapeHtml(r.email)}</td>
      <td>${escapeHtml(r.uid||"")}</td>
      <td>${escapeHtml(r.whatsapp||"")}</td>
      <td>${escapeHtml(r.type)}</td>
      <td>${escapeHtml(r.method)}</td>
      <td>${escapeHtml(r.txn)}</td>
      <td>${escapeHtml(r.time)}</td>
      <td>${r.status}</td>
      <td>
        <button class="btn-approve" onclick="adminChangeStatus('${r.id}','approved')">Approve</button>
        <button class="btn-reject" onclick="adminChangeStatus('${r.id}','rejected')">Reject</button>
        <button class="btn-delete" onclick="adminDelete('${r.id}')">Delete</button>
      </td>
    </tr>`;
  });
  tbody.innerHTML = html;
}

function adminChangeStatus(id, status){
  if(!checkAdmin()) return;
  let regs = _getRegs();
  let idx = regs.findIndex(r => r.id === id);
  if(idx === -1) return alert("Not found");
  regs[idx].status = status;
  _saveRegs(regs);
  loadRegistrations();
  alert("Status updated: " + status);
}

function adminDelete(id){
  if(!checkAdmin()) return;
  if(!confirm("Delete this registration?")) return;
  let regs = _getRegs();
  regs = regs.filter(r => r.id !== id);
  _saveRegs(regs);
  loadRegistrations();
  alert("Deleted");
}

function adminLogout(){
  localStorage.removeItem("t_admin_logged");
  window.location.href = "admin_login.html";
}

// small helper to avoid XSS in table
function escapeHtml(text){
  if(!text) return "";
  return String(text).replace(/[&<>"'`=\/]/g, function(s) {
    return ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','=':'&#x3D;','`':'&#x60;'
    })[s];
  });
}

// If admin.html loaded, auto-load regs
if(typeof window !== "undefined"){
  // if admin page open, call loadRegistrations after DOM ready
  document.addEventListener("DOMContentLoaded", function(){
    if(document.querySelector("#regsTable tbody")){
      loadRegistrations();
    }
  });
}