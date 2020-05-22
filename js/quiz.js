'use strict';

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit')

const myQuestions = [
    {
        question: "広島県の有名な観光地は？",
        answers: {
            a: "出雲大社",
            b: "美観地区",
            c: "宮島"
        },
        correctAnswer: "c"
    },

    {
        question: "広島県の有名な食べ物は？",
        answers: {
            a: "牡蠣",
            b: "ホタテ",
            c: "さんま"
        },
        correctAnswer: "a"
    },

    {
        question: "広島県にあるプロ野球チームは？",
        answers: {
            a: "カープ",
            b: "楽天",
            c: "ジャイアンツ"
        },
        correctAnswer: "a"
    }
]

console.log(myQuestions[0].answers.a)
//クイズ生成
function buildQuiz() {
    const output = [];

    myQuestions.forEach(
        //オブジェクト、インデックス
        (currentQuestion, questionNumber) => {
            const answers = [];

            for (const key in currentQuestion.answers) {
                // console.log(key);
                // console.log(currentQuestion.answers)
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value=${key} >
                        ${key} :
                        ${currentQuestion.answers[key]}
                    </label>`
                );
            }

            //定数outputに配列型式で追加する。
            console.log(answers)
            output.push(
                `<div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join('')}</div>`
            )
        }
    )

    //配列に入っているクイズをくっつける。
    quizContainer.innerHTML = output.join('');
    console.log(output[0]);
};

console.log(quizContainer);
//結果を表示
function showResults() {
    //選択肢を変数に入れる
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    console.log(answerContainers);

    myQuestions.forEach( (currentQuestion, questionNumber) => {
        
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;

            answerContainers[questionNumber].style.color = 'lightgreen';
        } else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    resultsContainer.innerHTML = numCorrect + '門正解です。';
    
}

buildQuiz();

submitButton.addEventListener('click', showResults);