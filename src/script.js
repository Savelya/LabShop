


function sendRequest(method, url, name, manufacturer, price) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send(`name=${name}&manufacturer=${manufacturer}&price=${price}`);
    return {
        status: xhr.status,
        responseText: xhr.responseText
    }
}

function Add() {
    const result = sendRequest('POST', 'http://localhost:3000/product', document.getElementById("name").value, document.getElementById("manufacturer").value, document.getElementById("price").value);
    alert(`Code = ${result.status}. Text = ${result.responseText}`);
}

function Info() {
    let d = document.getElementById("name").value;
    const result = sendRequest('GET', `http://localhost:3000/product?name=${d}`);
    alert(`Code = ${result.status}. Text = ${result.responseText}`);
}

function Order() {
    let d = document.getElementById("name").value;
    const result = sendRequest('POST', `http://localhost:3000/order?name=${d}`);
    alert(`Code = ${result.status}. Text = ${result.responseText}`);
}

function Del() {
    let d = document.getElementById("name").value;
    const result = sendRequest('DELETE', `http://localhost:3000/product?name=${d}`);
    alert(`Code = ${result.status}. Text = ${result.responseText}`);
}

function Balance() {
    const result = sendRequest('GET', `http://localhost:3000/balance`);
    alert(`Code = ${result.status}. Text = ${result.responseText}`);
}

function Goods() {
    const result = sendRequest('GET', `http://localhost:3000/goods`);
    alert(`Code = ${result.status}. Text = ${result.responseText}`);
}

function Orderget() {
    const result = sendRequest('GET', `http://localhost:3000/order`);
    alert(`Code = ${result.status}. Text = ${result.responseText}`);
}

console.log('2');