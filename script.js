document.getElementById("compareBtn").addEventListener("click", compareRides);

function compareRides() {
  let km = parseFloat(document.getElementById("distance").value);
  let time = parseFloat(document.getElementById("time").value);
  let pref = document.getElementById("preference").value;

  if (!km || !time) {
    alert("Please enter distance and time");
    return;
  }

  let rides = [
    { name: "Ola", rate: 12, base: 30, extra: 2, link: "https://www.olacabs.com" },
    { name: "Uber", rate: 13, base: 25, extra: 3, link: "https://www.uber.com" },
    { name: "Rapido", rate: 8, base: 20, extra: 0, link: "https://www.rapido.bike" },
    { name: "inDrive", rate: 10, base: 25, extra: 1, link: "https://www.indrive.com" }
  ];

  rides.forEach(r => {
    r.fare = Math.round(r.base + km * r.rate);
    r.eta = time + r.extra;
  });

  // AI Logic
  if (pref === "cheap") rides.sort((a,b)=>a.fare-b.fare);
  if (pref === "fast") rides.sort((a,b)=>a.eta-b.eta);
  if (pref === "comfort") rides.sort((a,b)=>a.name==="Uber"?-1:1);

  let box = document.getElementById("results");
  box.innerHTML = "";

  rides.forEach((r,i)=>{
    box.innerHTML += `
      <div class="row ${i===0?'ai':''}">
        <div>
          <div class="app">${r.name} ${i===0?'<span class="badge">AI PICK</span>':''}</div>
          <div class="meta">₹${r.fare} • ${r.eta} min</div>
        </div>
        <a class="open" href="${r.link}" target="_blank">Open</a>
      </div>
    `;
  });
}
