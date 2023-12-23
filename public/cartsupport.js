async function plus(i) {
    var q = +document.getElementById('q' + i).innerText;
    if (q >= 99) {
        return false
    }
    document.getElementById('q' + i).innerText = q + 1;
    var price = +document.getElementById('p' + i).innerText
    var total = +document.getElementById('t' + i).innerText
    var amount = +document.getElementById('amount').innerText
    document.getElementById('t' + i).innerText = (total + price) + '.00'
    document.getElementById('amount').innerText = (amount + price) + '.00'
    var obj = { username: '<%= user.username %>', id: +i, quantity: q + 1 }
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
    document.getElementById('t' + i).innerText = (total - price) + '.00'
    document.getElementById('amount').innerText = (amount - price) + '.00'
    var obj = { username: '<%= user.username %>', id: +i, quantity: q - 1 }
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
        username: '<%=user.username%>',
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