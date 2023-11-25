const firestore = require("../init.js")

async function createInventory (data) {
    const { id, item } = data
    await firestore.db.collection("inventory").doc().set({item: 11})
}

async function findInventory (data) {
    const { id } = data
    const result = await firestore.db.collection("inventory").doc(id).get()
    console.log(result.data().item)
    return await result.data().item
}

/*async function findAllInventory () {
    const result = await firestore.db.collection("inventory").get()
    return result.docs.map(doc => doc.data())
} */

async function updateInventory (data, newValue) {
    const { id } = data
    await firestore.db.collection("inventory").doc(id).update({item:newValue})
}

async function deleteInventory (data) {
    const { id } = data
    await firestore.db.collection("inventory").doc
}
module.exports = {
    createInventory,
    findInventory,
    //findAllInventory,
    updateInventory,
    deleteInventory
}
