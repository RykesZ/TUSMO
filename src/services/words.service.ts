class Words {
  static compareWords = async (word1: string, word2: string): Promise<string> => {
      let result = '';
      for (let i = 0; i < word1.length; i++) {
        let char1 = word1[i];
        let char2 = word2[i];
        if (char1 === char2) {
          result += char1.toUpperCase();
        } else if (word1.indexOf(char2) !== -1) {
          result += char2.toLowerCase();
        } else {
          result += '.';
        }
      }
      return result;
    }
  
  static getNewWord = async (): Promise<string> => {
    let response = await (await fetch("https://trouve-mot.fr/api/sizemin/5")).json();
    let newWord: string = response[0].name.toUpperCase();
    return newWord;
  }
    
}

export default Words;