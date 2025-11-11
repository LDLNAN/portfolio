// https://firebase.google.com/docs/firestore/query-data/listen
// https://www.smashingmagazine.com/2020/08/comment-system-firebase/
// https://firebase.google.com/docs/firestore/manage-data/add-data
// https://firebase.google.com/docs/firestore/manage-data/delete-data
// 
import { db, auth } from '../firebase.js'
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp, doc, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'

function loadComments() {
    const entriesContainer = document.getElementById('entries-container')
    
    const q = query(
        collection(db, 'guestbook'),
        orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        // clear premade entries
        entriesContainer.innerHTML = ''
        // look through each doc, create guestbook entry elements with values, spread operator is huge
        querySnapshot.forEach((doc) => {
            const guestbookEntry = { id: doc.id, ...doc.data() }
            const entryDiv = createGuestbookElement(guestbookEntry)
            entriesContainer.appendChild(entryDiv)
        })
    },
        (error) => {
            console.error("Error listening to guestbook entries: ", error)
        }
    )

    return unsubscribe
}

// create guestbook entry
function createGuestbookElement(guestbookEntry) {
    const entryDiv = document.createElement('div')
    entryDiv.className = 'guest-entry'
    entryDiv.dataset.id = guestbookEntry.id
    
    // null timestamps, fails without
    let dateStr = 'Just now'
    if (guestbookEntry.createdAt) {
        const date = guestbookEntry.createdAt.toDate()
        const isoString = date.toISOString() 
        dateStr = isoString.split('T')[0]  // first index is date part
    }
    
    // check if current user owns this
    const currentUser = auth.currentUser
    const isOwner = currentUser && currentUser.uid === guestbookEntry.ownerId
    
    // if is owner true, show edit/delete buttons, else ''
    const actionButtons = isOwner ? `
        <div class="entry-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    ` : ''
    
    // guestbook entry HTML
    entryDiv.innerHTML = `
        <div class="entry-header">
            <div class="entry-left">
                <span class="entry-name">${guestbookEntry.name}</span>
                ${actionButtons}
            </div>
            <span class="entry-date">${dateStr}</span>
        </div>
        <p class="entry-message">${guestbookEntry.message}</p>
    `
    
    // add event listeners to buttons if owner, extra protect.
    if (isOwner) {
        const editBtn = entryDiv.querySelector('.edit-btn')
        const deleteBtn = entryDiv.querySelector('.delete-btn')
        
        editBtn.addEventListener('click', () => handleEdit(guestbookEntry.id, guestbookEntry.message))
        deleteBtn.addEventListener('click', () => handleDelete(guestbookEntry.id))
    }
    
    return entryDiv
}
async function handleFormSubmission(event) {
    event.preventDefault()
    
    const messageInput = document.getElementById('guest-message')
    const user = auth.currentUser
    if (!user) {
        alert('Sign in to post a message!')
        return
    }
    
    const entryData = {
        name: user.displayName,
        message: messageInput.value,
        createdAt: serverTimestamp(),
        ownerId: user.uid
    }
    
    const docRef = await addDoc(collection(db, 'guestbook'), entryData)
    console.log("Document written with ID: ", docRef.id)
    
    // clear form after submit
    messageInput.value = ''
}

async function handleDelete(docId) {
    if (!confirm('Delete this message?')) {
        return
    }
    
    await deleteDoc(doc(db, 'guestbook', docId))
}

async function handleEdit(docId, currentMessage) {
    const newMessage = prompt('Edit your message:', currentMessage)
    
    if (newMessage === null) {
        return
    }
    
    const docRef = doc(db, 'guestbook', docId)
    await updateDoc(docRef, {
        message: newMessage
    })
}

// store unsubscribe to be called on page unload
let unsubscribe = null

// wait for page load before grabbin
document.addEventListener('DOMContentLoaded', () => {
    unsubscribe = loadComments()
    
    // attach to form submit
    const guestbookForm = document.querySelector('.guestbook-form')
    guestbookForm.addEventListener('submit', handleFormSubmission)
})

// stop listening when unloading page
window.addEventListener('beforeunload', () => {
    unsubscribe()
})
