import {Question} from './question'
import { isValid, createModal } from './util'
import './styles.css'
import { getAuthForm, authWithEmailAndPassword } from './auth'


const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')
const modalBtn = document.querySelector('#modal-btn')

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler)
modalBtn.addEventListener('click', openModal)
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event){
    event.preventDefault()
    
    if(isValid(input.value)){
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        submitBtn.disable = true
        // Async request to server to save question
        Question.create(question).then(() => {
            input.value = ''
            input.className = ''
            submitBtn.disable = false
        })
        console.log('Question', question)
    }
}

function openModal() {
    createModal('Авторизация', getAuthForm())
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(event){
    event.preventDefault()
    const btn = event.target.querySelector('button')
    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value
    
    btn.disabled = true
    authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content){
    if(typeof content === 'string'){
        createModal('Ошибка!', content)
    }else{
        createModal('Список вопросов', Question.listToHTML(content))
    }
}