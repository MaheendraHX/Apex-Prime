window.addEventListener("load", () => {

    const splash = document.getElementById("splash-screen");

    const nav = document.querySelector("nav");
    const title = document.querySelector(".hero-content h1");
    const text = document.querySelector(".hero-content p");
    const button = document.querySelector(".btn");

    // Logo stays visible for 2.5 seconds

    setTimeout(() => {

        // Fade only the logo

        splash.classList.add("fade");

        // Remove splash after logo fades

        setTimeout(() => {

            splash.remove();

            // Animate website

            nav.classList.add("show");

            setTimeout(() => {

                title.classList.add("show");

            },200);

            setTimeout(() => {

                text.classList.add("show");

            },500);

            setTimeout(() => {

                button.classList.add("show");

            },800);

        },1300);

    },2500);

});
