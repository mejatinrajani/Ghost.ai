const text = document.querySelector(".content");
const button = document.querySelector(".input");

//setting up text to voice :

function speak(text){
    const text_to_voice = new SpeechSynthesisUtterance(text)

    text_to_voice.rate = 1
    text_to_voice.pitch = 1
    text_to_voice.volume = 1
    window.speechSynthesis.speak(text_to_voice)

    
}

//settingn up the speech recognition :

const speechrecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new speechrecognition()
recognition.onresult = (event) => {
    const currentindex = event.resultIndex
    const transcript = event.results[currentindex][0].transcript
    text.textContent = transcript
    takecommand(transcript.toLowerCase())
}

function takecommand(message){
    speak(message)
    button.style.background = "blue"
    text.textContent = "Click Here to Speak"
    
}



button.addEventListener('click', () =>{
    speak("listening")
    text.textContent = ""
    button.style.background = "green"
    recognition.start()
    
})