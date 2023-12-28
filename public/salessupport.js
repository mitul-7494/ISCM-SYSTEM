async function approver(id) {
    document.getElementById('load').style.display = "flex"
    await fetch('./salesa/' + id, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })
    document.getElementById(id).remove()
    setTimeout(() => { document.getElementById('load').style.display = "none" }, 500)
    alert("order by id:" + id + " is Approved")
}

async function rejecter(id) {
    document.getElementById('load').style.display = "flex"
    await fetch('./salesr/' + id, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })
    document.getElementById(id).remove()
    setTimeout(() => { document.getElementById('load').style.display = "none" }, 500)
    alert("order by id:" + id + " is Rejected")
}

async function filtercus() {
    let x = document.getElementById('s_cus').value
    if (x == '') {
        const y = document.getElementsByClassName('order-card')
        for (let i = 0; i < y.length; i++) {
            y[i].style.display = ""
        }
    }
    else {
        const y = document.getElementsByClassName('order-card')
        const c = document.getElementById('s_cus').value
        for (let i = 0; i < y.length; i++) {
            if (y[i].children[1].innerText.split(" ")[1] == c) {
                y[i].style.display = ""
            }
            else {
                y[i].style.display = "none"
            }
        }
    }
}

async function showfilters(i) {
    if (i.innerText == "Filter") { i.innerText = "Hide" }
    else { i.innerText = "Filter" }
    document.documentElement.scrollTop = 0
    let x = document.getElementsByClassName('opts')[0]
    if (x.style.display == '') { x.style.display = "none"; await reset()}
    else { x.style.display = '' }
}

async function sdate(i) {
    const y = document.getElementsByClassName('order-card')
    const selected_date = new Date(i);
    for (let i = 0; i < y.length; i++) {
        if (y[i].style.display != "none" && (new Date(y[i].children[3].innerText) >= selected_date)){
            y[i].style.display = ""
        }
        else {
            y[i].style.display = "none"
        }
    }
}

async function edate(i) {
    const y = document.getElementsByClassName('order-card')
    const selected_date = new Date(i);
    for (let i = 0; i < y.length; i++) {
        if (y[i].style.display != "none" && (new Date(y[i].children[3].innerText) <= selected_date)){
            y[i].style.display = ""
        }
        else {
            y[i].style.display = "none"
        }
    }
}

async function apply() {
    await filtercus();
    const s = document.getElementById('sdate').value
    if (s != '') { await sdate(s) }
    const e = document.getElementById('edate').value
    if (e != '') { await edate(e) }
}

async function reset() {
    document.getElementById('edate').value = ''
    document.getElementById('sdate').value = ''
    document.getElementById('s_cus').value = ''
    await apply()
}