import { Ref } from "vue";

interface AtributesArray {
    [name: string]: string
}

export class ParseSearchParams {
    constructor(atributes: AtributesArray, originalUrl: Ref<string>, url: Ref<string>) {
        if (originalUrl.value) {
            try {
                const d = new URL(originalUrl.value)
                const searchparams = d.searchParams

                for (const name in atributes) {
                    searchparams.set(name, atributes[name])
                }

                url.value = d.href
            } catch (err) {
                console.error(err);
            }

        } else {
            url.value = ""
        }
    }
}

// const atributes: AtributesArray = {
//     facepad: "2",
//     fit: "facearea",
//     w: "144",
//     h: "144",
//     ixlib: "rb-1.2",
//     q: "80"
// }


// function findSearchInUrl(stringValue: string): string {

//     let index = 0

//     for (const char of stringValue) {
//         if (char === "&") {
//             index = stringValue.indexOf(char)
//             index
//             break
//         }
//     }

//     const onlyAtributes = stringValue.slice(index, stringValue.length) || ""


//     return onlyAtributes
// }

// const url = "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=144&h=144&q=200"


// const val = new ParseSearchParams(atributes, url)
// val
// const a = val.toString()
// a
// const res = val.fromString(url)
