let primerDigito;
let segundoDigito;
let simbolo;
let moverDigito;
let firstTime = 1;
let floatingFirst;
let floatingSecond;
let digitZero;

function resetGlobalVariables()
{
    primerDigito = null;
    segundoDigito = null;
    simbolo = null;
    moverDigito = false;
    floatingFirst = false;
    floatingSecond = false;
    digitZero = false;
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
    const display = document.getElementById("display");
    if(res === Infinity)
    {
        resetGlobalVariables();
        display.textContent = "You've doomed us all."
        return;
    }

    let moverDigitoLocal;
    if(botonSegundoDigito === "=")
        moverDigitoLocal = false;
    else
        moverDigitoLocal = true;
    
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

function deleteInput()
{
    const display = document.getElementById('display');
    let unidad;
    if(!moverDigito)
    {
        unidad = (primerDigito % 10) / 10;
        primerDigito = (primerDigito/10) - unidad;
        display.textContent = primerDigito;
    }
    else if(moverDigito && segundoDigito !== null)
    {
        unidad = (segundoDigito % 10) /10;
        segundoDigito = (segundoDigito/10) - unidad;
        display.textContent = primerDigito+""+simbolo+""+segundoDigito;
    }
    else
    {
        simbolo = null;
        moverDigito = false;
        display.textContent = primerDigito;
    }
}
function clearAll()
{
    const display = document.getElementById('display');
    display.textContent = 0;
    resetGlobalVariables();
}
function floatingNumber()
{
    if(moverDigito && segundoDigito === null)
        return;
    const display = document.getElementById('display');
    if(!moverDigito)
    {
        floatingFirst = true;
        display.textContent = primerDigito+".";
        return;
    }
    else
    {
        floatingSecond = true;
        display.textContent = primerDigito+""+simbolo+""+segundoDigito+".";
        return;
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
    else if(botonApretado === "C")
    {
        deleteInput();
        return;
    }
    else if(botonApretado === "A/C")
    {
        clearAll();
        return;
    }
    else if(botonApretado === ".")
    {
        floatingNumber();
        return;
    }
    else
        return;
    
    if(!moverDigito)
    {
        if(floatingFirst && botonApretado !== 0)
        {
            botonApretado /= 10;
            primerDigito /= 10;
        }
        else if(floatingFirst && botonApretado === 0)
        {
            digitZero = true;
            primerDigito /= 10;
            primerDigito = updateNumber(primerDigito,botonApretado);
            
            display.textContent = primerDigito+".0";            
            return;
        } 
        if(digitZero && botonApretado !== 0)
        {
            digitZero = false;
            botonApretado /= 10;
        }         
            
        primerDigito = updateNumber(primerDigito,botonApretado);
        display.textContent = primerDigito;
    }
    else
    {
        if(floatingSecond && botonApretado !== 0)
        {
            botonApretado /= 10;
            segundoDigito /= 10;
        }
        else if(floatingSecond && botonApretado === 0)
        {
            digitZero = true;
            segundoDigito /= 10;
            segundoDigito = updateNumber(segundoDigito,botonApretado);
            
            display.textContent = display.textContent+""+segundoDigito+".0";            
            return;
        } 
        if(digitZero && botonApretado !== 0)
        {
            digitZero = false;
            botonApretado /= 10;
        } 
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