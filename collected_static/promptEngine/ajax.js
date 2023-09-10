
function getCSRFToken() {
    let cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim()
        if (c.startsWith("csrftoken=")) {
            return c.substring("csrftoken=".length, c.length)
        }
    }
    return "unknown"
}

function generate() {
    prompt = document.getElementById("id_prompt_input_text").value
    prompt_to_save.push(prompt)
    timestamp_to_save.push(timer)
    clicks_to_save.push(0)
    button = document.getElementById('id_button')
    button.innerHTML = `<div class="spinner-border spinner-border-sm" role="status">
        <span class="sr-only"></span>
    </div>`

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return
        updatePage(xhr)
    }

    xhr.open("POST", addItemURL, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("prompt=" + prompt + "&csrfmiddlewaretoken=" + getCSRFToken());
}

function updatePage(xhr) {
    button = document.getElementById('id_button')
    button.innerHTML = `Generate`
    if (xhr.status == 200) {
        let response = JSON.parse(xhr.responseText)
        updateList(response)
        return
    }

    if (xhr.status == 0) {
        displayError("Cannot connect to server")
        return
    }

    if (!xhr.getResponseHeader('content-type') == 'application/json') {
        displayError("Received status=" + xhr.status)
        return
    }

    let response = JSON.parse(xhr.responseText)
    if (response.hasOwnProperty('error')) {
        displayError(response.error)
        return
    }

    displayError(response)
}

