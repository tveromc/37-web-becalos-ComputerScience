// Vamos a crear una clase para crear los nodos
class Nodo {
   constructor(valor){
    this.valor = valor;
    this.izquierdo = null;
    this.derecho = null;
   }
}

// Vamos a crear una clase para crear
// nuestro Árbol Binario
class ArbolBinario {
    constructor(){
        this.raiz = null;
    }

    // métodos
    // método para insertar un nuevo nodo en el árbol
    insertar(valor){
        const nuevoNodo = new Nodo(valor);
        if(this.raiz === null){
            this.raiz = nuevoNodo;
        }else{
            this.insertarNodo(this.raiz, nuevoNodo)
        }
    }

    // método auxiliar para insertar un nodo en la posición correcta (izquierda o derecha)
    insertarNodo(nodo, nuevoNodo){
        if(nuevoNodo.valor < nodo.valor){
            if(nodo.izquierdo === null ){
                nodo.izquierdo = nuevoNodo;
            }else{
                this.insertarNodo(nodo.izquierdo, nuevoNodo)
            }
        } else {
            if( nodo.derecho === null ){
                nodo.derecho = nuevoNodo;
            }else{
                this.insertarNodo(nodo.derecho, nuevoNodo)
            }
        }
    }

    // Método para realizar un recorrido en orden (inorder)
    recorridoEnOrden(nodo = this.raiz ){
        if( nodo !== null ) {
            this.recorridoEnOrden(nodo.izquierdo);
            console.log(nodo.valor);
            this.recorridoEnOrden(nodo.derecho)
        }
    }

    buscar(valor, nodo = this.raiz ){
        if(nodo === null ){
            return null;
        }
        if(valor < nodo.valor){
            return this.buscar(valor, nodo.izquierdo);
        }else if ( valor > nodo.valor){
            return this.buscar(valor, nodo.derecho);
        }else {
            return nodo;
        }
    }

    //método para imprimir el árbol
    imprimirArbolBinario(nodo = this.raiz){
        if(nodo === null){
            return 'null';
        }
        const izquierdo = this.imprimirArbolBinario(nodo.izquierdo)
        const derecho = this.imprimirArbolBinario(nodo.derecho)
        return  `{
            valor: ${nodo.valor},s
            izquierdo: ${izquierdo},
            derecho: ${derecho}
         }`;
    }
}

// vamos a crear nuestros objetos (datos que van dentro del nodo)

const dato = new ArbolBinario();
dato.insertar(10);
dato.insertar(5);
dato.insertar(15);
dato.insertar(3);
dato.insertar(7);
dato.insertar(8);
dato.insertar(11);

console.log('Recorrido en Orden:');
dato.recorridoEnOrden();

console.log('Buscar valor 7:');
console.log(dato.buscar(7));

console.log(dato.imprimirArbolBinario())