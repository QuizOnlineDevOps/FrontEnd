export function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}


export function check1Option(pilihan) {
  const listMessage = ["Soal harus punya lebih dari 1 opsi jawaban", "Soal harus punya jawaban yang benar"];
  let error = new Set();
  let statusE = false;

  for (let i of pilihan) {
    if (i.pilihan.length == 1) {
      error.add(listMessage[0]);
      statusE = true;
    }
    if (i.jawaban == "") {
      error.add(listMessage[1]);
      statusE = true;
    }
  }
  let errorString = Array.from(error).join(", ");
  return {"error": errorString, "statusE": statusE};
}