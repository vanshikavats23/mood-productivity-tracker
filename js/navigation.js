const links = document.querySelectorAll(".nav a");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const target = link.getAttribute("href");
    const page = document.querySelector(".page");

    page.classList.add("page-exit");

    setTimeout(() => {
      window.location.href = target;
    }, 300);
  });
});
