const LBL = require('line-by-line');
const colors = require('colors');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question(`[1.0.0] What's the file name you're trying to sort.\n`, (res) => {
    console.clear();

    res = res.replace('.txt', '');
    res = res.replace('./', '');

    const file = new LBL(`./${res}.txt`);

    var arr = [],
        crr = {},
        lines = 0;

    file.on('line', function(line) {
        var e = line.match(/.+?(?=\|)/g);
        if (!e) return;
        lines++;

        if (e[1].match(/[.]/g)) {
            return arr.push(Math.round(e[1].replace(/[^0-9]/g, '') / 100))
        }
        arr.push(parseInt(e[1].replace(/[^0-9]/g, '')));
    });

    file.on('end', function() {
        var sum = arr.reduce(function(a, b) {
            return a + b;
        }, 0);

        arr.forEach(function(x) { crr[x] = (crr[x] || 0) + 1; });

        console.log(`Lines Loaded: ${lines}\n`.yellow);

        for (var ev in crr) {
            console.log(`   $${ev} | Amount: ${crr[ev]}`.brightGreen);
        }
        console.log(`\nTotal balance sum: $${sum}`.yellow);
    });

    readline.close()
});
