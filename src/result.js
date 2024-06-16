document.addEventListener("DOMContentLoaded", () => {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    if (params.has("result")) {
        if (params.get("result") === "true") {
            document.getElementById("result").innerText = "同意";
        }
        else {
            document.getElementById("result").innerText = "不同意";
        }
    }
    else {
        let result = localStorage.getItem("result");
        if (result === "true") {
            document.getElementById("result").innerText = "同意";
        }
        else if (result === "false") {
            document.getElementById("result").innerText = "不同意";
        }
        else {
            window.location.href = window.location.origin;
        }
    }
    localStorage.setItem("result", null);
})