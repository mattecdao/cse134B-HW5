function changeTheme (theme){
    if(theme != 'light' && theme != 'dark' && theme != 'system')
        throw Error('Unexpected theme input!');
    else if(theme == 'light')
    {
        document.documentElement.setAttribute('data-theme', 'light')
    }
    
    else if(theme == 'dark')
    {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else
    {
        document.documentElement.removeAttribute('data-theme');
    }
    
    try{
        localStorage.setItem('theme', theme);
    }
    catch(e){

    }
}   

function init(){
    let savedTheme = 'system';
    try{
        savedTheme = localStorage.getItem('theme') || 'system';
    }
    catch(e){
        savedTheme = 'system';
    }
    changeTheme(savedTheme);

    let currentRadio = document.querySelector('input[name = "theme"][value = "' + savedTheme +  '"]');
    if(currentRadio){
        currentRadio.checked = true;
    }

}

init();

let theme = document.querySelectorAll('input[name="theme"]');

theme.forEach((radio) => {
    radio.addEventListener('change', () => {
        changeTheme(radio.value);
    });
});
