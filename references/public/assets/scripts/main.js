
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

var synth = window.speechSynthesis;
var recognizer = new SpeechRecognition();
var recognizing = false;
recognizer.maxAlternatives = 1;

let voices = [];
let temp_res;

const DICTIONARY = {
  точка: '.', запятая: ',', двоеточие: ':', тире: '-', собака: '@', процент: "%",
  один: '1', два: '2', три: '3', четыре: '4', пять: '5', шесть: '6', семь: '7', восемь: '8', девять: '9',
}

const PLACE = {
  соц:'Социальная защита', 
  раб:'На работу/ на работу родителям', 
  налог:'Налоговая служба', 
  пенсион:'Пенсионный фонд', 
  миграцио:'Миграционная служба', 
  школ:'В школу', 
  воен:'Военкомат',
  друг:'Другое место',
  какое:'Другое место',
  место:'Другое место'}


window.onbeforeunload = function() {
  synth.cancel();
};


function speak(text, callback) {
  if (synth.speaking) {
    synth.cancel();
    setTimeout(speak, 300);
  } 
  else if (text !== '') {
    voices = synth.getVoices();
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.onend = function(event) {
      console.log('SpeechSynthesisUtterance.onend');
      if(callback) callback();
    };
    
    for (i = 0; i < voices.length; i++) {
      if (voices[i].name === 'Google русский') {
        utterThis.voice = voices[i];
      }
    }

    utterThis.onpause = function(event) {
      const char = event.utterance.text.charAt(event.charIndex);
      console.log(
        'Speech paused at character ' +
          event.charIndex +
          ' of "' +
          event.utterance.text +
          '", which is "' +
          char +
          '".'
      );
    };

    synth.speak(utterThis);
  }
}

recognizer.onresult = function (event) {
  temp_res = event.results[0][0].transcript;
};

recognizer.onstart = function() {
  recognizing = true;
};

recognizer.onend = function(event) {
  recognizing = false;
}


function editMes(s) {
  s.split(' ').map((word) => {
      word = word.trim()
      return DICTIONARY[word.toLowerCase()] ? DICTIONARY[word.toLowerCase()] : word
    })
    .join(' ')
  return s.replace(/\s{1,}([\.+,?!:-])/g, '$1')
}


function CorrectName(name){
  var reg = new RegExp("^([A-я]+)\\s([A-я]+)\\s([A-я]+)$");
  name = editMes(name).replace(/[^a-zа-яё\s]/gi, '');
  name = name[0].toUpperCase() + name.slice(1);
  for (let i = 0; i < name.length-1; i++){
    if (name[i] == ' ') name = name.slice(0,i+1) + name[i+1].toUpperCase() + name.slice(i+2);
  }
  var valid = reg.exec(name);
  if(valid != null && valid.length > 0 ) {
    speak("ФИО успешно распо'знано.");
    document.getElementById('input1').value = name;
  }
  else {
    speak("ФИО распо'знано некорректно.");
  }
}

function CorrectNumber(phoneNumber) {
  phoneNumber = editMes(phoneNumber).replace(/[^0-9]/g, ''); 
  if (phoneNumber.length == 10)
    phoneNumber = '+7' + phoneNumber;
  else if (phoneNumber.length == 11){
    if(phoneNumber[0] != '7') phoneNumber = '+7' + phoneNumber.slice(1);
    else phoneNumber = '+' + phoneNumber;
  }
  else{}
  if(phoneNumber.length == 12){
    speak("Номер успешно расп'ознан.");
    document.getElementById('input2').value = phoneNumber;
  }  
  else{
    speak("Номер расп'ознан неправильно.");
  }
 
}

function FillEmail(){
  speak("Укажите ваш Email.", function(){
    recognizer.lang = 'ru-Ru';
    recognizer.continuous = false;
    recognizer.start();
    recognizer.onend = function(){
      recognizer.stop();
      CorrectMail(temp_res);
    }
  })
}


function CorrectBox(box){
  if (box.indexOf("да") != -1){
    speak("Ответ принят.");
    return 'да';
  }
  else if (box.indexOf("нет") != -1){
    speak("Ответ принят");
    return 'нет';
  }
  else{
    speak("Ответ не расп'ознан.");
  }
}

function CorrectPlace(temp_res) {
  for (key of Object.keys(PLACE)){
    if (temp_res.indexOf(key) != -1){
      const mil = document.getElementById("militaryCheck");
      const other= document.getElementById("other");
      speak("Ответ принят.");
      var elems = document.getElementsByClassName("inp-cbx");
      console.log(elems);
        for (var i = 0; i < elems.length; i++) {
          if(elems[i].value == PLACE[key]) {
            if(elems[i].checked == true)
              {
              elems[i].checked = false
              if(elems[i].value == "Военкомат"){mil.classList.remove('active'); }
              if(elems[i].value == "Другое место"){other.classList.remove('active'); }
              }
            else {
              elems[i].checked = true;
              if(elems[i].value == "Военкомат"){
              mil.classList.add('active');
              }
              if(elems[i].value == "Другое место"){other.classList.add('active'); }
            };
          };
        }
      }
    }
}

function CorrectCopy(temp_res) {
  console.log(temp_res);
  if (temp_res.indexOf("одну") != -1 || temp_res.indexOf("одна") != -1 || temp_res.indexOf("один") != -1){
    console.log("1");
  }
  else if (temp_res.indexOf("два") != -1 || temp_res.indexOf("две") != -1){
    console.log("2");
  }
  else if (temp_res.indexOf("три") != -1){
    console.log("3");
  }
  else{
    speak("Ответ не расп'ознан.")
  }
}

function FillName(){
  speak("Укажите ваше ФИО.", function(){
    recognizer.lang = 'ru-Ru';
    recognizer.continuous = false;
    recognizer.start();
    $("#fullnameFill").addClass('active');
    $("#loader1").addClass('active');
    recognizer.onend = function(){
      recognizer.stop();
      $("#fullnameFill").removeClass('active');
      $("#loader1").removeClass('active');
      CorrectName(temp_res);
    }
  })
}

function FillNumber(){
  speak("Укажите ваш номер телефона.", function(){
    recognizer.lang = 'ru-Ru';
    recognizer.continuous = false;
    recognizer.start();
    $("#phoneFill").addClass('active');
    $("#loader2").addClass('active');
    recognizer.onend = function(){
      recognizer.stop();
      $("#loader2").removeClass('active');
      $("#phoneFill").removeClass('active');
      CorrectNumber(temp_res);
    }
   
  })
}

function FillBox(text){
  speak(text, function(){
    recognizer.lang = 'ru-Ru';
    recognizer.continuous = false;
    recognizer.start();
    recognizer.onend = function(){
      recognizer.stop();
      CorrectBox(temp_res);
    }
  })
}

function FillPlace(){
  speak("Куда нужна справка?", function(){
    recognizer.lang = 'ru-Ru';
    recognizer.continuous = false;
    recognizer.start();
    $("#FillPlace").addClass('active');
    $("#loader3").addClass('active');
    recognizer.onend = function(){
      recognizer.stop();
      $("#FillPlace").removeClass('active');
      $("#loader3").removeClass('active');
      CorrectPlace(temp_res);
    }
  })
}

function FillCopy(){
  speak("Сколько нужно копий?", function(){
    recognizer.lang = 'ru-Ru';
    recognizer.continuous = false;
    recognizer.start();
    recognizer.onend = function(){
      recognizer.stop();
      CorrectCopy(temp_res);
    }
  })
}