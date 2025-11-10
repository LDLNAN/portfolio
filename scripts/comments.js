// https://firebase.google.com/docs/firestore/query-data/listen
// https://www.smashingmagazine.com/2020/08/comment-system-firebase/
// https://firebase.google.com/docs/firestore/manage-data/add-data
// 
import { db } from '../firebase.js'
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'

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
    
    // guestbook entry HTML
    entryDiv.innerHTML = `
        <div class="entry-header">
            <div class="entry-left">
                <span class="entry-name">${guestbookEntry.name}</span>
                <div class="entry-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
            <span class="entry-date">${dateStr}</span>
        </div>
        <p class="entry-message">${guestbookEntry.message}</p>
    `
    
    return entryDiv
}
async function handleFormSubmission(event) {
    event.preventDefault()
    
    const nameInput = document.getElementById('guest-name')
    const messageInput = document.getElementById('guest-message')
    
    const entryData = {
        name: nameInput.value,
        message: messageInput.value,
        createdAt: serverTimestamp(),
        ownerId: 'anonymous' // placeholder until we implement real auth
    }
    
    const docRef = await addDoc(collection(db, 'guestbook'), entryData)
    console.log("Document written with ID: ", docRef.id)
    
    // clear form after submit
    nameInput.value = ''
    messageInput.value = ''
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
