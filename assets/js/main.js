var pages = ['start', 'personality', 'digital'];

loadPages(pages)

async function loadPages(arr) {
    arr.forEach(page => {
        fetch('./pages/' + page + '.html')
            .then(data => data.text())
            .then(html => process(html, page))
    });

    function process(data, id) {
        var newhtml = '<div id="' + id + '"';
        var html = data.replace('<div', newhtml);
        document.getElementById('pages').innerHTML += html;
    }
    await sleep(0.25)
    show('start')
}

function show(el) {
    hideAll()
    document.getElementById(el).classList.remove('hide')
    document.getElementById(el + 'Btn').classList.add('selected')
}

function hideAll() {
    pages.forEach(page => {
        document.getElementById(page).classList.add('hide');
        document.getElementById(page + 'Btn').classList.remove('selected');
    });
}

function splitString(string, search) {
    let isValid = string !== '' // Disallow Empty
        &&
        typeof string === 'string' // Allow strings
        ||
        typeof string === 'number' // Allow numbers

    if (!isValid) {
        return false
    } // Failed
    else {
        string += ''
    } // Ensure string type

    // Search
    let searchIndex = string.indexOf(search)
    let isBlank = ('' + search) === ''
    let isFound = searchIndex !== -1
    let noSplit = searchIndex === 0
    let parts = []

    // Remains whole
    if (!isFound || noSplit || isBlank) {
        parts[0] = string
    }
    // Requires splitting
    else {
        parts[0] = string.substring(0, searchIndex)
        parts[1] = string.substring(searchIndex).slice(0, 1)
        parts[2] = string.substring(searchIndex).slice(0, -1)
    }

    return parts
}

function write(destination, message, speed, type) {
    var i = 0;
    var interval = setInterval(function () {
        if (!type == '') {
            document.getElementById(destination).innerHTML = document.getElementById(destination).innerHTML.slice(0, -1);
        }
        document.getElementById(destination).innerHTML += message.charAt(i) + type;
        i++;
        if (i > message.length) {
            if (!type == '') {
                document.getElementById(destination).innerHTML = document.getElementById(destination).innerHTML.slice(0, -1);
            }
            clearInterval(interval);
        }
    }, speed * 1000);
}

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, (s * 1000)));
}

function startPersonality() {
    document.getElementById('code-display').innerHTML = ''
    codeTicker()

    setInterval(() => {
        document.getElementById('code-display').innerHTML = ''
        codeTicker()
    }, 5000);
}

async function codeTicker() {
    var code = randomcode();
    write('code-display', code, 0.1, '_');

    function randomcode() {
        var code = [];

        for (var i = 0; i < 4; i++) {
            var option = getRandomInt(2);
            var zeroarr = ['I', 'S', 'T', 'J'];
            var onearr = ['E', 'N', 'F', 'P'];

            if (option == 0) {
                code.push(zeroarr[i]);
            } else {
                code.push(onearr[i]);
            }
        }

        return code.join('');
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}