function calculateLove() {
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;

    if (!name1 || !name2) {
        document.getElementById('result').textContent = "Please enter both names.";
        return;
    }

    const combinedName = name1 + name2;
    const lowerCaseName = combinedName.toLowerCase();

    const t = (lowerCaseName.match(/t/g) || []).length;
    const r = (lowerCaseName.match(/r/g) || []).length;
    const u = (lowerCaseName.match(/u/g) || []).length;
    const e = (lowerCaseName.match(/e/g) || []).length;
    const trueScore = t + r + u + e;

    const l = (lowerCaseName.match(/l/g) || []).length;
    const o = (lowerCaseName.match(/o/g) || []).length;
    const v = (lowerCaseName.match(/v/g) || []).length;
    const e2 = (lowerCaseName.match(/e/g) || []).length;
    const loveScore = l + o + v + e2;

    const loveScoreTotal = parseInt(`${trueScore}${loveScore}`);

    let message = "";
    if (loveScoreTotal < 10 || loveScoreTotal > 90) {
        message = `Your score is ${loveScoreTotal}, you go together like coke and mentos.`;
    } else if (loveScoreTotal >= 40 && loveScoreTotal <= 50) {
        message = `Your score is ${loveScoreTotal}, you are alright together.`;
    } else {
        message = `Your score is ${loveScoreTotal}.`;
    }

    document.getElementById('result').textContent = message;
}
