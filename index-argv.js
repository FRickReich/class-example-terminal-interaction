// es gibt 2 arten von interaktion mit javascript applikationen in der konsole.

// die erste ist argumente zum start der applikation zu übergeben, das kennen wir zb von nodemon, wo wir die datei angeben, die wir überwachen wollen, oder die flagge -q, um die ausgabe zu verkürzen. Mit dieser art des applikationsaufrufs können wir also zum start konfigurationen übergeben, oder werte angeben, die wir zum start der applikation benötigen.
// die zweite art, mit der konsole zu interagieren ist, dem user zu erlauben während der laufzeit fragen zu beantworten, falls jemand von euch schon einmal npm init ausgeführt hat, kennt er dieses beispiel. wir starten die app, und im terminal werden uns fragen gestellt wie "wo soll die app hin installiert werden?", oder "wie heisst der author?", wir erfragen daten also während das programm läuft und werten diese aus.

// wir können auch beide arten der interaktion gemeinsam nutzen. also das programm mit flaggen starten, und dann das programm basierend darauf fwährend der laufzeit ragen stellen lassen.

// ======================

// FLAGGEN

// referenz: https://www.digitalocean.com/community/tutorials/nodejs-command-line-arguments-node-scripts

// um eine app zu schreiben, die argumente annimmt, die beim start ausgewertet werden, nutzen wir das vorgegebene array process.argv der NodeJS systembibliothek Process.
// wenn wir die applikation einfach so starten, ohne argumente anzugeben, bekommen wir 2 einträge in process.argv ausgegeben.
console.log(process.argv);

// diese beiden einträge sind die position des lokal installierten nodejs, und der ordner, in dem unsere app ausgeführt wurde.

// starten wir die app jetzt mit einem argument hinter dem dateinamen, bekommen wir mehr einträge in dem array zurück.

// BEISPIELEINGABE: node index-argv.js testargument

// da wir unsere app immer mit argumenten ausführen wollen, 
// können wir unser wissen über die länge des erwähnten arrays nutzen, 
// um das programm wegen fehlender argumente automatisch zu beenden
if (process.argv.length === 2)
{
    console.log('Es wurden keine argumente übergeben! Tschüssi...');
    // mit der methode .exit(); können wir unsere applikation beenden, dafür übergeben wir den wert 1 an die methode.
    process.exit(1);
}

// meist nutzen terminal applikationen (sogenannten cli's - command-line interfaces), also schnittstellen der konsole mit einer applikation sogenannnte "flags",
// flags sind buchstaben oder logische worte wie -f, sowie --file für die angabe von dateien oder -v oder --version für die anzeige der aktuellen version der app.

// wir müssen prüfen ob die erwünschte flag existiert, um sie zu nutzen:
const versionFlag = process.argv.indexOf('--version');

// wenn der .indexOf(); wert von unserer anfrage über -1 liegt, also existiert, dann gib die version der app aus:
if(versionFlag  > -1)
{
    console.log("v1.0.0");

    // nach informationsabfragen, wie einer version, beenden wir das programm:
    process.exit(1);
}

// BEISPIELEINGABE: node index-argv.js --version

// wollen wir per flagge daten übergeben, müssen wir prüfen ob die daten existieren und den darauf folgenden wert dann übergeben:
const usernameFlag = process.argv.indexOf('--username');

// wir erstellen eine leere variable, um dort den usernamen zu speichern, falls er angegeben wird:
let username;

if (usernameFlag > -1) {
    // wir können als angabe für den wert, den wir haben wollen, einfach den nächsten eintrag im process.argv array (also den nächsten eingabetext) verwenden, wir gehen also an die position des letzten geprüften flags, plus 1: (Die logik dafür, können wir auch in unserer array ausgabe sehen)
    username = process.argv[usernameFlag + 1];
}

// BEISPIELEINGABE: node index-argv.js --username Rick

// wenn username nicht undefined ist, also die eingabe geklappt hat, geben wir ihn aus:
if(username !== undefined)
{
    console.log(username);
}

// wenn wir den username jetzt nicht übergeben, steht auch die textausgabe nicht dort.

// BEISPIELEINGABE: node index-argv.js --version

// als test übergeben wir noch eine weitere flagge:
const passwordFlag = process.argv.indexOf('--password');

let password;

if (passwordFlag > -1) {
    password = process.argv[passwordFlag + 1];
}

// jetzt vergleichen wir (als mockup) die werte von username und password und authentifizieren den user:
if(username === "Rick" && password === "1234")
{
    console.log(`User ${username} wurde erfolgreich eingeloggt!`);
}
else
{
    console.log("DU KOMMST HIER NICHT REIN!");
}

// BEISPIELEINGABE: node index-argv.js --username RICK --password 1234

// wir sehen, das wir jetzt authentifiert sind und mit den übergebenen werten machen können, was wir wollen.

// übrigens, da wir spezifisch nach flaggen suchen, und dadurch die reihenfolge egal ist, würde, wenn wir jetzt die versionsabfrage wieder machen, das programm die version anzeigen und dann beenden werden, und den rest ignorieren:

// BEISPIELEINGABE: node index-argv.js --username RICK --password 1234 --version

// bonus: als vereinfachung der prüfung, können wir auch eine funktion schreiben, die true oder false zurückgibt, im falle das ein flag existiert oder nicht.
const doesFlagExist = (flag) => process.argv.indexOf(flag) > -1 ? true : false;

// wir testen, ob wir bei unserer bisherigen eingabe ein true zurück bekommen:
console.log(doesFlagExist("--username"));

// BEISPIELEINGABE: node index-argv.js --username RICK --password 1234

// so können wir natürlich auch auf mehrere flags auf einmal prüfen, und unsere abkürzung, sowie die ausgeschriebene flag gemeinsam nutzen:
if(doesFlagExist("-h") || doesFlagExist("--help"))
{
    console.log("Dies ist die hilfsdokumentation der app...");
}

// BEISPIELEINGABE: node index-argv.js -h
// BEISPIELEINGABE: node index-argv.js --help

// auf diese weise lässt sich natürlich auch eine funktion erstellen, um den entsprechenden wert der flag zu bekommen:
const getFlagValue = (flag) => 
{
    // speichere entweder die position, wenn vorhanden, oder undefined;
    const flagPosition = process.argv.indexOf(flag) > 1 ? process.argv.indexOf(flag) : undefined;

    // returne entweder die position oder undefined (undefined + 1 ist immernoch undefined)
    return process.argv[flagPosition + 1];
}

const currentDay = getFlagValue("-d") || getFlagValue("--day");

if(currentDay)
{
    console.log(`Heute ist ${currentDay}!`);
}

// BEISPIELEINGABE: node index-argv.js -d Montag

// ein paar beispiele für die implementation von process.argv in eine spiele projekt:

// -n Gandalf | --name Gandalf => der name des spielers
// -g 3000    | --gold 3000    => die menge an gold, mit dem der spieler das spiel anfängt
// -ts 3      | --teamsize 3   => die menge an erlaubten pokemon, die der spieler mit sich führen kann
// -r         | --random       => generiert eine zufällige zahl, auf der basierend der spielverlauf entschieden wird
// -d         | --day          => das spiel spielt zur tageszeit
// -n         | --night        => das spiel spielt in der nacht
