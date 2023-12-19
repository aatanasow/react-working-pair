function openModal() {
  const modal = document.querySelector(".modal");
  const span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    modal.style.display = "none";
  };
  modal.style.display = "block";
}

export { openModal };
