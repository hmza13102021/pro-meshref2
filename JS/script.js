function calculateQueue() {
    const c = parseInt(document.getElementById("servers").value);
    const lambd = parseFloat(document.getElementById("arrivalRate").value);
    const mu = parseFloat(document.getElementById("serviceRate").value);

    if (isNaN(c) || isNaN(lambd) || isNaN(mu) || c <= 0 || lambd <= 0 || mu <= 0) {
        alert("Please enter valid positive numbers for all inputs.");
        return;
    }

    const rho = lambd / (c * mu);
    if (rho >= 1) {
        alert("Traffic intensity (ρ) must be less than 1.");
        return;
    }

    // حساب P0
    let sumTerms = 0;
    for (let r = 0; r < c; r++) {
        sumTerms += Math.pow(c * rho, r) / factorial(r);
    }
    const P0 = 1 / (sumTerms + Math.pow(c * rho, c) / (factorial(c) * (1 - rho)));

    // حساب Πw
    const Πw = (Math.pow(c * rho, c) * P0) / (factorial(c) * (1 - rho));

    // E(Lq)
    const E_Lq = Πw * (rho / (1 - rho));

    // E(L)
    const E_L = c * rho + E_Lq;

    // E(Wq)
    const E_Wq = E_Lq / lambd;

    // E(W)
    const E_W = E_Wq + 1 / mu;

    // عرض النتائج
    document.getElementById("results").innerHTML = `
        <h3>Results:</h3>
        <ul class="list-group">
            <li class="list-group-item"><b>Traffic Intensity (ρ):</b> ${rho.toFixed(3)}</li>
            <li class="list-group-item"><b>P0 (Probability of zero customers):</b> ${P0.toFixed(3)}</li>
            <li class="list-group-item"><b>Πw (Probability of waiting):</b> ${Πw.toFixed(3)}</li>
            <li class="list-group-item"><b>E(Lq) (Expected queue length):</b> ${E_Lq.toFixed(3)}</li>
            <li class="list-group-item"><b>E(L) (Expected total length):</b> ${E_L.toFixed(3)}</li>
            <li class="list-group-item"><b>E(Wq) (Expected waiting time in queue):</b> ${E_Wq.toFixed(3)} units</li>
            <li class="list-group-item"><b>E(W) (Expected total time in system):</b> ${E_W.toFixed(3)} units</li>
        </ul>
    `;
}

// دالة لحساب المضروب (Factorial)
function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}
