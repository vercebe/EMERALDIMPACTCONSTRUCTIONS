document.addEventListener("DOMContentLoaded", function () {
  // Manejo del menú hamburguesa
  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.getElementById("nav-links");

  menuIcon.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });

  const menuLinks = document.querySelectorAll(".navbar ul li a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetHref = this.getAttribute("href");

      if (targetHref.startsWith("#")) {
        e.preventDefault();
        navLinks.classList.remove("show");
        const targetSection = document.querySelector(targetHref);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth",
          });
        }
      } else {
        navLinks.classList.remove("show");
      }
    });
  });

  document.addEventListener("click", function (event) {
    const isClickInsideMenu = navLinks.contains(event.target);
    const isClickOnMenuIcon = menuIcon.contains(event.target);
    if (!isClickInsideMenu && !isClickOnMenuIcon) {
      navLinks.classList.remove("show");
    }
  });

  const homeLink = document.getElementById("home-link");
  homeLink.addEventListener("click", function (event) {
    event.preventDefault();
    if (window.innerWidth <= 768) {
      document.getElementById("video-vertical").scrollIntoView({ behavior: "smooth" });
    } else {
      document.getElementById("videoVideo").scrollIntoView({ behavior: "smooth" });
    }
  });

  localStorage.removeItem("formSubmitted");

  const videoHorizontal = document.getElementById("videoVideo");
  const videoVertical = document.getElementById("video-vertical");

  if (videoHorizontal) {
    videoHorizontal.play().catch((error) => {
      console.error("Error al reproducir video horizontal:", error);
    });
  }

  if (videoVertical) {
    videoVertical.play().catch((error) => {
      console.error("Error al reproducir video vertical:", error);
    });
  }

  const sloganContainer = document.querySelector(".slogan-container");
  sloganContainer.style.display = "none";

  // Mostrar slogan después de 3.5s si no hay transición de formulario
  setTimeout(function () {
    sloganContainer.style.display = "block";
    sloganContainer.classList.add("delayed-appearance");
  }, 3500);

  const parallaxContainer = document.getElementById("Conocenos");
  function applyParallaxEffect() {
    const scrolled = window.pageYOffset;
    const limit = parallaxContainer.offsetTop + parallaxContainer.offsetHeight;
    if (scrolled > parallaxContainer.offsetTop && scrolled <= limit) {
      const parallaxSpeed = 0.1;
      parallaxContainer.style.backgroundPositionY = `${
        (scrolled - parallaxContainer.offsetTop) * parallaxSpeed
      }%`;
    }
  }
  window.addEventListener("scroll", applyParallaxEffect);

  // Email autocompletado
  const popularDomains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
  let isSuggesting = false;
  function applyEmailAutocomplete(emailInput) {
    emailInput.addEventListener("input", function (event) {
      const value = emailInput.value;
      const atIndex = value.indexOf("@");
      if (isSuggesting || event.inputType === "deleteContentBackward") {
        isSuggesting = false;
        return;
      }
      if (atIndex > -1) {
        const domainInput = value.slice(atIndex + 1);
        const matchingDomain = popularDomains.find((domain) =>
          domain.startsWith(domainInput)
        );
        if (matchingDomain && domainInput.length > 0) {
          isSuggesting = true;
          const userInput = value.slice(0, atIndex + 1);
          emailInput.value = userInput + matchingDomain;
          emailInput.setAttribute("type", "text");
          emailInput.setSelectionRange(
            userInput.length + domainInput.length,
            emailInput.value.length
          );
          setTimeout(() => {
            isSuggesting = false;
            emailInput.setAttribute("type", "email");
          }, 0);
        }
      }
    });

    emailInput.addEventListener("keydown", function (event) {
      if (event.key === "Tab") {
        const value = emailInput.value;
        const atIndex = value.indexOf("@");
        if (atIndex > -1 && !value.slice(atIndex + 1).includes(".")) {
          event.preventDefault();
          const userInput = value.slice(0, atIndex);
          const domainInput = value.slice(atIndex + 1);
          const matchingDomain = popularDomains.find((domain) =>
            domain.startsWith(domainInput)
          );
          if (matchingDomain) {
            emailInput.value = userInput + "@" + matchingDomain;
          }
        }
      }
    });
  }

  const emailInputContactanos = document.getElementById("correo");
  if (emailInputContactanos) {
    applyEmailAutocomplete(emailInputContactanos);
  }

  // Mostrar slogan en pantallas pequeñas después de 4 segundos
  setTimeout(function () {
    if (window.innerWidth <= 768) {
      const sloganContainers = document.querySelectorAll(".slogan-container");
      sloganContainers.forEach(function (sloganContainer) {
        sloganContainer.style.display = "flex";
      });
    }
  }, 4000);
});
