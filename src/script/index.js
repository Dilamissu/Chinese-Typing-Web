const toneMarks = ['ˊ', 'ˇ', 'ˋ', '˙'];

window.onload = function(){
    init();
}

function init(){
    generateRandomBoPoMoFo();
    document.getElementById("input-field").addEventListener("compositionupdate", e => {
        checkInput(e);
    });
    document.getElementById("input-field").addEventListener("blur", e => {
        setTimeout(() => {
            document.getElementById('input-field').focus();
        }, 20);
    });
    clear();
}

function generateRandomChinese(){
    let randomText = '';
    for (let i = 0; i < 5; i++) { // 隨機生成5個中文字
        const randomCode = Math.floor(Math.random() * (0x6fcc - 0x4e00 + 1)) + 0x4e00;
        randomText += String.fromCharCode(randomCode);
    }
    document.getElementById('word-to-type').innerText = randomText;
    clear()
}

function generateRandomBoPoMoFo(){
    let randomText = '';
    for (let i = 0; i < 5; i++) { // 隨機生成5個注音符號或是音調符號
        // let flag = Math.floor(Math.random() * 2);
        // if(flag === 0){
            const randomCode = Math.floor(Math.random() * (0x3129 - 0x3105 + 1)) + 0x3105;
            randomText += String.fromCharCode(randomCode);
        // }else{
        //     const randomIndex = Math.floor(Math.random() * toneMarks.length);
        //     randomText += toneMarks[randomIndex];
        // }
    }
    // make it same word for testing
    document.getElementById('word-to-type').innerText = randomText;
    clear()
}

function clear(){
    document.getElementById('correct-typed-word').innerText = '';
    document.getElementById('incorrect-typed-word').innerText = '';
    document.getElementById('input-field').value = '';
    document.getElementById('input-field').focus();
}

function checkInput(event){
    const wordToType = document.getElementById('word-to-type').innerText;
    const inputWord = document.getElementById('input-field').value;
    
    if (wordToType.charAt(0) === inputWord) {
        document.getElementById('input-field').value = '';
        document.getElementById('correct-typed-word').innerText += wordToType.charAt(0);
        if(wordToType.length === 1){
            generateRandomBoPoMoFo();
        }else{
            document.getElementById('word-to-type').innerText = wordToType.substring(1);
        }
        document.getElementById('input-field').value = '';

    }else{
        document.getElementById('incorrect-typed-word').innerText = inputWord;
    }
    document.getElementById('input-field').blur();
}

function handleKeydown(event) {
    const key = event.key;

    // 檢查是否為注音符號 (範圍: ㄅ 到 ㄩ) 或是 音調符號 (ˊ、ˇ、ˋ、˙)
    if (key.match(/[\u3105-\u3129]/) || toneMarks.includes(key)) {
        document.getElementById('input-field').innerText += key;
        event.preventDefault(); // 阻止系統的自動轉換行為
    }
}