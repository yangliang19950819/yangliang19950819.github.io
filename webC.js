class Counter extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'})
    }

    static get observedAttributes(){
        return ['count']
    }   

    get count(){
        return this.getAttribute('count')
    }

    set count(val){
        this.setAttribute('count',val)
    }

    inc(){
        this.count++
    }

    btnEvent(){
        let btn = this.shadowRoot.querySelector('#btn');
        btn.addEventListener('click',this.inc.bind(this))
    }

    attributeChangedCallback(prop,oldVal,newVal){
        if(prop === 'count'){
            this.render()
            this.btnEvent()
        } 
    }

    connectedCallback(){
        this.render();
        this.btnEvent()
    }

    render(){
        this.shadowRoot.innerHTML = `
            <h1>Counter</h1>
            ${this.count}
            <button id="btn">Increment</button>

            <style>
                h1{
                    color:rgba(0,0,0,.6)
                }
            </style>
        `
    }
}

customElements.define('my-counter',Counter)