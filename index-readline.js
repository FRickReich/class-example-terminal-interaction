// eine weitere art, um mit der konsole daten an unsere app zu übermitteln ist, indem wir während der laufzeit der app, daten übergeben.
// hierfür nutzen wir das nodejs modul readline, das uns erlaubt zeilen in die konsole zu schreiben, und aus den antworten werte zu generieren.

// die erklärungen und beispiele hier fallen kürzer aus als im vorherigen thema, da wir eine vorhandene bibliothek (readline) nutzen, und fast ausschließlich dessen methoden, das ist genau das, was ich erklärte, wie wir in SPA arbeiten, wir nutzen vorhandene bibliotheken, und dessen methoden, wissen aber die LOGIK die im hintergrund passiert, durch unser JS wissen.

// INTERAKTIVE FRAGEN

// referenz: https://www.geeksforgeeks.org/node-js-readline-module/

// wir importieren das modul "readline", das teil von nodeJS ist.
const readline = require('readline');

// wir erstellen ein neues readline interface (eine schnittstelle unserer, mit dem input und dem output der konsole)
//                               konsolen input, konsolen output
var rl = readline.createInterface(process.stdin, process.stdout);

// mit der methode .cursorTo(); setzen wir unseren cursor in der konsole an die gewünschte stelle(links oben, also ist der erste wert horizontal, und der zweite vertikal)
readline.cursorTo(process.stdout, 0, 0);

// mit der methode .clearScreenDown(); löschen wir die inhalte des terminal outputs.
readline.clearScreenDown(process.stdout);

// mit der interface methode .write(); können wir text in er konsole ausgeben (wir können auch console.log(); benutzen)
rl.write("willkommen\n");

// mit der callback methode .question(); stellen wir im terminal eine frage:
//          frage,                   return der antwort
rl.question("Wieviele flaschen milch hast du gekauft? ", (anzahl) => {

    // wenn wir uns mit .cursorTo(); in eine zeile bewegen können wir dort den inhalt auch wieder überschreiben, wir bewegen uns in die erste zeile und..
    readline.cursorTo(process.stdout, 0, 0);

    // können mit der methode .clearLine(); text in einer zeile auch wieder löschen.
    readline.clearLine(process.stdout);

    // und setzen unseren output dort wieder ein

    console.log(`Du hast ${anzahl} flaschen milch gekauft.`);

    // da wir asynchrone programmierung noch nicht gelernt haben, müssen wir weitere fragen innerhalb des callbacks der vorherigen frage stellen, dies wird unter umständen zu sehr großen callback bäumen führen, das wäre im projekt nicht schlimm, und kann später, wenn wir async/await gelernt haben, ja noch verbessert werden.
    rl.question("Wieviele flaschen milch hast du davon getrunken?", (getrunken) =>
    {
        // da wir uns mit der .cursorTo(); methode an eine beliebige stelle im terminal bewegen können, setzen wir unser ergebnis 2 zeilen tiefer in zeile 3.
        readline.cursorTo(process.stdout, 10, 3);

        const uebrig = anzahl - getrunken;

        if(uebrig === 1)
        {
            console.log(`Du hast noch eine flasche übrig.`);    
        }
        else
        {
            console.log(`Du hast noch ${uebrig} flaschen übrig.`);
        }

        // am ende schließen wir die schnittstelle und beenden so unseren input.
        rl.close();
    });
});

// ein paar beispiele für die implementation von readline in eine spiele projekt:

// - welches pokemon möchtest du in den kampf schicken?      => der spieler gibt den namen ein, woraufhin deine app dann im "vorhandenePokemons" array prüft, ob das erfragte pokemon existiert, und es dann zb in der variable "selektiertesPokemon" übergeben wird.
// - wieviel gold du bereit bist für das schwert auszugeben? => der spieler gbt einen wert ein, den er bereit ist dem händler für das schwert zu geben, überschreitet die eingabe den "schmerzgrenzenwert" des händlers, bekommt der spieler das schwert in sein inventar übergeben.
// - passend zur vorherigen frage, könnte man natürlich auch erfragen, wieviel gold der spieler eigentlich überhaupt gerade hat, oder diesen wert mit der obrigen frage zusammen ausgeben, zur hilfestellung
