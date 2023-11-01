let primerDigito;
let segundoDigito;
let simbolo;
let moverDigito;
let firstTime = 1;

function resetGlobalVariables()
{
    primerDigito = null;
    segundoDigito = null;
    simbolo = null;
    moverDigito = false;
}

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
            texto.push("*");   
            if(event.key === "Enter")
            {
                event.preventDefault();
                getButton("=");
            }
                      
            if(texto.includes(event.key))
            {
                if(event.key === "/")
                    event.preventDefault();
                if(event.key === "*") 
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

function calculateOp(botonSegundoDigito)
{
    if(primerDigito == null || segundoDigito == null || simbolo == null)
        return; 
    let res;
    switch(simbolo)
    {
        case '+': res = primerDigito + segundoDigito;
            break;
        case '-':   res = primerDigito - segundoDigito;
            break;
        case 'X': case '*': res = primerDigito * segundoDigito;
        break;
        case '/': res = primerDigito / segundoDigito;
        break;
    }
    let moverDigitoLocal;
    if(botonSegundoDigito === "=")
        moverDigitoLocal = false;
    else
        moverDigitoLocal = true;
    
    const display = document.getElementById("display");    
    
    resetGlobalVariables();
    primerDigito = res;
    if(!moverDigitoLocal)
        display.textContent = res;
    else
    {
        display.textContent = res+""+botonSegundoDigito;
        moverDigito = true;
    }       
    
}

function getButton(botonApretado)
{
    let pos = botonApretado.charCodeAt();
    const display = document.getElementById("display");
    
    if(pos > 47 && pos < 58)
        botonApretado = Number(botonApretado);
    else if(pos === 42 || pos === 43 || pos === 45 || pos === 47 || pos === 88)
    {  
        if(pos === 88)
            botonApretado = "*";
        if(!moverDigito)
        {
            simbolo = botonApretado;
            moverDigito = !moverDigito;
            display.textContent = display.textContent+""+simbolo; 
            return; 
        }
        else
        {
            calculateOp(botonApretado);
            simbolo = botonApretado;            
            return;
        }        
    }     
    else if(pos === 61)
        {
            calculateOp(botonApretado);
            return;
        }   
    else
        return;
    
    if(!moverDigito)
    {
        primerDigito = updateNumber(primerDigito,botonApretado);
        display.textContent = primerDigito;
    }
    else
    {
        segundoDigito = updateNumber(segundoDigito,botonApretado);
        display.textContent = primerDigito+""+simbolo+""+segundoDigito; 
    }
        
}

const onOff = document.getElementById("onOff");
onOff.addEventListener('click',()=>{
    let text = document.getElementById("display");
    if(text.textContent)
    {
        text.textContent = "";
        resetGlobalVariables();
    }
        
    else
    {
        text.textContent = 0;
        resetGlobalVariables();
        if(firstTime)
        {
            initializeCalculator();
            firstTime = 0;
        }
        
    }
        
});