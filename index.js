var components = 0

function getDeleteTag() {
  return document.getElementsByClassName('deleteTag');
}

function replyDeleteTag(clicked_id) {
  document.getElementById(clicked_id).remove();
}

function delSvgToLi(clicked_id) {  // 这个需要改，因为delSvg顺序开始编号了
  svg = document.getElementById(clicked_id);
  svg.parentElement.parentElement.remove();
  console.log(clicked_id)
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
}

function removeAll() {

  console.log("removeAll");
  document.getElementById("colorText").innerHTML = "";
  document.getElementById("colorStuff").innerHTML= "";

  document.getElementById("finishText").innerHTML = "";
  document.getElementById("finishStuff").innerHTML = "";

  document.getElementById("materialText").innerHTML = "";
  document.getElementById("materialStuff").innerHTML= "";

  document.getElementById("renderText").innerHTML = "";
  document.getElementById("renderStuff").innerHTML = "";

  // 编号变多，需要改

  document.getElementById("deleteTag#0").innerHTML = "";
  document.getElementById("deleteTag#1").innerHTML = "";
  document.getElementById("deleteTag#2").innerHTML = "";
  document.getElementById("deleteTag#3").innerHTML = "";

  document.getElementById("textInput").innerHTML = "";

  // co = document.getElementById("colorStuff")
  // re = document.getElementById("renderStuff")

  // ms.innerHTML = ""
  // fi.innerHTML = ""
  // re.innerHTML = ""
  // co.innerHTML = ""
  
  // ele = document.getElementById("colorText")
  // ele.innerHTML = ""
  // ele = document.getElementById("materialText")
  // ele.innerHTML = ""
  // ele = document.getElementById("finishText")
  // ele.innerHTML = ""
  // ele = document.getElementById("renderText")
  // ele.innerHTML = ""
}

function addStyle(){
  components ++;
  str = "rendering"
  oc = "addRender()" 
  i = components
  li = 
  `
    <li class="nav-item deleteTag" id="deleteTag#${i}">
      <span class="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-light-subtle border border-dark-subtle rounded">
        <img class="rounded-circle me-1" id="${i}_thumbnail" width="18" height="18" src="img/default_${str}.png" alt="">
        <div onclick="${oc}" id="tag#${i}">
          ${str}
        </div>
        &nbsp&nbsp
        <svg class="bi" width="12" height="12" id="delSvg#3" onclick="delSvgToLi(this.id)">
          <use xlink:href="#x-circle-fill" />
        </svg>
      </span>
    </li>
    `
  tagList.insertAdjacentHTML('beforeend', li);
}

function addTag() {
  tagStart = components;
  components += 3;
  tagEnd = components;
  for(var i = tagStart; i < tagEnd; i++){
    if (i % 3 == 0) {
     str = "color"
     oc = "addColor()"
    }
    else if (i % 3 == 1) {
    str = "finish"
    oc = "addFinish()"
    }
    else if (i % 3 == 2) {
      str = "material"
      oc = "addMaterial()"
    }
     li =
  //这是每按下便加一个list item,并显示出来
  `
    <li class="nav-item deleteTag" id="deleteTag#${i}"> 
      <span class="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-light-subtle border border-dark-subtle rounded">
        <img class="rounded-circle me-1" id="${i}_thumbnail" width="18" height="18" src="img/default_${str}.png" alt="">
        <div onclick="${oc}" id="tag#${i}"> 
          ${str}
        </div>
        &nbsp&nbsp
        <svg class="bi" width="12" height="12" id="delSvg#${i}" onclick="delSvgToLi(this.id)">
          <use xlink:href="#x-circle-fill" />
        </svg>
      </span>
    </li>
    `
  tagList.insertAdjacentHTML('beforeend', li);

    } 
    console.log(components);
  }

  

function addInput(text) {
  li =
  //这是每按下便加一个list item,并显示出来
  `
  <div class="xs-2 col-sm-1" id="textInput">
    <form role="search">
      <input id="objName" value="${text}" class="form-control" placeholder=${text}>
    </form>
  </div>
    `
  tagList.insertAdjacentHTML('beforeend', li);
}

  // 这个feature我写不明白... 
  // 我重新写了一个getFullText 的功能去cancatenate所有的文字，但是有点问题
  // 这整个function估计都要重新写

function changeText(index, text) {
  id1 = `tag#${index}`
  text1 = text
  if (index == 0) {
    id = "colorText"
    text = "in " + text
  } else if (index == 1) {
    id = "materialText"
    text = text
  } else if (index == 2) {
    id = "finishText"
    text = text 
  } else {
    id = "renderText"
    text =  text + " style"
  }
  // document.getElementById(id).innerHTML = text  // change the text itself
  document.getElementById(id1).innerHTML = text1  // change the tag text

  getFullText()
  // 拼凑成一句话的function
}

function getFullText(){
  wholeText = ""

  for(var i = 0; i < components; i++){
    ele = document.getElementById(`tag#${i}`) 
    eleText = ele.innerText;
    console.log(eleText)
    wholeText = wholeText + " " + eleText
    console.log(wholeText)
  }
  document.getElementById("fullText").innerHTML = wholeText
}

function changeThumbnail(index,name) {
  if (index == 0) {
    category = "color"
  } else if (index == 1) {
    category = "material" 
  } else if (index == 2) {
    category = "finish"
  } else {
    category = "rendering"
  }
  document.getElementById("${index}_thumbnail").src = "img/${category}/${name}.png"
  // document.getElementById("1_thumbnail").src = "img/material/leather.png"

  // 这个function没能成功update缩略图，需要改
}

function addMaterial() {
  ms = document.getElementById("materialStuff");
  fi = document.getElementById("finishStuff")
  co = document.getElementById("colorStuff")
  re = document.getElementById("renderStuff")
  fi.innerHTML = ""
  co.innerHTML = ""
  re.innerHTML = ""

  str = `

<div class="col-sm-2 mb-3">

<div class="card">
  <img src="img/material/leather.png" class="card-img" alt="img">
  <div onclick="changeText(1,'leather')" class="card-img-overlay align-items-center d-flex justify-content-center">
    <p class="card-text text-center">Leather</p>
  </div>
</div>
</div>

<div class="col-sm-2 mb-3">

<div class="card">
  <img src="img/material/wood.png" class="card-img" alt="img">
  <div onclick="changeText(1,'wood')" class="card-img-overlay align-items-center d-flex justify-content-center">
    <p class="card-text text-center">Wood</p>
  </div>
</div>
</div>


<div class="col-sm-2 mb-3">

<div class="card">
  <img src="img/material/canvas.png" class="card-img" alt="img">
  <div onclick="changeText(1,'canvas')" class="card-img-overlay align-items-center d-flex justify-content-center">
    <p class="card-text text-center">Canvas</p>
  </div>
</div>
</div>

<div class="col-sm-2 mb-3">

<div class="card">
  <img src="img/material/metal.png" class="card-img" alt="img">
  <div onclick="changeText(1,'metal')" class="card-img-overlay align-items-center d-flex justify-content-center">
    <p class="card-text text-center">Metal</p>
  </div>
</div>
</div>

<div class="col-sm-2 mb-3">

<div class="card">
  <img src="img/material/rubber.png" class="card-img" alt="img">
  <div onclick="changeText(1,'rubber')" class="card-img-overlay align-items-center d-flex justify-content-center">
    <p class="card-text text-center">Rubber</p>
  </div>
</div>
</div>

<div class="col-sm-2 mb-3">

<div class="card">
  <img src="img/material/diamond.png" class="card-img" alt="img">
  <div onclick="changeText(1,'diamond')" class="card-img-overlay align-items-center d-flex justify-content-center">
    <p class="card-text text-center">Diamond</p>
  </div>
</div>
</div>

<div class="col-sm-2 mb-3">

<div class="card">
  <img src="img/material/plastic.png" class="card-img" alt="img">
  <div onclick="changeText(1,'plastic')" class="card-img-overlay align-items-center d-flex justify-content-center">
    <p class="card-text text-center">Plastic</p>
  </div>
</div>
</div>


<div class="col-sm-2 mb-3">

<div class="card">
  <img src="img/material/marble.png" class="card-img" alt="img">
  <div onclick="changeText(1,'marble')" class="card-img-overlay align-items-center d-flex justify-content-center">
    <p class="card-text text-center">Marble</p>
  </div>
</div>
</div>


<div class="col-sm-2 mb-3">

<div class="card">
  <img src="img/material/concrete.png" class="card-img" alt="img">
  <div onclick="changeText(1,'concrete')" class="card-img-overlay align-items-center d-flex justify-content-center">
    <p class="card-text text-center">Concrete</p>
  </div>
</div>
</div>

<div class="col-sm-2 mb-3">

<div class="card">
  <img src="img/material/gold.png" class="card-img" alt="img">
  <div onclick="changeText(1,'gold')" class="card-img-overlay align-items-center d-flex justify-content-center">
    <p class="card-text text-center">Gold</p>
  </div>
</div>
</div>

<div class="col-sm-2 mb-3">

<div class="card">
  <img src="img/material/silver.png" class="card-img" alt="img">
  <div onclick="changeText(1,'silver')" class="card-img-overlay align-items-center d-flex justify-content-center">
    <p class="card-text text-center">Gold</p>
  </div>
</div>
</div>

<div class="col-sm-2 mb-3">

<div class="card">
  <img  src="img/material/aluminum.png" class="card-img" alt="img">
  <div onclick="changeText(1,'aluminum'); changeThumbnail(1,'aluminum')" class="card-img-overlay align-items-center d-flex justify-content-center">
    <p class="card-text text-center">Aluminum</p>
  </div>
</div>
</div>

<div class="col-sm-2 mb-3">

<div class="card">
  <img  src="img/material/cloth.png" class="card-img" alt="img">
  <div onclick="changeText(1,'cloth'); changeThumbnail(1,'cloth')" class="card-img-overlay align-items-center d-flex justify-content-center">
    <p class="card-text text-center">Cloth</p>
  </div>
</div>
</div>

<div class="col-sm-2 mb-3">

<div class="card">
  <img  src="img/material/ceramic.png" class="card-img" alt="img">
  <div onclick="changeText(1,'ceramic'); changeThumbnail(1,'ceramic')" class="card-img-overlay align-items-center d-flex justify-content-center">
    <p class="card-text text-center">Ceramic</p>
  </div>
</div>
</div>

<div class="col-sm-2 mb-3">

<div class="card">
  <img  src="img/material/liquid.png" class="card-img" alt="img">
  <div onclick="changeText(1,'liquid'); changeThumbnail(1,'liquid')" class="card-img-overlay align-items-center d-flex justify-content-center">
    <p class="card-text text-center">Liquid</p>
  </div>
</div>
</div>

  `
  // ms.insertAdjacentHTML('afterbegin', str);
  ms.innerHTML = str

}

function addFinish() {
  ms = document.getElementById("materialStuff");
  fi = document.getElementById("finishStuff")
  co = document.getElementById("colorStuff")
  re = document.getElementById("renderStuff")
  fi.innerHTML = "" //把其他的显示排空
  co.innerHTML = ""
  re.innerHTML = ""
  ms.innerHTML = ""

  str = `

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/finish/gloss.png" class="card-img" alt="img">
    <div onclick="changeText(2,'gloss')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Gloss</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">
  <div class="card">
    <img src="img/finish/high gloss.png" class="card-img" alt="img">
    <div onclick="changeText(2,'high gloss')" class="card-img-overlay align-items-center d-flex justify-content-center ">
      <p class="card-text text-center">High gloss</p>
    </div>
  </div>
</div>


<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/finish/matt.png" class="card-img" alt="img">
    <div onclick="changeText(2,'matt')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Matt</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/finish/brushed.png" class="card-img" alt="img">
    <div onclick="changeText(2,'brushed')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Brushed</p>
    </div>
  </div>
</div>


<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/finish/polished.png" class="card-img" alt="img">
    <div onclick="changeText(2,'polished')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Polished</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/finish/Satin.png" class="card-img" alt="img">
    <div onclick="changeText(2,'satin')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Satin</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/finish/Antique.png" class="card-img" alt="img">
    <div onclick="changeText(2,'antique')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Antique</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/finish/hammered.png" class="card-img" alt="img">
    <div onclick="changeText(2,'hammered')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Hammered</p>
    </div>
  </div>
</div>


<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/finish/embossed.png" class="card-img" alt="img">
    <div onclick="changeText(2,'embossed')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Embossed</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/finish/debossed.png" class="card-img" alt="img">
    <div onclick="changeText(2,'debossed')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Debossed</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/finish/oxidation.png" class="card-img" alt="img">
    <div onclick="changeText(2,'oxidation')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Oxidation</p>
    </div>
  </div>
</div>


<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/finish/semi gloss.png" class="card-img" alt="img">
    <div onclick="changeText(2,'semi gloss')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Semi Gloss</p>
    </div>
  </div>
</div>


<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/finish/broken glass.png" class="card-img" alt="img">
    <div onclick="changeText(2,'broken glass')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Broken Glass</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/finish/polished plaster.png" class="card-img" alt="img">
    <div onclick="changeText(2,'polished plaster')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Polished Plaster</p>
    </div>
  </div>
</div>
  `
  // ms.insertAdjacentHTML('afterbegin', str);
  fi.innerHTML = str

}

function addRender() {
  ms = document.getElementById("materialStuff");
  fi = document.getElementById("finishStuff")
  co = document.getElementById("colorStuff")
  re = document.getElementById("renderStuff")
  fi.innerHTML = ""
  co.innerHTML = ""
  re.innerHTML = ""
  ms.innerHTML = ""

  str = `

  <div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/rendering/3d rendering.png" class="card-img" alt="img">
    <div onclick="changeText(3,'3d rendering')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">3D Rendering</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/rendering/watercolor.png" class="card-img" alt="img">
    <div onclick="changeText(3,'watercolor')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text mb-0">Watercolor</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/rendering/oil paint.png" class="card-img" alt="img">
    <div onclick="changeText(3,'oil paint')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text mb-0">Oil Paint</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/rendering/vector art.png" class="card-img" alt="img">
    <div onclick="changeText(3,'vector art')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text mb-0">Vector Art</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/rendering/drawn sketch.png" class="card-img" alt="img">
    <div onclick="changeText(3,'drawn sketch')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text mb-0">Drawn Sketch</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/rendering/photorealistic.png" class="card-img" alt="img">
    <div onclick="changeText(3,'photorealistic')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Photorealistic</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/rendering/digital art.png" class="card-img" alt="img">
    <div onclick="changeText(3,'digital art')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text mb-0">Digital Art</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/rendering/patent drawing.png" class="card-img" alt="img">
    <div onclick="changeText(3,'patent drawing')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text mb-0">Patent Drawing</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/rendering/cinematic.png" class="card-img" alt="img">
    <div onclick="changeText(3,'cinematic')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text mb-0">Cinematic</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/rendering/anmie.png" class="card-img" alt="img">
    <div onclick="changeText(3,'anmie')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text mb-0">Anmie</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/rendering/isometric 3d.png" class="card-img" alt="img">
    <div onclick="changeText(3,'isometric 3d')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text mb-0">Isometric 3d</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/rendering/ikea manual.png" class="card-img" alt="img">
    <div onclick="changeText(3,'ikea manual')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text mb-0">Ikea Manual</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/rendering/cutaway.png" class="card-img" alt="img">
    <div onclick="changeText(3,'cutaway')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text mb-0">Cutaway</p>
    </div>
  </div>
</div>

<div class="col-sm-2 mb-3">

  <div class="card">
    <img src="img/rendering/lowpoly.png" class="card-img" alt="img">
    <div onclick="changeText(3,'lowpoly')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text mb-0">Lowpoly</p>
    </div>
  </div>
</div>
  `
  // ms.insertAdjacentHTML('afterbegin', str);
  re.innerHTML = str

}

function addColor() {
  ms = document.getElementById("materialStuff");
  fi = document.getElementById("finishStuff")
  co = document.getElementById("colorStuff")
  re = document.getElementById("renderStuff")
  fi.innerHTML = "" //把其他的显示排空
  co.innerHTML = ""
  re.innerHTML = ""
  ms.innerHTML = ""

  str = `

<div class="col-sm-1 p-0 m-2">

<div class="card">
<img src="img/color/maroon.png" class="card-img" alt="img" style = "height:150px">
<div onclick="changeText(0,'maroon')" class="card-img-overlay align-items-center d-flex justify-content-center">
  <p class="card-text text-center">Maroon</p>
</div>
</div>


</div>

<div class="col-sm-1 p-0 m-2">

  <div class="card">
    <img src="img/color/plum.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'plum')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Plum</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">
  <div class="card">
    <img src="img/color/purple.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'purple')" class="card-img-overlay align-items-center d-flex justify-content-center ">
      <p class="card-text text-center">Purple</p>
    </div>
  </div>
</div>


<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/violet.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'violet')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Violet</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/lavender.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'lavender')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Lavender</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/pink.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'pink')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Pink</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/mauve.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'mauve')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Mauve</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/lilac.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'lilac')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Lilac</p>
    </div>
  </div>
</div>


<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/grey.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'grey')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Grey</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/brown.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'brown')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Brown</p>
    </div>
  </div>
</div>


<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/black.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'black')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Black</p>
    </div>
  </div>
</div>


<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/indigo.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'indigo')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Indigo</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/blue.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'blue')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Blue</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/teal.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'teal')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Teal</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/green.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'green')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Green</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/aqua.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'aqua')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Aqua</p>
    </div>
  </div>
</div>



<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/olive.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'olive')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Olive</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/lime.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'lime')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Lime</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">
<div class="card">
<img src="img/color/red.png" class="card-img" alt="img" style = "height:150px">
<div onclick="changeText(0,'red')" class="card-img-overlay align-items-center d-flex justify-content-center">
  <p class="card-text text-center">Red</p>
</div>
</div>


</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/orange.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'orange')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Orange</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/salmon.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'salmon')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Salmon</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/peach.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'peach')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Peach</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/mustard.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'mustard')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Mustard</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/ochre.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'ochre')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Ochre</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/yellow.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'yellow')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Yellow</p>
    </div>
  </div>
</div>

<div class="col-sm-1 m-2 p-0">

  <div class="card">
    <img src="img/color/cream.png" class="card-img" alt="img" style = "height:150px">
    <div onclick="changeText(0,'cream')" class="card-img-overlay align-items-center d-flex justify-content-center">
      <p class="card-text text-center">Cream</p>
    </div>
  </div>
</div>

  `
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
