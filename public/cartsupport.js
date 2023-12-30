async function plus(i) {
    var q = +document.getElementById('q' + i).innerText;
    if (q >= 99) {
        return false
    }
    document.getElementById('q' + i).innerText = q + 1;
    var price = +document.getElementById('p' + i).innerText
    var total = +document.getElementById('t' + i).innerText
    var rbal = +document.getElementById('rbal').innerText
    var amount = +document.getElementById('amount').innerText
    document.getElementById('t' + i).innerText = (total + price) + '.00'
    document.getElementById('amount').innerText = (amount + price) + '.00'
    document.getElementById('rbal').innerText = (rbal - price) + '.00'
    var obj = { username: document.getElementById('username').innerText.trim(), id: +i, quantity: q + 1 }
    await fetch('https://'+document.getElementById('url').innerText.trim()+'/items/cart', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj),
        credentials: "include"
    })

}
async function minus(i) {
    var q = +document.getElementById('q' + i).innerText;
    if (q < 1) {
        document.getElementById(i).remove();
        return false
    }
    document.getElementById('q' + i).innerText = q - 1;
    var price = +document.getElementById('p' + i).innerText
    var total = +document.getElementById('t' + i).innerText
    var amount = +document.getElementById('amount').innerText
    var rbal = +document.getElementById('rbal').innerText
    document.getElementById('t' + i).innerText = (total - price) + '.00'
    document.getElementById('amount').innerText = (amount - price) + '.00'
    document.getElementById('rbal').innerText = (rbal + price) + '.00'
    var obj = { username: document.getElementById('username').innerText.trim(), id: +i, quantity: q - 1 }
    if (q == 1) {
        document.getElementById(i).remove();
        await fetch('./cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
            credentials: "include"
        })
    }
    else {
        await fetch('./cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
            credentials: "include"
        })
    }
}

async function AddItemToCart(id, p, t) {
    var q = document.getElementById("qnt" + id).value;
    var obj = {
        id: +id,
        title: t,
        username: document.getElementById('username').innerText.trim(),
        quantity: +q,
        price: +p
    }
    document.getElementById("qnt" + id).value = "1";
    await fetch('./items/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj),
        credentials: "include"
    }).then((response) => response.json())
        .then((response) => {
            document.getElementById("mes").style.display = "flex"
            document.getElementById("message").innerText = response.message || response.error;
            setTimeout(() => {
                document.getElementById("mes").style.display = "none"
            }, 1000)
        })
}


async function orderprocess() {

    if(+document.getElementById('rbal').innerText < 0){
        alert("not sufficiance balnce")
        return false
    }
    if(+document.getElementById('amount').innerText <= 0){
        alert("add something to the cart")
        return false
    }
    document.getElementById("det").style.display = "block"
    var obj = {username: document.getElementById('username').innerText.trim()}
    await fetch('./cart/getdetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj),
        credentials: "include"
    }).then((response) => response.json())
    .then((response) => {
        document.getElementById("mail").value = response.message.email || "";
        document.getElementById("phone").value = response.message.phone || "";
    })
}


async function placeorder() {
    document.getElementById('conf').disabled = true
    document.getElementById("det").style.display = "block"
    var obj = {username: document.getElementById('username').innerText.trim(),
        email: document.getElementById('mail').value.trim(),
        phone: document.getElementById('phone').value.trim()
    }
    let x = ""
    await fetch('./cart/details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj),
        credentials: "include"
    }).then((response) => response.json())
    .then((response) => {
        x = response.message
    })
    
    if(x != "N"){
        let baseurl = window.location.href.toString().slice(0,-4)+"orders"
        await fetch('./cart/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({baseurl}),
            credentials: "include"
        }).then((response) => response.json())
        .then((response)=>{
            console.log(response.message)
            if(response.message != "ok"){alert(response.message); return}
            alert(x);
        })
        document.getElementById("det").style.display = "none"
        window.location.href = baseurl
    }
    else{
        alert("Something went wrong with contact information")
    }
    
}