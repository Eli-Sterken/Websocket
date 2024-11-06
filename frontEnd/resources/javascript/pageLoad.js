async function main() {
    const request = await fetch("/resources/footer.html", {method: "GET", mode:"cors"});
    const e = document.createElement("div");
    e.id = "footerC"
    e.innerHTML = await request.text();
    document.getElementsByTagName("body")[0].appendChild(e);
};

main()