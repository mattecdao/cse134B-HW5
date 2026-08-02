class CatFact extends HTMLElement{

    static get observedAttributes(){
        return ['refresh-interval'];

    }
    
    connectedCallback(){
        if(this.id !== 'cat-fact'){
            this.id = 'cat-fact';
        }
        this.renderTemplate();

        this.addEventListener('command', (event) => {
            if(event.command === 'start'){
                this.getFact();
            }
        });
        if(this.hasAttribute('refresh-interval')){
            this.getFact();
        }
        else{
            this.setIdle();
        }
        this.createTimer();
    }

    setIdle(){
        this.dataset.state = "idle";
        if(this.factEl){
            this.factEl.textContent = "Press to get a cat fact!";
        }
        if(this.buttonEl){
            this.buttonEl.disabled = false;
            this.buttonEl.textContent = "Get Cat Fact";
        }
    }

    renderTemplate(){
        const template = document.getElementById('cat-fact-template');
        if(template){
            this.innerHTML = '';
            const clone = template.content.cloneNode(true);
            this.factEl = clone.querySelector('p');
            this.buttonEl = clone.querySelector('button');
            if(this.buttonEl){
                this.buttonEl.addEventListener('click', () => {
                    this.getFact();
                });
            }
            this.appendChild(clone);
        }
    }

    getFact(){
        if(this.controller){
            this.manualAbort = true;
            this.controller.abort();
        }

        this.manualAbort = false;
        this.controller = new AbortController();
        const timeOut = setTimeout(() => {
            this.controller.abort();
        }, 7000);

        this.dataset.state = "loading";
        if(this.factEl){
            this.factEl.textContent = "Loading cat fact...";
        }
        if(this.buttonEl){
            this.buttonEl.disabled = true;
            this.buttonEl.textContent = "Loading...";
        }
        
        fetch("https://catfact.ninja/fact", {signal: this.controller.signal})
        .then(response => {
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            clearTimeout(timeOut);
            this.factEl.textContent = data.fact;
            this.dataset.state = "finished";
            if(this.buttonEl){
                this.buttonEl.disabled = false;
                this.buttonEl.textContent = "Press for instant cat fact!";
            }
        })
        .catch(e => {
            clearTimeout(timeOut);
            if(e.name === "AbortError" && this.manualAbort){ 
                return;
            }
            this.dataset.state = "error";
            if(this.factEl){
                this.factEl.textContent = "Failed to load cat fact. Please try again.";
            }
            if(this.buttonEl){
                this.buttonEl.disabled = false;
                this.buttonEl.textContent = "Press for instant cat fact!";
            }
        });
    }

    disconnectedCallback(){
        if(this.controller){
            this.controller.abort();
        }
        this.resetTimer();
    }
    attributeChangedCallback(name, oldValue, newValue){
        if(name === "refresh-interval" && oldValue !== newValue &&this.isConnected){
            this.createTimer();
        }
    }
    
    createTimer(){
        this.resetTimer();
        let seconds = parseInt(this.getAttribute("refresh-interval"));
        if(!isNaN(seconds) && seconds > 0){
            this.timer = setInterval(() => {
                this.getFact();
            }, seconds * 1000);
        }
    }

    resetTimer(){
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}
customElements.define("cat-fact", CatFact);
