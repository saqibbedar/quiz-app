// quiz data
let arr = [
    {Q: "Easiest programming language? ", option1:"Python", option2:"Java", option3:"JavaScript", option4:"C++", btnValue: "Next", Answer:"Python"},
    {Q: "What does HTML stand for? ", option1:"Hyper Text Markup Language", option2:"Hyperlinks and Text Markup Language", option3:"Home Tool Markup Language", option4:"Hyper Tool Markup Language", btnValue: "Next", Answer:"Hyper Text Markup Language"},
    {Q: "What does CSS stand for? ", option1:"Cascading Style Sheets", option2:"Creative Style Sheets", option3:"Computer Style Sheets", option4:"Colorful Style Sheets", btnValue: "Next", Answer:"Cascading Style Sheets"},
    {Q: "What is the capital of Japan? ", option1:"Beijing", option2:"Tokyo", option3:"Seoul", option4:"Bangkok", btnValue: "Next", Answer:"Tokyo"},
    {Q: "What does CPU stand for? ", option1:"Central Processing Unit", option2:"Computer Personal Unit", option3:"Central Personal Unit", option4:"Central Processor Unit", btnValue: "Next", Answer:"Central Processing Unit"},
    {Q: "What is the full form of RAM? ", option1:"Random Access Memory", option2:"Randomly Accessible Memory", option3:"Random Accessed Memory", option4:"Random Activation Memory", btnValue: "Next", Answer:"Random Access Memory"},
    {Q: "Which one is a programming language? ", option1:"HTML", option2:"CSS", option3:"XML", option4:"Ruby", btnValue: "Next", Answer:"Ruby"},
    {Q: "What does GPU stand for? ", option1:"Gaming Processing Unit", option2:"Graphical Processing Unit", option3:"Gigantic Processing Unit", option4:"General Processing Unit", btnValue: "Next", Answer:"Graphical Processing Unit"},
    {Q: "Which company created the JavaScript language? ", option1:"Sun Microsystems", option2:"Oracle", option3:"Netscape", option4:"Mozilla", btnValue: "Next", Answer:"Netscape"},

    // last question
    {Q: "What is the main component of the computer system? ", option1:"Monitor", option2:"Keyboard", option3:"Processor", option4:"Mouse", btnValue: "Submit", Answer:"Processor", background:"rgb(255 0 0 / 88%)"}
];

// variables
let score = 0;
let currentQuestion = 0;

// Add a 'userAnswer' and 'answeredCorrectly' property to each question
arr.forEach(question => {
    question.userAnswer = null;
    question.answeredCorrectly = false;
});

function generateQuestionHTML(question) {
    return `
        <div class="quiz-container">
            <h2 class="question">${question.Q}</h2>
            <div class="options">
                ${['option1', 'option2', 'option3', 'option4'].map(option => `
                    <div class="option">
                        <input class="answer" type="radio" name="quiz-options" value="${question[option]}" ${question.userAnswer === question[option] ? 'checked' : ''}>
                        <label class="q-label">${question[option]}</label>
                    </div>
                `).join('')}
            </div>
            <div class="button-container">
                ${currentQuestion > 0 ? '<button class="prev-btn">Prev</button>' : ''}
                <button class="submit-btn" style="background:${question.background}">${question.btnValue}</button>
            </div>
        </div>
    `;
}

function main() {
    let questionHTML = generateQuestionHTML(arr[currentQuestion]);
    document.querySelector(".main").innerHTML = questionHTML;
}
main();

// Event listener for click events
document.querySelector(".main").addEventListener("click", (event) => {
    if (event.target.classList.contains('submit-btn')) {
        let checkedAnswer = document.querySelector('input[type="radio"]:checked');
        if (checkedAnswer === null) {
            document.querySelector(".showError").classList.add("active-error");
            setTimeout(() => {
                document.querySelector(".showError").classList.remove("active-error");
            }, 3000);
        } else {
            // Update 'userAnswer' and 'answeredCorrectly' with the selected answer
            let selectedAnswer = checkedAnswer.value;
            let currentQuestionData = arr[currentQuestion];
            currentQuestionData.userAnswer = selectedAnswer;
            if (selectedAnswer === currentQuestionData.Answer) {
                if (!currentQuestionData.answeredCorrectly) {
                    score++;
                    currentQuestionData.answeredCorrectly = true;
                }
            } else {
                if (currentQuestionData.answeredCorrectly) {
                    score--;
                    currentQuestionData.answeredCorrectly = false;
                }
            }
            currentQuestion++;
            if (currentQuestion < arr.length) {
                main();
            } else if(currentQuestion === arr.length){
                document.querySelector(".score").classList.add("active-score-board");
                document.querySelector(".score-board").classList.add("active-score-board");
                document.querySelector(".total-score").textContent = score;
                return;
            }
        }
    } else if (event.target.classList.contains('prev-btn')) {
        currentQuestion--;
        main();
    }
});

// when label is clicked then change input state to checked also
// Add event listener to a parent element containing all questions
document.querySelector('.main').addEventListener('click', (event) => {
    // Check if the clicked element is a label with class "q-label"
    if (event.target.classList.contains('q-label')) {
        // Find the associated radio input element
        const radioInput = event.target.previousElementSibling;

        // Toggle the checked state of the radio input
        radioInput.checked = !radioInput.checked;
    }
});

// Add this functionality later
// let userAnswers = [];
// arr.forEach(answer=>{
//     userAnswers.push(answer.userAnswer);
// })

document.querySelector(".view-analytics").addEventListener("click", ()=>{
    document.querySelector(".show-analytics").classList.add("active-show-analytics");

    let clutter = "";
    arr.forEach(question =>{

        // set state to previous state
        question.userAnswer = null;
        question.answeredCorrectly = false;

        clutter += `
        <div class="quiz-container">
            <h2 class="question">${question.Q}</h2>
            <div class="options">
                ${['option1', 'option2', 'option3', 'option4'].map(option => `
                    <div class="option">
                        <input class="answer" type="radio" name="quiz-options" value="${question[option]}" ${question.userAnswer === question[option] ? 'checked' : ''}>
                        <label class="q-label">${question[option]}</label>
                    </div>
                `).join('')}
            </div>
            <div class="button-container">
                <p class="correct-answer">Correct answer: <span>${question.Answer}</span></p>
            </div>
        </div>
        `;
    })

    document.querySelector(".analytics").innerHTML = clutter;

})

document.querySelector(".close-analytics-btn").addEventListener("click", ()=>{
    document.querySelector(".show-analytics").classList.remove("active-show-analytics");
})

function restartQuiz(){
    document.querySelector(".restart-quiz").addEventListener("click", ()=>{
        document.querySelector(".score").classList.remove("active-score-board");
        document.querySelector(".score-board").classList.remove("active-score-board");
        score = 0;
        currentQuestion = 0; 
        // reset the user selected values
        arr.forEach(question => {
            question.userAnswer = null;
            question.answeredCorrectly = false;
        });
        main();
    })
}
restartQuiz();

/*
<!-- <div class="main lelo">
        <div class="links">

        </div>
    </div> -->
*/

// links
// dynamic data
// let links = ["hello", "yolo", "wallah"]

// let clutter = links.map((link, index)=>{
//     console.log(index)
//     return (`
//     <a key=${index} href="#">${link}</a>
//     `);
// }).join("");

// document.querySelector(".links").innerHTML = clutter;


// function quizHandler(){
//     document.querySelector(".main").addEventListener("click", (event) => {
//         if (event.target.classList.contains('submit-btn')) {

//             let checkedAnswer = document.querySelector('input[type="radio"]:checked');
            
//             // if no option is selected
//             if (checkedAnswer === null) {
//                 // if no option is selected show error msg
//                 document.querySelector(".showError").classList.add("active-error");
//                 // remove error after a delay
//                 setTimeout(() => {
//                     document.querySelector(".showError").classList.remove("active-error");
//                 }, 3000);
//             } 
//             else {
//                 let selectedAnswer = checkedAnswer.value; // store users selected answer
//                 let currentQuestionData = arr[currentQuestion]; // select current question from arr
//                 currentQuestionData.userAnswer = selectedAnswer;
    
//                 // if selected answer is correct then increase score
//                 if (selectedAnswer === currentQuestionData.Answer) {
//                     score++;
//                 }
//                 currentQuestion++; // increase the current index
    
//                 // if question is smaller than arrLength 
//                 if (currentQuestion < arr.length) {
//                     main();
//                 }else if(currentQuestion === arr.length){
    
//                     document.querySelector(".score").classList.add("active-score-board");
//                     document.querySelector(".score-board").classList.add("active-score-board");
//                     document.querySelector(".total-score").textContent = score;
//                     return;
//                 }
//             }
//         } else if (event.target.classList.contains('prev-btn')) {
//             currentQuestion--;
//             main();
//         }
//     });
// }
// quizHandler();
