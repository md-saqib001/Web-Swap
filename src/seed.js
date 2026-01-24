import db from './db.js';

const links = [
    "https://theuselessweb.com/",
    "https://hackertyper.com/",
    "https://jacksonpollock.org/",
    "https://paveldogreat.github.io/WebGL-Fluid-Simulation/",
    "https://quickdraw.withgoogle.com/",
    "https://neal.fun/deep-sea/",
    "https://waifu2x.udp.jp/",
    "https://stellarium-web.org/",
    "https://musiclab.chromeexperiments.com/",
    "https://coolors.co/",
    "https://app.diagrams.net/",
    "https://musclewiki.com/",
    "https://radio.garden/",
    "https://flightradar24.com/",
    "https://apod.nasa.gov/",
    "https://nothing-to-watch.port80.ch/",
    "https://www.window-swap.com/",
    "https://www.scribblemaps.com/"
];

// Loop through the list and insert each one
db.serialize(() => {
    const stmt = db.prepare("INSERT INTO links (url) VALUES (?)");

    links.forEach(link => {
        stmt.run(link);
        console.log(`Added: ${link}`);
    });

    stmt.finalize();
    console.log("Seeding complete!");
});

// Note: We don't close the DB here because db.js keeps it open, 
// but the script will finish naturally.