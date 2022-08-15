export const currencyFormatter = (amount, whole = false) => {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    let output = formatter.format(amount);
    if (whole) {
        output = output.split('.')[0];
    }
    return output;
}

export const moneyRound = (str) => {
   return Math.round(parseFloat(str) * 100) / 100;
}

class Hash {
    constructor() {
        this.updateHash();
        this.onHashUpdate(window.onhashchange);
        this.onHashUpdate(this.updateHash.bind(this));

        window.onhashchange = this.callHashCallbacks;
    }

    $callbacks = [];

    onHashUpdate(callback) {
        this.$callbacks.push(callback);
        console.log(`adding a callback to ${this.$callbacks.length}`)
    }

    callHashCallbacks(e) {
        console.log(`hash changed, calling ${hash.$callbacks.length} callbacks`)
        hash.$callbacks.forEach((callback) => {
            if (typeof (callback) === 'function') callback(e);
        })
    }

   updateHash() {
      this.$hash = {};
      if (window.location.hash) {
         let hashArr = window.location.hash.split('#')[1].split('/');
         console.log(hashArr)
         while(hashArr.length > 0) {
            let id = hashArr.shift()
            this.$hash[id] = decodeURIComponent(hashArr.shift());
         }
      }
   }

    set(key, value) {
        hash.$hash[key] = value;
        let hashArr = [];
        for (let i in hash.$hash) {
            hashArr.push(i)
            hashArr.push(hash.$hash[i])
        }
        window.location.hash = hashArr.join('/');
    }

    get(key) {
        return this.$hash[key];
    }
}

export const hash = new Hash();
