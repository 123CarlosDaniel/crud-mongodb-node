const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const words = ['hola', 'como', 'estas', 'osha', 'nalgona', 'XD'] 
const $title = document.getElementById('title')

const array1 = [...words[0]]



const randLetter = (span) =>{
    return new Promise (resolve =>{
    let i =0
        const interval = setInterval(() => {
            span.innerHTML = letters[Math.floor(Math.random()*letters.length)]
            i++
            if (i >3) {
                clearInterval(interval)
                resolve()
            }
        },90);
    })
}


const deleteLetter = (span) => {
    return new Promise( (resolve) => {
        const interval = setTimeout(() => {
            span.remove()
            resolve()
        }, 200);
    })
}

const pause = (i) => {
    return new Promise( (resolve) => {
        const interval = setTimeout( () => {
            resolve()
        }, i)
    })
}

const renderWord = async(array) => {
    for ( el of array) {
        const $span = document.createElement('span')
        $title.appendChild($span)
        await randLetter($span)
        $span.textContent = el.toUpperCase() 
    }
    await pause(500)
    const titleChildren = [...$title.children] 
    for (el of titleChildren){
        await deleteLetter(el)
    }
}
const renderAll =async () => {
    for ( el of words){
        const array = [...el]
        await renderWord(array)
    }
}
(async()=>{
    await renderAll()
    $title.innerHTML = 'Te amo osha  &#128536; &#128536; &#128536;'
} )()


