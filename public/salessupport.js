async function approver(id) {
    document.getElementById('load').style.display = "flex";
    await fetch('./salesa/' + id, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    });
    document.getElementById(id).remove();
    setTimeout(() => { document.getElementById('load').style.display = "none" }, 500);
    alert("order by id:" + id + " is Approved");
}

async function rejecter(id) {
    document.getElementById('load').style.display = "flex";
    await fetch('./salesr/' + id, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    });
    document.getElementById(id).remove();
    setTimeout(() => { document.getElementById('load').style.display = "none" }, 500);
    alert("order by id:" + id + " is Rejected");
}

async function filtercus() {
    let x = document.getElementById('s_cus').value;
    const y = document.getElementsByClassName('order-card');
    if (x == '') {
        for (let i = 0; i < y.length; i++) {
            y[i].style.display = "";
        }
    } else {
        for (let i = 0; i < y.length; i++) {
            if (y[i].children[1].innerText.split(" ")[1] === x) {
                y[i].style.display = "";
            } else {
                y[i].style.display = "none";
            }
        }
    }
}

// async function showfilters(i) {
//     if (i.innerText == "Filter") { i.innerText = "Hide" }
//     else { i.innerText = "Filter" }
//     document.documentElement.scrollTop = 0
//     let x = document.getElementsByClassName('opts')[0]
//     if (x.style.display == '') { x.style.display = "none"; await reset()}
//     else { x.style.display = '' }
// }

async function sdate(i) {
    const y = document.getElementsByClassName('order-card');
    const selected_date = new Date(i);
    for (let i = 0; i < y.length; i++) {
        if (y[i].style.display !== "none" && new Date(y[i].children[3].innerText) >= selected_date) {
            y[i].style.display = "";
        } else {
            y[i].style.display = "none";
        }
    }
}

async function edate(i) {
    const y = document.getElementsByClassName('order-card');
    const selected_date = new Date(i);
    for (let i = 0; i < y.length; i++) {
        if (y[i].style.display !== "none" && new Date(y[i].children[3].innerText) <= selected_date) {
            y[i].style.display = "";
        } else {
            y[i].style.display = "none";
        }
    }
}

async function apply() {
    const s = document.getElementById('sdate').value;
    const e = document.getElementById('edate').value;
    
    // Validation: Check if start date is less than or equal to end date
    if (s && e) {
        const startDate = new Date(s).setHours(0, 0, 0, 0);
        const endDate = new Date(e).setHours(0, 0, 0, 0);
        
        if (startDate > endDate) {
            alert('Starting date must be less than or equal to the ending date.');
            return; // Exit the function if validation fails
        }
    }
    
    await filtercus();
    if (s !== '') { await sdate(s); }
    if (e !== '') { await edate(e); }
}

async function reset() {
    document.getElementById('edate').value = '';
    document.getElementById('sdate').value = '';
    document.getElementById('s_cus').value = '';
    await apply();
}
