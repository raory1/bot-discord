const firestore = require("../init.js")

async function addMembers (data) {
    const { id } = data
    await firestore.db.collection("members").doc().set({discordID: id})
}

async function findMembers (data) {
    const { id } = data
    const result = await firestore.db.collection("members").doc(id).get()
    console.log(result.data().item)
    return await result.data().item
}

async function findAll () {
    const result = await firestore.db.collection("members").get()
    const membersList = result.docs.map(doc => {
        return doc.data().discordID
    })
    return membersList
    // firestore.db.collection("members")
    // .get()
    // .then(snapshot => {
    //     const membersList = snapshot.docs.map((doc => doc.data().discordID))
    //     console.log(membersList)
    //     return membersList
    // })?????????????????????????????????????

}

async function updateMembers (data, newValue) {
    const { id } = data
    await firestore.db.collection("members").doc(id).update({item:newValue})
}

async function deleteMembers (data) {
    const { id } = data
    await firestore.db.collection("members").doc
}

module.exports = {
    addMembers,
    findMembers,
    findAll,
    updateMembers,
    deleteMembers
}
