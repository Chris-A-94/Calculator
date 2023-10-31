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
                if(event.key == '*') //no anda esto
                    getButton("X");
                else
                    getButton(event.key);
            }
            
        });        
    }
}

function getButton(botonApretado)
{
    console.log(botonApretado);
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