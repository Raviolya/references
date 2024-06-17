var synth = window.speechSynthesis;
let voices = [];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

var recognizing = false;
var recognition= new window.webkitSpeechRecognition();
recognition.maxAlternatives = 1;

let temp;

const DICTIONARY = {
точка: '.', запятая: ',', двоеточие: ':', тире: '-', собака: '@', процент: "%",
один: '1', два: '2', три: '3', четыре: '4', пять: '5', шесть: '6', семь: '7', восемь: '8', девять: '9',

}

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
    callback();
  };
  
  for (var i = 0; i < voices.length; i++) {
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

recognition.onresult = function (event) {
temp = event.results[0][0].transcript;
};

recognition.onstart = function() {
recognizing = true;
};

recognition.onend = function(event) {
recognizing = false;
}


function editMes(s) {
s.split(' ').map((word) => {
    word = word.trim();
    return DICTIONARY[word.toLowerCase()] ? DICTIONARY[word.toLowerCase()] : word;
  }).join(' ');
return s.replace(/\s{1,}([\.+,?!:-])/g, '$1');
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
  recognition.stop();
  speak("ФИО успешно распо'знано.");
  console.log(name);
  temp = true;
  return name;
}
else {
  recognition.stop();
  speak("ФИО распо'знано некорректно.");
  return null;
}
}


function CorrectMail(mail) {
var reg = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
var valid = reg.test(mail);
if (valid){
  recognition.stop();
  speak("E-mail успешно распозн'ан.");
  console.log(mail);
  return mail;
}
else {
  recognition.stop();
  speak("E-mail распозн'ан некорректно.");
  return null;
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
  recognition.stop();
  speak("Номер успешно расп'ознан.");
  document.getElementById('input2').value = phoneNumber;
  console.log(phoneNumber);
  return phoneNumber;
}  
else{
  recognition.stop();
  speak("Номер расп'ознан неправильно.");
  return null;
}
}

function CorrectBox(box){
if (box == 'да'){
  console.log('да');
}
else if (box == 'нет'){
  console.log('нет');
}
else{}
}

function CorrectPlace(temp) {
const PLACE = {соц:'Социальная защита', раб:'На работу', налог:'Налоговая служба', пенсион:'Пенсионный фонд', миграцио:'Миграционная служба', школ:'В школу ', воен:'Военкомат'}
for (var key of Object.keys(PLACE)){
  if (temp.indexOf(key) != -1){
    console.log(PLACE[key]);
    return PLACE[key];
    }
  }
return 'Другое место'; 
}

function CorrectCopy(temp) {
console.log(temp);
if (temp == 'одну' || temp == 'одна' || temp == 'один'){
  console.log("1");
}
else if (temp == 'два' || temp == 'две'){
  console.log("2");
}
else if (temp == 'три'){
  console.log("3");
}
}

function FillName(){
speak("Укажите ваше ФИО.", function(){
  recognition.lang = 'ru-Ru';
  recognition.continuous = false;
  recognition.start();
  recognition.onend = function(){
    CorrectName(temp);
  }
})
}

function FillNumber(){
speak("Укажите ваш номер телефона.", function(){
  recognition.lang = 'ru-Ru';
  recognition.continuous = false;
  recognition.start();
  recognition.onend = function(){
    CorrectNumber(temp);
  }
})
}

function FillBoxYN(text){
speak(text, function(){
  recognition.lang = 'ru-Ru';
  recognition.continuous = false;
  recognition.start();
  recognition.onend = function(){
    CorrectBox(temp);
  }
})
}

function FillPlace(){
speak("Куда нужна справка?", function(){
  recognition.lang = 'ru-Ru';
  recognition.continuous = false;
  recognition.start();
  recognition.onend = function(){
    CorrectPlace(temp);
  }
})
}

function FillCopy(text){
speak("Сколько нужно копий?", function(){
  recognition.lang = 'ru-Ru';
  recognition.continuous = false;
  recognition.start();
  recognition.onend = function(){
    CorrectCopy(temp);
  }
})
}