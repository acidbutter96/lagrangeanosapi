import http from 'http'
import fetch from 'node-fetch'

/* export default async function sendinblue (data) {

    const url = 'https://api.sendinblue.com/v3/smtp/email'
    const keyy = "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"

    const teste = await fetch(url, {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "api-key": keyy,
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json()
    }).catch((err) => {
        return {
            error: true,
            err
        }
    })

    return teste
} */

export default async function sbtransactional(data) {
    console.log(data.data)
    const url = 'https://api.sendinblue.com/v3/smtp/email'
    const keyy = "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"

    const teste = await fetch(url, {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "api-key": keyy,
            "content-type": "application/json"
        },
        body: JSON.stringify(data.data)
    }).then(response => response.json()).catch(err => {
        error: true,
            err
    }
    )

    return teste
}