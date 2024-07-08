const button = document.querySelector(".talk");
const text = document.querySelector(".content")
const select = document.querySelector(".input")

//creating a function to let the bot speak :
//setting the speak ability : 
function speak(text){
    const text_to_voice = new SpeechSynthesisUtterance(text)

    text_to_voice.rate = 1
    text_to_voice.pitch = 1
    text_to_voice.volume = 1

    window.speechSynthesis.speak(text_to_voice)
}


//setting up the speech recognition :

const speechrecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new speechrecognition()
recognition.onresult = (event) => {
    const currentindex = event.resultIndex
    const transcript = event.results[currentindex][0].transcript
    text.textContent = transcript
    takecommand(transcript.toLowerCase())
}


//function to first wish the user :

function wishme(){
    let day = new Date()
    let hour = day.getHours()

    if(hour>0 && hour<12){
        speak("Good Morning Sir")
    }
    else if(hour>=12 && hour<16){
        speak("Good Afternoon Sir")
    }
    else if(hour>=16&&hour<24){
        speak("Good Evening Sir")
    }
}

let executed = false
select.addEventListener('click' , () => {
    select.style.background = "green"
    text.textContent = ""
    if(executed==false){
        wishme()
        executed=true
    }
    speak("Listening...")
    recognition.start()
})

function takecommand(message){
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    }
    else if(message.includes('open google')){
        speak("Okay, Opening Google")
        window.open("https://www.google.com/","_blank")
    }
    else if(message.includes('open youtube')){
        speak("Okay, Opening Youtube")
        window.open("https://www.youtube.com/","_blank")
    }
    else if(message.includes('open instagram')){
        speak("Okay, Opening instagram")
        window.open("https://www.instagram.com/","_blank")
    }
    else if(message.includes('what are') || message.includes('what is') || message.includes('who is')){
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("This is what I found regarding your"+message+"on the web.")
    }
    else if(message.includes('Are you a girl or a boy')){
        speak("I am not a boy but also not a girl")
    }
    else if(message.includes("Will you marry me")){
        speak("No, I am already married, go away from me.")
    }
    else if(message.includes("how are you")){
        speak("I am fine sir, what about you ?")
    }
    else{
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("This is what I have found something regarding"+message+"on Google")
    }
    select.style.background = "blue"
    text.textContent = "Click Here to Speak"
}
