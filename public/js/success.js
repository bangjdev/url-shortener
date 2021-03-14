const spanLink = document.getElementById("short-link");
const spanSlug = document.getElementById("slug");
spanLink.value = `${window.location.origin}/${spanSlug.innerText}`;

const goToLink = () => {
    window.open(`${document.getElementById("short-link").value}`);
}

const copyToClipboard = () => {
    spanLink.select();
    document.execCommand("copy");
}