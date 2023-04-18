const api_key = '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';
const submitButton = document.querySelector('.submit')
const output = document.querySelector('#output')
const input = document.querySelector('input')
const history = document.querySelector('.history')
const button = document.querySelector('button')


function changeInput(value){
    const input = document.querySelector('input')
    input.value = value
}

async function getMessage(){

    const options = {
        method: 'POST',
        headers:{
            "Authorization": `Bearer ${api_key}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages: [{
                role : "user",
                content : input.value
            }],
            max_tokens: 100
        })
    }


    try {
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data)
        output.textContent = data.choices[0].messages.content

        if(data.choices[0].messages.content){

                pElement = document.createElement('p')
                pElement.textContent = input.value
                pElement.addEventListener('click', () => changeInput(pElement.textContent))
                history.append(pElement)
        }

    } catch (error) {
        console.error(error)
    }

}


submitButton.addEventListener('click', getMessage)



function clear(){
    input.value = ''
}

button.addEventListener('click', clear)