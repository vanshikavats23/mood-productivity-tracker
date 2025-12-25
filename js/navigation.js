document.querySelectorAll(".nav a").forEach(link => {
  link.onclick = e => {
    e.preventDefault();
    document.querySelector(".page").style.opacity = 0;
    setTimeout(() => location.href = link.href, 250);
  };
});
