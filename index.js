var components = 0

// the function to make the delete icon on tags work
function delSvgToLi(clicked_id) {
  svg = document.getElementById(clicked_id); // find the svg 
  svg.parentElement.parentElement.remove(); // remove the tag
  ms = document.getElementById("materialStuff");
  fi = document.getElementById("finishStuff")
  co = document.getElementById("colorStuff")
  re = document.getElementById("renderStuff")
  fi.innerHTML = ""
  re.innerHTML = ""
  if (clicked_id == "delSvg#0") {
    co.innerHTML = ""
    ele = document.getElementById("colorText")
    ele.innerHTML = ""
  } else if (clicked_id == "delSvg#1") {
    ms.innerHTML = ""
    ele = document.getElementById("materialText")
    ele.innerHTML = ""
  } else if (clicked_id == "delSvg#2") {
    fi.innerHTML = ""
    ele = document.getElementById("finishText")
    ele.innerHTML = ""
  } else {
    re.innerHTML = ""
    ele = document.getElementById("renderText")
    ele.innerHTML = ""
  }
  components -= 1
}

function addStyle() {
  str = "rendering"
  oc = `addColor(${components}, 3)`
  i = components
  li =
    `
    <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
      <li class="nav-item deleteTag" id="deleteTag#${i}">
        <span class="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-light-subtle border border-dark-subtle rounded">
          <img class="rounded-circle me-1" id="thumbnail#${i}" width="18" height="18" src="img/default_${str}.png" alt="">
          <div onclick="${oc}" id="tag#${i}" class="component">
            ${str}
          </div>
          &nbsp&nbsp
          <svg class="bi" width="12" height="12" id="delSvg#3" onclick="delSvgToLi(this.id)">
            <use xlink:href="#x-circle-fill" />
          </svg>
        </span>
      </li>
    </div>
    `
  tagList.insertAdjacentHTML('beforeend', li);
  components++;
}

function addTag() {
  for (var i = 0; i < 3; i++) {
    if (i % 3 == 0) {
      str = "color"
      oc = `addColor(${components}, 0)`
    }
    else if (i % 3 == 1) {
      str = "material"
      oc = `addColor(${components}, 1)`
    }
    else if (i % 3 == 2) {
      str = "finish"
      oc = `addColor(${components}, 2)`
    }
    li =
      //这是每按下便加一个list item,并显示出来
      `
    <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
      <li class="nav-item deleteTag" id="deleteTag#${components}"> 
        <span class="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-light-subtle border border-dark-subtle rounded">
          <img class="rounded-circle me-1" id="thumbnail#${components}" width="18" height="18" src="img/default_${str}.png" alt="">
          <div onclick="${oc}" id="tag#${components}" class="component"> 
            ${str}
          </div>
          &nbsp&nbsp
          <svg class="bi" width="12" height="12" id="delSvg#${components}" onclick="delSvgToLi(this.id)">
            <use xlink:href="#x-circle-fill" />
          </svg>
        </span>
      </li>
    </div>
    `
    tagList.insertAdjacentHTML('beforeend', li);
    components += 1
  }
  console.log(components);
}


//这是每按下便加一个list item,并显示出来
function addInput(text) {
  li =
    `
  <div class="xs-2 col-sm-2 px-3">
      <input id="textInput#${components}" 
             value="${text}" 
             class="form-control textInput component" 
             placeholder=${text}>
  </div>
  `
  tagList.insertAdjacentHTML('beforeend', li);
  li = document.getElementById(`textInput#${components}`)
  const inputHandler = function (e) {
    getFullText()
  }
  li.addEventListener('input', inputHandler)
  components += 1
}

function changeText(tagIdx, cfmIdx, text) {
  tagIdx = parseInt(tagIdx.split("#")[1])
  id1 = `tag#${tagIdx}`
  text1 = text
  // TODO: fix this prompt generation functionality
  if (cfmIdx == 0) {
    id = "colorText"
    text = "in " + text
  } else if (cfmIdx == 1) {
    id = "materialText"
    text = text
  } else if (cfmIdx == 2) {
    id = "finishText"
    text = text
  } else {
    id = "renderText"
    text = text + " style"
  }
  document.getElementById(id1).innerHTML = text1  // change the tag text

  getFullText()
}

function changeThumbnail(tagIdx, cfmIdx, text) {
  tagIdx = parseInt(tagIdx.split("#")[1])
  id = `thumbnail#${tagIdx}`
  img = document.getElementById(id)
  if (cfmIdx == 0) {
    pane = "color"
  } else if (cfmIdx == 1) {
    pane = "material"
  } else if (cfmIdx == 2) {
    pane = "finish"
  } else {
    pane = "render"
  }
  img.src = `img/${pane}/${text}.png`
}

function getFullText() {
  wholeText = ""

  ll = document.getElementsByClassName("component")

  for (var i = 0; i < ll.length; i++) {
    ele = ll[i]
    if (ele.id.startsWith("textInput#")) {
      eleText = ele.value
    } else {
      eleText = ele.innerText;
    }
    wholeText = wholeText + " " + eleText
  }
  document.getElementById("fullText").innerHTML = wholeText
}

const colorList = ['maroon', 'plum', 'purple', 'violet', 'lavender', 'pink', 'mauve',
  'lilac', 'grey', 'brown', 'black', 'indigo', 'blue', 'teal', 'green',
  'aqua', 'olive', 'lime', 'red', 'orange', 'salmon', 'peach', 'mustard',
  'ochre', 'yellow', 'cream']
const materialList = ['leather', 'wood', 'canvas', 'metal', 'rubber', 'diamond', 'plastic',
  'marble', 'concrete', 'gold', 'silver', 'aluminum', 'cloth', 'ceramic', 'liquid']
const finishList = ['gloss', 'high gloss', 'matt', 'brushed', 'polished', 'Satin', 'Antique',
  'hammered', 'embossed', 'debossed', 'oxidation', 'semi gloss', 'broken glass', 'polished plaster']
const renderList = ['3d rendering', 'watercolor', 'oil paint', 'vector art', 'drawn sketch',
  'photorealistic', 'digital art', 'patent drawing', 'cinematic', 'anmie', 'isometric 3d', 'ikea manual',
  'cutaway', 'lowpoly']
function addColor(tagIdx, cfmIdx) {
  ms = document.getElementById("materialStuff");
  fi = document.getElementById("finishStuff")
  co = document.getElementById("colorStuff")
  re = document.getElementById("renderStuff")
  fi.innerHTML = "" //把其他的显示排空
  co.innerHTML = ""
  re.innerHTML = ""
  ms.innerHTML = ""

  if (cfmIdx == 0) {
    pane = "color"
    list = colorList
  } else if (cfmIdx == 1) {
    pane = "material"
    list = materialList
  } else if (cfmIdx == 2) {
    pane = "finish"
    list = finishList
  } else {
    pane = "render"
    list = renderList
  }


  str = ""
  for (let i = 0; i < list.length; i++) {
    initialCap = list[i].charAt(0).toUpperCase() + list[i].slice(1)
    s = `
    <div class="col-sm-1 p-0 m-2">
      <div class="card">
        <img src="img/${pane}/${list[i]}.png" class="card-img" alt="img" style = "height:150px">
        <div id="changeText#${tagIdx}" 
             onclick="changeText(this.id, ${cfmIdx},'${list[i]}'); changeThumbnail(this.id, ${cfmIdx}, '${list[i]}')" 
             class="card-img-overlay align-items-center d-flex justify-content-center">
          <p class="card-text text-center">${initialCap}</p>
        </div>
      </div>
    </div>
    `
    str += s
  }
  // ms.insertAdjacentHTML('afterbegin', str);
  fi.innerHTML = str

}


function showImg() {
  ms = document.getElementById("materialStuff");
  fi = document.getElementById("finishStuff")
  co = document.getElementById("colorStuff")
  re = document.getElementById("renderStuff")
  fi.innerHTML = ""
  co.innerHTML = ""
  re.innerHTML = ""
  ms.innerHTML = ""

  str = `
<div class="row container mx-2">
  <div class="col-sm-3 mb-3">

  <div class="card">
    <img src="img/results/result1.png" class="card-img" alt="img">
  </div>
</div>

<div class="col-sm-3 mb-3">

  <div class="card">
    <img src="img/results/result2.png" class="card-img" alt="img">
  </div>
</div>

<div class="col-sm-3 mb-3">

  <div class="card">
    <img src="img/results/result3.png" class="card-img" alt="img">
  </div>
</div>

<div class="col-sm-3 mb-3">

  <div class="card">
    <img src="img/results/result4.png" class="card-img" alt="img">
  </div>
</div>
</div>

  `
  // ms.insertAdjacentHTML('afterbegin', str);
  re.innerHTML = str

}

function removeAll() {
  document.getElementById("colorText").innerHTML = "";
  document.getElementById("colorStuff").innerHTML = "";

  document.getElementById("finishText").innerHTML = "";
  document.getElementById("finishStuff").innerHTML = "";

  document.getElementById("materialText").innerHTML = "";
  document.getElementById("materialStuff").innerHTML = "";

  document.getElementById("renderText").innerHTML = "";
  document.getElementById("renderStuff").innerHTML = "";

  tags = document.getElementsByClassName("deleteTag")
  while (tags.length > 0) {
    tags[0].parentNode.removeChild(tags[0])
  }
  textInput = document.getElementById("textInput")
  if (textInput != null) {
    textInput.remove()
  }

  components = 0
}