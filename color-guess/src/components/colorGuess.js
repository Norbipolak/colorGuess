/*
Valamennyi színt kell generálni méghozzá egy bizonyos szintnek megfelelőt, tehát lesz három szint és az első szinten 
generálunk 3 színt, másodikon 6-ot a harmadikon pedig 9-et és megjelenik egy RGB kód és az RGB kódból ki kell találni, hogy
vajon melyik lehet az  

*/

function ColorGuess() {
    //szükségünk van colors-re, amiket generálunk, ezek lesznek azok amiből a jó is ott lesz meg az összes többi szín
    const [colors, setColors] = useState([]);//useState-s komponensváltozó egy tömb
    const [guessColor, setGuessColor] = useState(0);  // konkrét szín, amit ki kell majd találnunk 

    /*
    Szükségünk van egy level változóra, ami megmondja, hogy hány színünk legyen, hány színből kell kitalálni
    */

    /*
    Csináltunk egy Generálás button-t, ami ugy fog müködni, hogy csinálunk hozzá egy eseménykezelőt generateColors
    és csinálunk 3 féle szintet
    */
    const [level, setLevel] = useState(0);
    /*
    Készítünk egy select mezőt a a button alá, ahol majd ki tudjuk választani, hogy melyik level-en vagyunk és attól függően fogunk 
    legenerálni darab számú box-okat 
            <select>
                <option value={0}>Válasz szintet</option>
                <option value={1}>Szint 1</option>
                <option value={2}>Szint 2</option>
                <option value={3}>Szint 3</option>
            </select>
    */

    //ahol az i és guessColors megegyezik ott növelni kell a pontok értékét 
    const [points, setPoints] = useState(0);
    /*
    Meg szeretnénk mondani, hogy hányszor hibázott valaki, a rossz színre kattintott, 
    ezért számolni fogjuk az fails-eket is
    visszamegyünk a clickColor függvényünkbe és egy else ággal számoljuk a pontokat is 
    az failsjeink mellett -> 
        if(i === guessColor)
            setPoints(p=>p+1);
        else 
            setFails(f=>f+1);
    */ 
    const [fails, setFails] = useState(0);
    /*
    Ha nem választottunk szintet, akkor ezt szeretnénk jelezni, erre csinálunk egy errors useState-s 
    változót, de az is hiba ha generált egyett, de nem adott egyetlen tippet sem, tehát, ameddig nem nyomott rá 
    egyre sem, addig legyen letiltva a generálás gomb 
    Csináltunk egy div-et, ami kapott egy className="errors" és ebben egy map segítségével végigmegyünk az error-okon is kíirjuk azokat
            <div className="errors">
                {
                    errors.map((e)=><h3 style={{color:"red"}}>{e}</h3>)
                }
            </div>
    és ezenkivül a generateColors elején csinálunk egy if-es dolgot, ami ide tartozik
    */
    const [errors, setErrors] = useState([]);
    /*
    Csináltunk egy guessedOrNot változót, ami arra vonatkozik, hogy a játékos tippelt-e már, tehát kiválaszott egy 
    színt-e vagy sem, ami alapból true-ra lesz állítva, de csak azért, mert a generateColors függvény végén azt mondjuk, hogy 
    a setGuessedOrNot az mindenképpen legyen false 
    */
    const [guessedOrNot, setGuessedOrNot] = useState(true);

    //referenciaváltozó, hogy el tudjuk érni a jsx elemeket és be tudjuk állítani az értéküket  
    const levelRef = useRef(null);
    


    const generateColors = () => {
        /*
        Létrehozunk egy wasError változót, ami alapból false lesz, de ha bármelyik hiba fent áll, tehát a 
        level === 0, tehát nem választottunk ki szintet vagy a guessedOrNot false, (!guessedOrNot)
        akkor ennek a változónak az értéket átváltoztatjuk true-ra mindegyik if-ünkben, amit a hibákra készítettünk
        */
        let wasError = false;
        setErrors([]);
        /*
        Az a probléma, hogyha rákattintunk mégegyszer a Generálás gombra anélkül, hogy megadtuk volna a tippünket,
        akkor kiírja, hogy nem adtad meg a tippedet, de viszont utána rákattintunk valamelyikre és még mindig ott marad 
        a hibaüzenet, ez azért van, mert ha kiürítjük a hibákat tartalmazó tömbünket, setErrors([])
        akkor a React nem azonnal reagál, nem látja, hogy változott volna az értékünk és ezért nem frissiti a komponenst 

        */
        /*
        Ide csináljuk az error-okat, tehát ha a level az egyenlő nullával, tehát nem választottunk ki szintet,
        akkor a setErrors segítségével, belerakunk az errors tömbbe, amit a useState-s változóval csináltunk egy ennek 
        megfelelő error üzenetet
        */
        if(level === 0) {
            setErrors(e=>[...e, "Nem választottad ki a szintet!"]);
            wasError = true;
        }
        /*
        Ha a guessedOrNot az false, akkor, azt írjuk, hogy nem adtad meg a tippedet
        */
        if(!guessedOrNot) {
            setErrors(e=>[...e, "Nem adtad meg a tippedet!"]);
            wasError = true;
        }

        if(wasError)
            return;
        /*
        Ha volt hibánk, akkor kilépünk a függvényből a return-vel
        */

        /* 
        A setErrors a clickColor függvény végén kell majd kiüritenünk 
        és csináltunk egy másik megoldást, minden addigira, ami itt a generateColors függvényben van e felett 
        de nem az volt a hiba,csak rossz helyen (itt) akartuk kiűríteni a setErrors([]);
        de azért leírom 
        -> 
        */
        const es = [];

        if(level === 0) {
            es.push("Nem választottad ki a szintedet!");
            /*
            Ha nem választottunk szintet 
            */
        }

        if(!guessedOrNot) {
            es.push("Nem adtad meg a tippeted!");
        }

        setErrors(es); 
        /*
        attól függően, hogy melyik errorunk van az es tömbben, azzal frissitjük az useState-s errors változónkat
        ezt itt kívül kell megcsinálni, mert ha itt if(es.length !== 0) csinálnánk meg akkor nem venné le egyből 
        az error ha a hibánk után korrigáltuk azt, hanem még mindig ott maradna még egy körrel tovább 

        Az történik, hogy amikor nem választunk szintet (kiírja, hogy nem választottunk szintet!) és utána választottunk egy
        szintet (eltünik ->) beállítjuk az üres tömbre const es = [] setErrors(es); errors, tehát az es-t és akkor igy 
        eltünik a hibaüzenet 
        */

        if(es.length !== 0) {
            return;//kilépünk a függvényből 
        }


        /*******************************************************************************************************************************/
        /*
        Még nincsenek level-ek, de alapból generálunk 3 darab box-ot 
        */
        const c = [];

        /*
        Következő lépés, hogy ki kell választanunk, hogy melyik a nyerő szín ->
        A nyerő szín, amikor egyes szinten vagyunk, akkor az a nullás, egyes vagy kettes
        viszont, ha kettes szinten vagyunk, akkor lehet 0,1,2,3,4,5, mint index, tehát a colors-nak az indexe
        ezt is véletlenszerűen kell kiválasztanunk 
        Csinálhatjuk azt, hogy a guessColor az egy indexet tárol 

        mert a 3 * level mondja meg, hogy mi lehet a maximális indexünk, sorszámunk 
        de ha kettes a level akkor 6-ot ír és hogyha 6-val szorozzuk meg a Math.random-ot, 
        akkor a Math.floor miatt nullától 5-ig kaphatunk egy értéket 
        */

        setGuessColor(Math.floor(Math.random()* 3 * level));

        //for(let i = 0; i < 3; i++){
        /*
        Jelen esetben ez a for ciklus 3-ig megy, tehát 3 színt tudunk vele generálni de mivel
        csináltunk szinteket és azt szeretnénk, hogy az Szint 1-en 3 színt, Szint 2-ön 6 színt, Szint 3-an 9 színt generáljunk
        Hogyan tudjuk azt megcsinálni, hogy mindig a szintnek megfelelő számú színt generáljon 
        ->
        megszorozzuk a 3-t level-vel, mert hogyha egyes, akkor 0,1,2 ha kettes, akkor 0,1,2,3,4,5...
        3 * level pont az lesz, hogy hányat kell generálnia

        */
        for (let i = 0; i < 3 * level; i++) {

            //itt meg kell hívni a ColorGenerator-t, amit csináltunk a colorGenerator.js-ben
            const color = ColorGenerator();

            //beletesszük push-val a color-t a fenti const c üres tömbbe
            c.push(color);
        }

        setColors(c);
        /*
        Létrehoztunk egy lokális változót (const c), abba összegyüjtöttük a színeket és amikor már össze voltak gyüjtve a színek
        a for ciklus lezárását követően a setColors-val beleraktuk a useState-s üres tömbünkbe
        utána pedig a return-be csinálunk egy map-ot, amiben egy map-vel végigmegyünk a colors-on 
        benne pedig adunk neki egy div-et és direkt erre a célra készítettünk css-ben egy .color-box elnevezésű osztályt 
        megadjuk a div-nek ezt az osztályt és szükségünk van még a key-re ami az index lesz és szükségünk van arra is, hogy 
        a stílukészletbe megadjuk (style), hogy a color az a legyen a c, amit véletlenszerűen generáltunk
 
                     colors.map((c, i)=> 
                         <div style={{color:c}}
                         className="color-box" key={i}></div>
                     );
 
        Mikor fognak ezek a színek megjelenni -> 
        akkor fognak megjelenni, hogyha rákattintunk a gombra 
        és ezért ezt a generateColors függvényt beállítjuk eseménykezelőként a button-ünknek
        <button onClick={generateColors}>Generálás</button>
        */
       setGuessedOrNot(false);
       /*
       itt a setGuessedOrNot az false lesz, de viszont a clickColor-os függvényben 
       a setGuessedOrNot az true lesz 
       */
    };

    /*
    Level az alapból nulláson van, de egy onChange-vel hozzá kell kötni
    -> 
    <select onChange={(e)=>setLevel(parseInt(e.target.value))}>
    és akkor attól föggően, hogy hányas szintet választottuk ki, annyi box fog megjelenni különböző szinekkel
    válasz szintnél pedig nullát fogunk generálni, mert nullát állítottunk be mint value-t 
    */

    /*
            <div className="display">
                <div className="display-box">
                    Pontok:
                </div>
                <div className="display-box">
                    Szín: {colors[guessColor]}
                </div>

    Az egyikben a pontok lesznek, de még nincs ilyen változónk, a másikban pedig a kítalálandó szín 
    a colors tömbnek a guessColor-adik eleme -> setGuessColor(Math.floor(Math.random()* 3 * level));
    furcsa, mert a colors az alapból egy tömb és nincsen nulladik eleme illetve undefined-nal kéne lennie 
    de nem gond, mert így is müködik
    */

    /*
    Még nem tudunk rákattintani az eggyes box-okra, hogy megnézzük, hogy az-e a nyertes
    -> clickColor()
    */

    const clickColor = (i)=> {
        /*
        Nézzük meg, hogy milyen értékeket kapunk vissza a map-ben ->
        a map-ben mi visszakapjuk az indexeket és mi az amit tárolunk a nyertes színről (guessColor-ban)
        az indexét, hogy hányadik indexű tag a colors tömbben és ezért a clickColor fog kapni egy i (indexet),
        hogy melyikre kattintottunk rá -> const clickColor = (i)=>

        itt összehasonlítjuk az i-t a guessColor-vel
        */
       console.log(i === guessColor);
        /*
        és a clickColor az egy eseménykezelő lesz jelen a colors.maps-val generált div-eken

        de nem csinálhatjuk így, mert akkor meghívja minden eggyes iterációban
        <div onClick={clickColor(i)} -> így lesz a konzolon ha három színt generáltunk, hogy pl. false true false 
        azt kell csinálni, hogy itt is az arrow functiont adjuk meg, mert akkor ezt a functiont ()=> fogja nekünk 
        lefutatni és az i-vel megkapjuk az indexet, mire rákattintottunk 
        <div onClick={()=>clickColor(i)}

        és ilyenkor, mondjuk van 3 amiből ki kell találni, akkor rákattintottunk az elsőre false lett utána a másodikra false lett 
        és a harmadik lett a true, a helyes megoldás, amit ki kellett találnunk, 
        tehát ahol true lesz ez az érték (i === guessColor), kivülről megkapott index, ami looprból származik (color.map((c, i)=>))...
        a guessColornek az értékével, tehát azzal az értékkel amit itt (setGuessColor(Math.floor(Math.random()* 3 * level));)
        véletlenszerűen kiválasztottunk, hogy az legyen a nyertes ott növelni kell egy változónak az értékét, méghozzá a pontszámokat 
        erre csinálunk egy useState-s változót const [points, setPoints] = useState(0);
        */ 

        if(i === guessColor)
            setPoints(p=>p+1);
        else 
            setFails(f=>f+1);
        /*
        ezzel növeljük az failsjeink számát, amit készítettünk egy useState-s változóban és a hibákat meg is 
        fogjunk jeleníteni -> 
                <div className="display-box">
                    Pontok: {points} -
                    Hibák: {fails}
        */
        /*
        p is the current state value (or a parameter representing the current value of some variable).
        p + 1 increments the current value by 1.
        The setPoints function is then used to update the state with the new value (p + 1).
        */

        /*
        Meg kell hívni a generateColors-t itt -> 
        Mert eddig, ugy müködött, hogy nulla pontunk van és megfejtjük, hogy melyik szín a helyes és 
        ha rákattintottunk, akkor kapunk egy pontot, de nem generál le a kattintás után más színt, ezért 
        akárhányszor rákattintunk a helyes színre a pontjaink száma növekedni fog, 
        ezért, minden helyes kattintás után itt meg kell hívni a generateColors() és új színeket fog generálni
        */
       generateColors();
       setGuessedOrNot(true);
       setErrors([]);
    };

    const newGame = ()=> {
        //kiűríti a színeket 
        setColors([]);
        setGuessedOrNot(true);
        setErrors([]);
        //setGuessColor-nál az alapérték az -1 lesz 
        setGuessColor(-1);
        //fails-eket és a points-okat is le kell ürítenünk 
        setPoints(0);
        setPoints(0);

        /*
        Most ugy mükódik, hogy beállítunk egy szintet, hogy annyit adjon ki és rányomunk az új játék gombra 
        akkor minden a fentiek miatt lenullázodik, kivéve a szint az marad 1-es 
        ezért a select mezőnek, ahol tudjuk ezt változtatni létrehozunk egy referenciaváltozót és ennek segítségével be tudjuk állítani,
        hogy a nulláson legyen, tehát válassz szintetre, ne pedig az a szint maradjon amin elözőleg játszottunk 

        A useRef azt tudja csinálni, hogy készít egy referenciát az egyes jsx elemekre (elemek amik itt vannak a return-ben) pl. a 
        select mezőnk, amivel el lehet őt érni, egy változóba lementi őket
        felül csináltunk egy useRef-et -> const levelRef = useRef(null); és ezt megadjuk a select mezőnknek -> 
        <select ref={levelRef} onChange={(e) => setLevel(parseInt(e.target.value))}>

        innentől kezdve a levelRef változóból el tudjuk érni ezt a select mezőt, méghozzá olyan formában ->
        levelRef.current, 
        */
        //console.log(levelRef.current)
        /*
        kijön a select mező <select ref={levelRef} onChange={(e) => setLevel(parseInt(e.target.value))}> és minden, ami ebben a select 
        mezőben benne van, tehát a option-ok is value-kkal
        */
        levelRef.current.selectedIndex = 0;
        /*
        és ezzel automatikusan nullára tudtuk tenni a select mező értékét, minden egyes új játek gombnyomás után
        a selectedIndex, az az indexű option, amit kiválasztottunk (ezt allíthatjuk 2-re is nem 0-ra és akkor automatikusan 
        minden új játék után a 2-es szint lesz alapból) 
        */

    };

    return (
        <div className="container">
            <div className="errors">
                {
                    errors.map((e, i)=><h3 key={i} style={{color:"red"}}>{e}</h3>)
                }
            </div>
            <div className="display">
                <div className="display-box">
                    Pontok: {points} -
                    Hibák: {fails}
                </div>
                <div className="display-box">
                    Szín: {colors[guessColor]}
                </div>
            </div>
            <div className="color-boxes">
                {
                    colors.map((c, i) =>
                        <div onClick={()=>clickColor(i)}
                        style={{ backgroundColor: c }}
                            className="color-box" key={i}></div>
                    )
                }
            </div>

            <select ref={levelRef} onChange={(e) => setLevel(parseInt(e.target.value))}>
                <option value={0}>Válasz szintet</option>
                <option value={1}>Szint 1</option>
                <option value={2}>Szint 2</option>
                <option value={3}>Szint 3</option>
            </select>

            <button onClick={generateColors}>Generálás</button>
            <button onClick={newGame}>Új játék</button>
        </div>
    );
}

/*
A generáls gomb mellett kellene egy olyan, hogy új játék gomb, mert most gyakorlatilag bármennyi hibát és pontot össze tudunk 
gyüjteni de ha van egy új játék gomb, ami törli az eddigi eredményeket és a táblát
-> 
készítünk egy új játé gombot a generálá gomb mellé és csinálunk egy newGame függvényt ennek a kezelésére 
            <button onClick={generateColors}>Generálás</button>
            <button onClick={newGame}>Új játék</button>
*/

/*
GuessedOrNot -> hogy a generálás után rányomtunk már-e egy tippre vagy sem (mert az hibának számit, hogyha a generálás után 
még nem nyomtunk rá semmire és utána újra generálni szeretnénk) és ilyenkor fel is jön a hibaüzenetünk 
*/

export default ColorGuess;