import fetch from 'node-fetch'

export default async function newcontact(email, phone, name, lastname, address) {

    var json = {
        "email":
            "thomas.bianchi@email.com",
        "attributes": {
            "sms": "",
            "LASTNAME": "",
            "FIRSTNAME": "",
        }
    }
    json.email = email
    json.attributes.sms = phone
    json.attributes.FIRSTNAME = name
    json.attributes.LASTNAME = lastname

    const url = 'https://api.sendinblue.com/v3/contacts'
    const keyy = "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"

    const teste = await fetch(url, {
        method: 'POST',
        headers: {
            "accept": "application/json",
            "api-key": keyy,
            "content-type": "application/json"
        },
        body: JSON.stringify(json)
    }).then(response => response.json()).catch(err => err)

    return teste
}