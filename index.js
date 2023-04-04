// using DOM Manipulation, create stickers array
const stickers = document.querySelectorAll(".sticker");

// main function which begins sticker movement
function makeDraggable(sticker) {
  sticker.onclick = function (e) {
    // when sticker is clicked, clone it in its current pos and create
    // a parent element variable. Move it out of any current parents
    // directly into body, make it positioned relative to the body &
    // make clone draggable, appending it to parent element variable
    const clone = sticker.cloneNode(true);
    const stickerParent = sticker.parentElement;
    document.body.append(sticker);
    stickerParent.append(clone);
    makeDraggable(clone);

    // centers the sticker at pageX and pageY (webpage) returning half of the
    // width and height of the sticker using the values as coordinates under the mouse
    function centerSticker(pageX, pageY) {
      sticker.style.left = pageX - sticker.offsetWidth / 2 + "px";
      sticker.style.top = pageY - sticker.offsetHeight / 2 + "px";
    }

    // call centerSticker which moves sticker under middle of the
    // pointer, taking the event parameter which is attached to the initial onclick event
    centerSticker(e.pageX, e.pageY);

    // while the mouse is moving, perform the centerSticker callback function, which
    // makes the sticker follow the mouse while it is moving via onMouseMove
    function onMouseMove(e) {
      centerSticker(e.pageX, e.pageY);
    }

    // use the onMouseMove callback function while the mouse is moving
    document.addEventListener("mousemove", onMouseMove);

    // drop the sticker on button depress, make it unselectable
    const dropSticker = document.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", onMouseMove);
      sticker.onmouseup = null;
      sticker.onclick = null;
    });

    // create deleteIcon, append it to side of sticker
    let deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/cross.png";
    deleteIcon.style.height = "15px";
    deleteIcon.style.position = "absolute";
    deleteIcon.style.paddingTop = "9.5px";
    sticker.append(deleteIcon);

    // add event listener to deleteIcon
    deleteIcon.addEventListener("click", deleteSticker);

    // add "delete" class to deleted sticker and delete it
    function deleteSticker(e) {
      let currentSticker = e.target.sticker;
      sticker.setAttribute("class", "delete");
    }
  };
}

// loop through stickers array, applying makeDraggable to all
stickers.forEach(makeDraggable);
