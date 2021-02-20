// Biodiversity

var body = document.body
var help = document.getElementById('help')
help.style.display == 'none'

function toggleTheme() {
    body.className = (body.className == 'th1') ? 'th2' : 'th1'
}

function helpMenu() {
    help.style.display = (help.style.display == 'block') ? 'none' : 'block'
}
