var components = 0 //keep track of how many components are there
var tagRows = 0

// the function to make the delete icon on tags work
function delSvgToLi(clicked_id) {
  svg = document.getElementById(clicked_id); // find the svg 
  svg.parentElement.parentElement.remove(); // remove the tag
  ms = document.getElementById("materialStuff");
  fi = document.getElementById("finishStuff")
  co = document.getElementById("colorStuff")
  re = document.getElementById("renderStuff")
  // fi.innerHTML = "" // why?
  // re.innerHTML = ""
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
  checkTagListNull()
  // components -= 1
  prevCommaToWith()
}

// only check tag list when delete element from the tag list
function checkTagListNull() {
  // check if deleteTag is inside the tagList,
  // if not, empty the whole tagList
  for (var i = 0; i < 10; i++) {
    id = `tagList${i}`
    elem = document.getElementById(id)
    let numb = elem.getElementsByClassName("deleteTag").length;
    if (numb == 0) {
      console.log("no delete tag")
      elem.innerHTML = ""
    }
  }
}


function addStyle() {
  str = "rendering"
  fakeComponents = 100
  oc = `addColor(${fakeComponents}, 3)`
  i = fakeComponents
  var element = document.getElementById('tag#100');
  if (element == null) {
    li =
      `
      <li class="nav-item deleteTag">
        <span class="badge d-flex align-items-center p-1 pe-2 text-body-tertiary bg-light-subtle border border-dark-subtle rounded" id="deleteTag#${i}">
          <img class="rounded-circle me-1" id="thumbnail#${i}" width="18" height="18" src="/static/promptEngine/img/default_${str}.png" alt="">
          <div onclick="${oc}; highlightCard(${i})" id="tag#${i}" class="component">
          rendering
          </div>
          &nbsp&nbsp
          <svg class="bi" width="12" height="12" id="delSvg#${fakeComponents}" onclick="delSvgToLi(this.id)">
            <use xlink:href="#x-circle-fill" />
          </svg>
        </span>
      </li>
    `

    tagList10.insertAdjacentHTML('beforeend', li);
    getFullText()
  }
  else {
    alert("You may only use select one image style");
  }

}

function addTag() {
  text = ""
  fullTagList = ""
  for (var i = 0; i < 3; i++) {
    if (i % 3 == 0) { // the sequence of adding elements using the loop
      str = "color"
      oc = `addColor(${components}, 0)`
      placeholder = "ivory"
    }
    else if (i % 3 == 1) {
      str = "finish"
      oc = `addColor(${components}, 2)`
      placeholder = "high-gloss"
    }
    else if (i % 3 == 2) {
      str = "material"
      oc = `addColor(${components}, 1)`
      placeholder = "steel"
    }
    li =
      //tag item display below
      `
      <li class="nav-item deleteTag collapse navbar-collapse" > 
        <span class="badge d-flex align-items-center text-body-tertiary bg-light-subtle border border-dark-subtle rounded" id="deleteTag#${components}">
          <img class="rounded-circle me-1" id="thumbnail#${components}" width="18" height="18" src="/static/promptEngine/img/default_${str}.png" alt="">
          <div onclick="${oc}; highlightCard(${components})" id="tag#${components}" class= "component"> 
            ${placeholder}
          </div>
          &nbsp&nbsp
          <svg class="bi" width="12" height="12" id="delSvg#${components}" onclick="delSvgToLi(this.id)">
            <use xlink:href="#x-circle-fill" />
          </svg>
        </span>
      </li>
    `
    tagListNum = Math.floor(components / 4)
    id = `tagList${tagListNum}`

    elem = document.getElementById(id)
    elem.insertAdjacentHTML('beforeend', li);

    components += 1

  }
  // nextTagListNum = tagListNum + 1
  // nextId = `tagList${nextTagListNum}`
  // check whether they still have elements after or not

  comma =
    `
    <p class="component px-1 initialComma"> , </p>
  `
  elem.insertAdjacentHTML('beforeend', comma);
  prevCommaToWith()

}

function prevCommaToWith() {

  const collection = document.getElementsByClassName("initialComma");
  for (let i = 0; i < collection.length; i++) {
    if (!(i == (collection.length - 1))) {
      collection[i].innerHTML = "with"
    } else {
      collection[i].innerHTML = ","
    }
  }
  console.log("changedLastCommaToWith")
  getFullText()

}





function highlightCard(tagId) {

  tagIdx = parseInt(tagId)
  console.log(tagIdx)

  cardId = `deleteTag#${tagIdx}`
  card = document.getElementById(cardId) // get the upper image, not the one clicking on

  const collection = document.getElementsByClassName("badge");
  for (let i = 0; i < collection.length; i++) {
    // collection[i].classList.remove("selectedTag");
    collection[i].classList.remove("bg-dark-subtle");
    collection[i].classList.add("bg-secondary");
    collection[i].classList.remove("border-secondary");
    collection[i].classList.add("border-dark-subtle");
  } //firstly, remove all selectedTag class from the full list

  // document.getElementById(cardId).classList.toggle("selectedTag");
  document.getElementById(cardId).classList.remove("bg-secondary");
  document.getElementById(cardId).classList.add("bg-dark-subtle");

  document.getElementById(cardId).classList.remove("border-dark-subtle");
  document.getElementById(cardId).classList.add("border-secondary");

  document.getElementById(cardId).classList.remove("text-body-tertiary");
  document.getElementById(cardId).classList.add("text-body-emphasis");


}

// function selectedStyle(id) {
//   alert(id);
//   elem = document.getElementById(id)
//   alert(elem.id);
//   elem.parentNode.classList.add("selectedComponent");

// }

function createUl(text) {
  tagListNum = Math.floor(components / 4)
  if (tagListNum >= 10) {
    alert("You may only have 10 elements at the maximum.");
  }
  else {
    addInput(text);
    addTag();
  }
}

// components -> global variable
function addInput(text) {
  li =
    `
    <li class="xs-2 col-sm-4 px-1">
        <input id="tag#${components}"  
              value="${text}" 
              class="form-control textInput component" 
              >
    </li>
    &nbsp
   <p class="component px-1 in"> in</p>
  `
  tagListNum = Math.floor(components / 4)

  id = `tagList${tagListNum}`

  elem = document.getElementById(id)
  elem.insertAdjacentHTML('beforeend', li);

  li = document.getElementById(`tag#${components}`)
  const inputHandler = function (e) { // TODO: know what it means
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
    text = text + "style."
  }
  document.getElementById(id1).innerHTML = text1  // change the tag text
  getFullText()
}

function changeThumbnail(thisId, cfmIdx, text) { //tagIdx is the component 
  componentIdx = parseInt(thisId.split("#")[1])

  id = `thumbnail#${componentIdx}`
  img = document.getElementById(id) // get the upper image, not the one clicking on
  if (cfmIdx == 0) {
    category = "color"
  } else if (cfmIdx == 1) {
    category = "material"
  } else if (cfmIdx == 2) {
    category = "finish"
  } else {
    category = "render"
  }
  img.src = `/static/promptEngine/img/${category}/${text}.png`

  const collection = document.getElementsByClassName("selectedComponent");
  for (let i = 0; i < collection.length; i++) {
    collection[i].classList.toggle("selectedComponent");
  }

  cardIdx = parseInt(thisId.split("#")[2])
  console.log(cardIdx)

  id = `card#${cardIdx}`
  console.log(id)
  document.getElementById(id).classList.toggle("selectedComponent");

}

const colorList = ['maroon', 'plum', 'purple', 'violet', 'lavender', 'pink', 'mauve',
  'lilac', 'grey', 'brown', 'black', 'indigo', 'blue', 'teal', 'green',
  'aqua', 'olive', 'lime', 'red', 'orange', 'salmon', 'peach', 'mustard',
  'ochre', 'yellow', 'cream', 'white']
const materialList = ['leather', 'wood', 'canvas', 'metal', 'rubber', 'diamond', 'plastic',
  'marble', 'concrete', 'gold', 'silver', 'aluminum', 'cloth', 'ceramic', 'liquid']
const finishList = ['gloss', 'high gloss', 'matt', 'brushed', 'polished', 'satin', 'antique',
  'hammered', 'embossed', 'debossed', 'oxidation', 'semi gloss', 'broken glass', 'polished plaster']
const renderList = ['3d rendering', 'watercolor', 'oil paint', 'vector art', 'drawn sketch',
  'photorealistic', 'digital art', 'patent drawing', 'cinematic', 'anmie', 'isometric 3d', 'ikea manual',
  'cutaway', 'lowpoly']
const prepList = [',', 'with', 'in', '&nbsp;in']

const CMFList = colorList.concat(materialList, finishList);


function getFullText() {
  wholeText = ""

  ll = document.getElementsByClassName("component")

  for (var i = 0; i < ll.length; i++) {
    ele = ll[i]

    let tagName = ele.tagName;
    if (tagName === "INPUT") {
      eleText = ele.value
      part = `<span class = "wholeText text-secondary"> ${eleText} </span>`
    } else {
      eleText = ele.innerText;
      if (renderList.includes(eleText)) {
        eleText = eleText + " style"
        part = `<span class = "wholeText"> [${eleText}] </span> .`

        if (ele.parentNode.classList.contains("bg-dark-subtle")) {
          fullText.classList.remove("fw-bolder")
          part = `<span class = "wholeText fw-bolder"> [${eleText}] </span> . `

        }

      } else if (CMFList.includes(eleText)) {
        part = `<span class = "wholeText text-dark"> [${eleText}] </span> `
        if (ele.parentNode.classList.contains("bg-dark-subtle")) {
          fullText.classList.remove("fw-bolder")
          part = `<span class = "wholeText fw-bolder"> [${eleText}] </span> `

        }

      } else if (prepList.includes(eleText)) {
        part = `&nbsp<span class = "wholeText text-secondary"> ${eleText} </span> `
      } else {
        part = `<span class = "wholeText text-secondary">[]</span> `
      }

    }
    wholeText = wholeText + part
  }
  document.getElementById("fullText").innerHTML = wholeText
}

function addColor(tagIdx, cfmIdx) {
  // show the card at the bottom of the documents
  ms = document.getElementById("materialStuff");
  fi = document.getElementById("finishStuff") // why put in this label?
  co = document.getElementById("colorStuff")
  re = document.getElementById("renderStuff")
  fi.innerHTML = ""
  co.innerHTML = ""
  re.innerHTML = ""
  ms.innerHTML = ""
  oneColStyle = false // by default two cols

  if (cfmIdx == 0) { // cfmIdx is for 
    pane = "color"
    list = colorList
    oneColStyle = true
  } else if (cfmIdx == 1) {
    pane = "material"
    list = materialList
  } else if (cfmIdx == 2) {
    pane = "finish"
    list = finishList
  } else if (cfmIdx == 3) {
    pane = "render"
    list = renderList
  }

  str = ""
  for (let i = 0; i < list.length; i++) {
    initialCap = list[i].charAt(0).toUpperCase() + list[i].slice(1)
    if (oneColStyle) {

      // tagIdx:  cmfIdx: change 
      s = `
    
    <div class="col-sm-1 p-0 m-2">
      <div class="card">
        <img src="/static/promptEngine/img/${pane}/${list[i]}.png" id="card#${i}" class="card-img" alt="img" style = "height:150px">
        <div id="changeText#${tagIdx}Card#${i}" 
             onclick="changeText(this.id, ${cfmIdx},'${list[i]}'); changeThumbnail(this.id, ${cfmIdx}, '${list[i]}')" 
             class="card-img-overlay align-items-center d-flex justify-content-center">
          <p class="card-text text-center">${initialCap}</p>
        </div>
      </div>
    </div>
    `}
    else {
      s = `
    <div class="col-sm-2 p-0 m-2">
      <div class="card">
        <img src="/static/promptEngine/img/${pane}/${list[i]}.png" id="card#${i}" class="card-img" alt="img" style = "height:150px">
        <div id="changeText#${tagIdx}Card#${i}" 
             onclick="changeText(this.id, ${cfmIdx},'${list[i]}'); changeThumbnail(this.id, ${cfmIdx}, '${list[i]}')" 
             class="card-img-overlay align-items-center d-flex justify-content-center">
          <p class="card-text text-center">${initialCap}</p>
        </div>
      </div>
    </div>
    `
    }
    str += s
  }

  // if (oneColStyle){
  // s1 = `

  //   <div class="col-sm-1 p-0 m-2">
  //     <div class="card">
  //       <img src="img/color/aqua.png" id="card#${i}" class="card-img" alt="img" style = "height:150px">
  //       <div id="changeText#${tagIdx}Card#${i}" 
  //            onclick="changeText(this.id, ${cfmIdx},'${list[i]}'); changeThumbnail(this.id, ${cfmIdx}, '${list[i]}')" 
  //            class="card-img-overlay align-items-center d-flex justify-content-center">
  //         <input class="card-text text-center"> </input>
  //       </div>
  //     </div>
  //   </div>
  //   `
  // }else{
  // s1 = `
  //     <div class="col-sm-1 p-0 m-2">
  //     <div class="card">
  //       <img src="img/color/aqua.png" id="card#${i}" class="card-img" alt="img" style = "height:150px">
  //       <div id="changeText#${tagIdx}Card#${i}" 
  //            onclick="changeText(this.id, ${cfmIdx},'${list[i]}'); changeThumbnail(this.id, ${cfmIdx}, '${list[i]}')" 
  //            class="card-img-overlay align-items-center d-flex justify-content-center">
  //           <input class="card-text text-center"> </input>
  //       </div>
  //     </div>
  //   </div>
  //   `
  // }
  // str += s1
  fi.innerHTML = str
}

function checkAllSelected() {
  let numb1 = document.getElementsByClassName("component").length;
  let numb2 = document.getElementsByClassName("body-text-emphasis").length;
  if (numb1 == numb2) {
    generateImg();
  }
  else {
    confirm("Not all elements are selected. Do you wish to proceed?");
  }
}

function generateImg() {

  ms = document.getElementById("materialStuff");
  fi = document.getElementById("finishStuff")
  co = document.getElementById("colorStuff")
  re = document.getElementById("renderStuff")
  fi.innerHTML = ""
  co.innerHTML = ""
  re.innerHTML = ""
  ms.innerHTML = ""

  str = `
<div class="row container mx-2" id = "displayImg">
  <div class="col-sm-3 mb-3">

  <div class="card">
    <img src="/static/promptEngine/img/results/result1.png" class="card-img" alt="img">
  </div>
</div>

<div class="col-sm-3 mb-3">

  <div class="card">
    <img src="/static/promptEngine/img/results/result2.png" class="card-img" alt="img">
  </div>
</div>

<div class="col-sm-3 mb-3">

  <div class="card">
    <img src="/static/promptEngine/img/results/result3.png" class="card-img" alt="img">
  </div>
</div>

<div class="col-sm-3 mb-3">

  <div class="card">
    <img src="/static/promptEngine/img/results/result4.png" class="card-img" alt="img">
  </div>
</div>
</div>

  `
  re.innerHTML = str

}

function confirmFinish() {
  confirm("Finish this design task and leave the page");
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

  // align-items-center justify-content-center

  const scriptHTML = `
  <ul class="navbar-nav" id="tagList0">
          </ul>
          <ul class="navbar-nav" id="tagList1">
          </ul>
          <ul class="navbar-nav" id="tagList2">
          </ul>
          <ul class="navbar-nav" id="tagList3">
          </ul>
          <ul class="navbar-nav" id="tagList4">
          </ul>
          <ul class="navbar-nav" id="tagList5">
          </ul>
          <ul class="navbar-nav" id="tagList6">
          </ul>
          <ul class="navbar-nav" id="tagList7">
          </ul>
          <ul class="navbar-nav" id="tagList8">
          </ul>
          <ul class="navbar-nav" id="tagList9">
          </ul>
          <ul class="navbar-nav" id="tagList10">
          </ul>

  `;
  const main = document.getElementById('navbarCollapse');

  main.innerHTML = scriptHTML;
  // document.getElementById("navbarCollapse").innerHTML = ""

  components = 0
  getFullText()
}
