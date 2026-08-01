class CatFact extends HTMLElement{
    connectedCallback(){
        this.controller = new AbortController();
        this.textContent = "Loading...";
        
        fetch("https://catfact.ninja/fact", {signal: this.controller.signal})
        .then(response => response.json())
        .then(data => {
            this.textContent = data.fact;
        })
        .catch(e => {
            if(e.name !== "AbortError"){ 
            this.textContent = "Failed to load cat fact.";
            }
        });
    }

    disconnectedCallback(){
        this.controller.abort();
    }
}
customElements.define("cat-fact", CatFact);