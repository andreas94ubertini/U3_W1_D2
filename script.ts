class Account {
    nome!: string

    balanceInit: number = 0

    constructor(_nome: string,) {
        this.nome = _nome
    }

    oneDeposit = (n: number): void => {
        this.balanceInit = this.balanceInit + n
    }
    oneWithDraw = (n: number): void => {
        this.balanceInit = this.balanceInit - n
    }
}

class MotherAccount extends Account {
    constructor(_nome: string) {
        super(_nome);
        this.addInterest()
    }

    addInterest = (n: number = this.balanceInit): number => {
        return (n * 10) / 100

    }
}

class SonAccount extends Account {
    constructor(_nome: string,) {
        super(_nome);

    }
}

let figlio = new SonAccount('figlio')
let mamma = new MotherAccount("mamma")

const deposit = function (person: Account, quantity: number): void {
    person.oneDeposit(quantity)
}
const whitDraw = function (person: Account, quantity: number): void {
    person.oneWithDraw(quantity)
}
const writeAccount = function (): void {
    const saldoMother: HTMLParagraphElement = document.getElementsByClassName('saldo')[0] as HTMLParagraphElement
    const saldoSon: HTMLParagraphElement = document.getElementsByClassName('saldo')[1] as HTMLParagraphElement
    const interestP:HTMLParagraphElement = document.getElementById('interest') as HTMLParagraphElement
    saldoMother.innerText = `${mamma.balanceInit}$`
    interestP.innerText = `${mamma.addInterest((mamma.balanceInit+ figlio.balanceInit))}$ di interessi sul tuo conto a fine anno`
    saldoSon.innerText = `${figlio.balanceInit}$`

}
const form: HTMLFormElement = document.getElementById('form') as HTMLFormElement
const selectAccount: HTMLInputElement = document.getElementById('select-account') as HTMLInputElement
const selectOperation: HTMLInputElement = document.getElementById('select-operation') as HTMLInputElement
const quantity: HTMLInputElement = document.getElementById('quantity') as HTMLInputElement
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let quantityC: number = parseInt(quantity.value)
    let person: string
    if (selectAccount.value === '1') {
        person = 'mamma'
    } else if (selectAccount.value === '2') {
        person = 'figlio'
    } else {
        console.log('seleziona un account')
    }

// @ts-ignore
    if (selectOperation.value === '1' && person === 'mamma') {
        deposit(mamma, quantityC)
    } else { // @ts-ignore
        if (selectOperation.value === '1' && person === 'figlio') {
            deposit(figlio, quantityC)
        } else { // @ts-ignore
            if (selectOperation.value === '2' && person === 'mamma') {
                whitDraw(mamma, quantityC)

            } else { // @ts-ignore
                if (selectOperation.value === '2' && person === 'figlio') {
                    whitDraw(figlio, quantityC)


                }
            }
        }
    }
writeAccount()
    form.reset()

})



