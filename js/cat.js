class CatFact extends HTMLElement{

    static get observedAttributes(){
        return ["refresh-interval"];

    }
    
    connectedCallback(){
        this.getFact();
        this.createTimer();
    }
    getFact(){
        if(this.controller){
            this.controller.abort();
        }
        this.controller = new AbortController();
        this.dataset.state = "loading";
        this.textContent = "Loading...";
        
        fetch("https://catfact.ninja/fact", {signal: this.controller.signal})
        .then(response => response.json())
        .then(data => {
            this.textContent = data.fact;
            this.dataset.state = "finished";
        })
        .catch(e => {
            if(e.name !== "AbortError"){ 
            this.textContent = "Failed to load cat fact.";
            this.dataset.state = "error";
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
