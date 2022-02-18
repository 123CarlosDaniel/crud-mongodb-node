const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const palabras = ['Holaaa']
const $titulo = document.getElementById('titulo')
const $resultados = document.querySelectorAll('.col-6') 
const elementos = [...$resultados]

const animateLetra = (spanchar) => {
    let cambiosDeLetra = 0
    return new Promise (resolve => {
        const intervalor = setInterval(() => {
            spanchar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambiosDeLetra++;
            if (cambiosDeLetra ==3) {
                clearInterval(intervalor)
            resolve()
            }
        }, 70);
    })
}

const pintarchar = async(letraindex , wordArray,indice) => {
    if(wordArray.length === letraindex) return;
    $titulo.value = $titulo.value.substring(1)
    const spanChar = document.createElement("span");
    elementos[indice].appendChild(spanChar);

    await animateLetra(spanChar)

    spanChar.innerHTML = wordArray[letraindex]
    pintarchar(letraindex+1,wordArray,indice)        
}

const time = (j) => {
    return new Promise( resolve => {
        $titulo.value = palabras[j].toUpperCase()
        setTimeout(() => {
        resolve($titulo.value)
        }, 1500);
    })
}

const mostrar = async(i) => {
    const title = await time(i)
    const wordArray = [...title]
    pintarchar(0,wordArray,i)
}

let i = 0
mostrar(i)
const inte = setInterval( () => {
    i++
    // mostrar(i) 
    if(i >0) clearInterval(inte)
    
},3000)





