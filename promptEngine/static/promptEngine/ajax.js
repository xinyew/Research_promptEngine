
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

function updateList(items) {
    ms = document.getElementById("materialStuff");
    fi = document.getElementById("finishStuff")
    co = document.getElementById("colorStuff")
    re = document.getElementById("renderStuff")
    fi.innerHTML = ""
    co.innerHTML = ""
    re.innerHTML = ""
    ms.innerHTML = ""

    str = `<div class="row container mx-2" id = "displayImg">`
    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        let ele = `
        <div class="col-sm-3 mb-3">
            <div class="card">
                <img src="${item.img_path}" class="card-img" alt="img">
            </div>
        </div>
        `
        str += ele
    }
    str += `</div>`
    //     str = `
    //   <div class="row container mx-2" id = "displayImg">
    //     <div class="col-sm-3 mb-3">

    //     <div class="card">
    //       <img src="/static/promptEngine/img/results/result1.png" class="card-img" alt="img">
    //     </div>
    //   </div>

    //   <div class="col-sm-3 mb-3">

    //     <div class="card">
    //       <img src="/static/promptEngine/img/results/result2.png" class="card-img" alt="img">
    //     </div>
    //   </div>

    //   <div class="col-sm-3 mb-3">

    //     <div class="card">
    //       <img src="/static/promptEngine/img/results/result3.png" class="card-img" alt="img">
    //     </div>
    //   </div>

    //   <div class="col-sm-3 mb-3">

    //     <div class="card">
    //       <img src="/static/promptEngine/img/results/result4.png" class="card-img" alt="img">
    //     </div>
    //   </div>
    //   </div>
    //     `
    re.innerHTML = str
}