let primerDigito = 0;
let segundoDigito = 0;
let moverDigito = false;

function initializeCalculator()
{
    const botones = Array.from(document.querySelectorAll("button"));
    for(let i = 0; i < botones.length; i++)
    {
        botones[i].addEventListener('click',()=>{
            getButton(botones[i].textContent);
        });
        botones[i].addEventListener('keydown',(event)=>{
            let texto = botones.map(item => item.textContent);            
            if(texto.includes(event.key))
            {
                if(event.key == '*') //no anda este if
                    getButton("X");
                else
                    getButton(event.key);
            }            
        });        
    }
}

function updateNumber(number,unit)
{
    return number * 10 + unit;
}

function getButton(botonApretado)
{
    let pos = botonApretado.charCodeAt();
    const display = document.getElementById("display");
    
    if(pos > 47 && pos < 58)
        botonApretado = Number(botonApretado);
    else
        moverDigito = !moverDigito;
    
    if(!moverDigito)
    {
        primerDigito = updateNumber(primerDigito,botonApretado);
        display.textContent = primerDigito;
    }
        
}

const onOff = document.getElementById("onOff");
onOff.addEventListener('click',()=>{
    let text = document.getElementById("display");
    if(text.textContent)
        text.textContent = "";
    else
    {
        text.textContent = 0;
        initializeCalculator();
    }
        
});