document.addEventListener("DOMContentLoaded", () => {
    const toggleDarkMode = document.getElementById("toggleDarkMode");
    const darkModeIcon = document.getElementById("darkModeIcon");
    const html = document.documentElement;

    function updateTheme() {
        const isDarkMode = localStorage.getItem("darkMode") === "enabled";
        html.setAttribute("data-bs-theme", isDarkMode ? "dark" : "light");

        darkModeIcon.src = isDarkMode ? "/images/lightmode.png" : "/images/darkmode.png";
    }

    updateTheme();

    toggleDarkMode.addEventListener("click", () => {
        const isDarkMode = html.getAttribute("data-bs-theme") === "light";
        localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
        updateTheme();
    });
});
