const stickers = [
  (star = document.getElementById("star")),
  (fire = document.getElementById("fire")),
  (heart = document.getElementById("heart")),
  (thumbsup = document.getElementById("+1")),
  (thumbsdown = document.getElementById("-1")),
];

function makeDraggable(sticker) {
  sticker.onmousedown = function (event) {
    const clone = sticker.cloneNode(true);
    const stickerParent = sticker.parentElement;
    // when sticker is clicked, move it out of any current parents directly into body
    // to make it positioned relative to the body, and clone it in its current pos
    document.body.append(sticker);

    // centers the sticker at pageX and pageY coordinates under the mouse
    function centerSticker(pageX, pageY) {
      sticker.style.left = pageX - sticker.offsetWidth / 2 + "px";
      sticker.style.top = pageY - sticker.offsetHeight / 2 + "px";
    }

    // call centerSticker whichmove sticker under the pointer, based on the
    // event parameter which is attached to the mousedown
    centerSticker(event.pageX, event.pageY);

    // while the mouse is moving, perform the centerSticker callback function, which
    // makes the sticker follow the mouse
    function onMouseMove(event) {
      centerSticker(event.pageX, event.pageY);
    }

    // perform the onMouseMove function while the mouse is moving
    document.addEventListener("mousemove", onMouseMove);

    // drop the sticker on button depress, make it unselectable also
    sticker.onmouseup = function (e) {
      document.removeEventListener("mousemove", onMouseMove);
      sticker.onmouseup = null;
      sticker.onmousedown = null;
      console.log(stickerParent);
      stickerParent.append(clone);
    };
  };
}

// Apply makeDraggable to all stickers
stickers.forEach(makeDraggable);
