import React from 'react'

class BasketClass {
    static ref = null
    static setRef = (ref = {}) => {
        this.ref = ref;
    }

    static getRef = () => {
        console.log(this.ref)
    }

    static openBottom = () => {
        this.ref.snapTo(1)
    }

    static closeBottom = () => {
        this.ref.close()
    }

}

export default BasketClass;