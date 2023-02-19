var data = {}

var chars = [
    "All", "Virtual Singer Ver.",
    "Hatsune Miku", "Kagamine Rin", "Kagamine Len", "Megurine Luka", "MEIKO", "KAITO", // Piapro Vocaloids
    "Ichika Hoshino", "Saki Tenma", "Honami Mochizuki", "Shiho Hinomori", // Leo/need
    "Minori Hanasato", "Haruka Kiritani", "Airi Momoi", "Shizuku Hinomori", // MORE MORE JUMP!
    "Kohane Azusawa", "An Shiraishi", "Akito Shinonome", "Toya Aoyagi", // Vivd Bad SQUAD
    "Tsukasa Tenma", "Emu Otori", "Nene Kusanagi", "Rui Kamishiro", // Wonderlands x Showtime
    "Kanade Yoisaki", "Mafuyu Asahina", "Ena Shinonome", "Mizuki Akiyama", // Nightcord at 25:00
//    "flower" // Other Vocaloids (currently none)
]

var charsel = document.getElementById("char")
for (var char in chars) {
    var sel = document.createElement("option")
    sel.value = chars[char]
    sel.innerText = chars[char]
    charsel.appendChild(sel)
}

function updateData(dataNew) {
    data = dataNew
    updateTable()
}

function updateTable() {
    var table = document.getElementById("covertable");
    table.innerHTML = "<tr><th>Song Name</th><th>Cover Singers</th><th>JP Release Date</th><th>Twitter Announcement Link</th><th>Song Wiki Link</th></tr>"
    for (var date in data) {
        var annoucement = data[date].announcement
        for (let i = 0; i < data[date].songs.length; i++) {
            var name = data[date].songs[i].name
            for (let ii=0; ii < data[date].songs[i].covers.length; ii++) {
                var singers = data[date].songs[i].covers[ii]
                if (charsel.value != "All") {
                    if (charsel.value != "Virtual Singer Ver.") {if (singers.includes("Virtual Singer Ver.")) {continue}} // Not Virtual Singer Ver. selected do not show Virtual Singer Vers
                    if (!singers.includes(charsel.value)) {continue} // Do not show non selected chars
                }
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                td.innerText = name
                tr.appendChild(td)
                var td = document.createElement("td");
                td.innerText = singers
                tr.appendChild(td)
                var td = document.createElement("td");
                td.innerText = date
                tr.appendChild(td)
                var td = document.createElement("td");
                var a = document.createElement("a");
                if (data[date].songs[i].hasOwnProperty("release") && data[date].songs[i].release) {
                    a.innerText = "None"
                } else {
                    a.href = annoucement
                    a.innerText = "Twitter"
                    a.target = "_blank"
                }
                td.appendChild(a)
                tr.appendChild(td)
                var td = document.createElement("td");
                var a = document.createElement("a");
                a.href = "https://projectsekai.fandom.com/wiki/" + name.replaceAll(" ", "_")
                a.innerText = "Fandom"
                a.target = "_blank"
                td.appendChild(a)
                tr.appendChild(td)
                table.appendChild(tr)
            }
        }
    }
}

fetch("vocals.json")
    .then((response) => response.json())
    .then((data) => updateData(data))
