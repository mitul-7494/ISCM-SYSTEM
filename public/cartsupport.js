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
    await fetch('./cart', {
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

async function AddItemToCart(element,id, p, t) {
    element.disabled = true;
    document.getElementById("mes").style.display = "flex";
    document.querySelector('[class="text"]').style.display = 'none'
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
            document.querySelector('[class="text"]').style.display = ''
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

let obj2;

async function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

async function placeorder() {
    document.getElementById('conf').disabled = true;
    document.getElementById("det").style.display = "block";

    let email = document.getElementById('mail').value.trim();
    let phone = document.getElementById('phone').value.trim();
    
    if (!await validateEmail(email)) {
        alert("Please enter a valid email address.");
        // Re-enable submit button and hide loading message
        document.getElementById('conf').disabled = false;
        return;
    }

    if (!await validatePhone(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        // Re-enable submit button and hide loading message
        document.getElementById('conf').disabled = false;
        return;
    }
    
    var obj = {username: document.getElementById('username').innerText.trim(),
        email,phone 
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
    let message_id = ""
    if(x != "N"){
        await fetch('./cart/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }).then((response) => response.json())
        .then((response)=>{
            if(response.message != "ok"){alert(response.message); return}
            message_id = response._id;
            
        }) 
        alert(x);
    }
    else{
        alert("Something went wrong with contact information")
        window.location.href = window.location.href.split("cart")[0]+"orders"
    }   
    obj2 = {_id : message_id, email:obj.email}
    try {
        await fetch('./cart/mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj2),
            credentials: "include"
        }).then((response) => response.json())
        .then((response) => {
            x = response.message
        })
    } catch (error) {
        alert("mail can not be sent")
    }
    document.getElementById("det").style.display = "none"
    window.location.href = window.location.href.split("cart")[0]+"orders"
}
