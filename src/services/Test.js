import fetch from "node-fetch";


const getNewWord = async () => {
    let response = await (await fetch("https://trouve-mot.fr/api/sizemin/5")).json();
    let newWord = response[0].name.toUpperCase();
    return newWord;
}

const getWordOfLength = async (length) => {
    // console.log("longueur du mot à essayer : " + length);
    let response = await (await fetch(`https://trouve-mot.fr/api/size/${length}`)).json();
    let newWord = response[0].name.toUpperCase();
    // console.log("nouveau mot à essayer : " + newWord);
    return newWord;
}

function convert_accented_characters(str){
    var conversions = new Object();
    conversions['ae'] = 'ä|æ|ǽ';
    conversions['oe'] = 'ö|œ';
    conversions['ue'] = 'ü';
    conversions['Ae'] = 'Ä';
    conversions['Ue'] = 'Ü';
    conversions['Oe'] = 'Ö';
    conversions['A'] = 'À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ';
    conversions['a'] = 'à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª';
    conversions['C'] = 'Ç|Ć|Ĉ|Ċ|Č';
    conversions['c'] = 'ç|ć|ĉ|ċ|č';
    conversions['D'] = 'Ð|Ď|Đ';
    conversions['d'] = 'ð|ď|đ';
    conversions['E'] = 'È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě';
    conversions['e'] = 'è|é|ê|ë|ē|ĕ|ė|ę|ě';
    conversions['G'] = 'Ĝ|Ğ|Ġ|Ģ';
    conversions['g'] = 'ĝ|ğ|ġ|ģ';
    conversions['H'] = 'Ĥ|Ħ';
    conversions['h'] = 'ĥ|ħ';
    conversions['I'] = 'Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ';
    conversions['i'] = 'ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı';
    conversions['J'] = 'Ĵ';
    conversions['j'] = 'ĵ';
    conversions['K'] = 'Ķ';
    conversions['k'] = 'ķ';
    conversions['L'] = 'Ĺ|Ļ|Ľ|Ŀ|Ł';
    conversions['l'] = 'ĺ|ļ|ľ|ŀ|ł';
    conversions['N'] = 'Ñ|Ń|Ņ|Ň';
    conversions['n'] = 'ñ|ń|ņ|ň|ŉ';
    conversions['O'] = 'Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ';
    conversions['o'] = 'ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º';
    conversions['R'] = 'Ŕ|Ŗ|Ř';
    conversions['r'] = 'ŕ|ŗ|ř';
    conversions['S'] = 'Ś|Ŝ|Ş|Š';
    conversions['s'] = 'ś|ŝ|ş|š|ſ';
    conversions['T'] = 'Ţ|Ť|Ŧ';
    conversions['t'] = 'ţ|ť|ŧ';
    conversions['U'] = 'Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ';
    conversions['u'] = 'ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ';
    conversions['Y'] = 'Ý|Ÿ|Ŷ';
    conversions['y'] = 'ý|ÿ|ŷ';
    conversions['W'] = 'Ŵ';
    conversions['w'] = 'ŵ';
    conversions['Z'] = 'Ź|Ż|Ž';
    conversions['z'] = 'ź|ż|ž';
    conversions['AE'] = 'Æ|Ǽ';
    conversions['ss'] = 'ß';
    conversions['IJ'] = 'Ĳ';
    conversions['ij'] = 'ĳ';
    conversions['OE'] = 'Œ';
    conversions['f'] = 'ƒ';
    for(var i in conversions){
        var re = new RegExp(conversions[i],"g");
        str = str.replace(re,i);
    }
    return str;
}

function countLetters(word) {
    let letters = {};
    for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      if (!letters[letter]) {
        letters[letter] = 1;
      } else {
        letters[letter]++;
      }
    }
    let result = [];
    for (let letter in letters) {
      let count = letters[letter];
      result.push({letter: letter, count: count});
    }
    return result;
  }

const testWordTried = (wordToGuess, wordTried) => {
    let wordToGuessLength = wordToGuess.length;
    let wordTriedLength = wordTried.length;
    // console.log("longueur du mot à deviner : " + wordToGuessLength);
    // console.log("longueur du mot proposé : " + wordTriedLength);

    if (wordTriedLength === wordToGuessLength) {
        if (wordTried === wordToGuess) {
            return `Bravo, ${wordTried} est le bon mot.`;
        } else {
            let spreadWordToGuess = [...wordToGuess];
            let spreadWordTried = [...wordTried];
            let listOfValidatedLetters = [];
            let workingSpreadWordToGuess = spreadWordToGuess;


            let wordsUniqueLetters = countLetters(wordToGuess);
            console.log(wordsUniqueLetters);

            let bienPlacees = [];
            // for (let i = 0;i<wordToGuessLength;i++) {
            //     if (spreadWordTried[i] === spreadWordToGuess[i]) {
            //         console.log(`La lettre en position ${i+1}, ${spreadWordTried[i]} est bien placée.`);
            //         bienPlacees.push(spreadWordTried[i]);
            //         listOfValidatedLetters.push(spreadWordTried[i]);
            //         workingSpreadWordToGuess.splice(workingSpreadWordToGuess.indexOf(spreadWordTried[i]),1);
            //     } else {
            //         bienPlacees.push(".");
            //     }
            // }



            console.log(`Résultat 1 : ${bienPlacees.join('')}`);

            for (let i = 0;i<wordToGuessLength;i++) {
                if (spreadWordTried[i] !== spreadWordToGuess[i] && spreadWordToGuess.includes(spreadWordTried[i])) {
                    console.log(`La lettre ${spreadWordTried[i]} est mal placée.`);
                    bienPlacees.splice(i, 1, spreadWordTried[i].toLowerCase());
                    listOfValidatedLetters.push(spreadWordTried[i]);
                }
            }
            console.log(`Résultat 2 : ${bienPlacees.join('')}`);

            for (let i = 0;i<spreadWordTried.length;i++) {
                if (!listOfValidatedLetters.includes(spreadWordTried[i])) {
                    console.log(`La lettre ${spreadWordTried[i]} n'est pas dans ce mot.`);
                }
            }
            return `${wordTried} n'est pas le bon mot, essaye encore.`;
        }
    } else {
        return "Le mot proposé est trop court !";
    }
}

const prepareNewWord = async () => {
    let newWord = await getNewWord();
    newWord = convert_accented_characters(newWord);
    // console.log(newWord);
    return newWord;
}

const letsPlay = async () => {
    // let newWord = await prepareNewWord();
    let newWord = 'MORDRE';

    const listOfWordsToTry = ['BORDER', 'TAPAGE', 'MORDRE'];
    // for (let i = 0;i<2;i++) {
    //     listOfWordsToTry.push(await convert_accented_characters(await getWordOfLength(newWord.length)));
    // }
    // listOfWordsToTry.push(newWord);
    // console.log(listOfWordsToTry);
    for (let wordToTry of listOfWordsToTry) {
        // console.log("mot proposé : " + wordToTry);
        let answer = testWordTried(newWord, wordToTry);
        console.log(answer);
    }
}

letsPlay();