// https://firebase.google.com/docs/firestore/query-data/listen
// https://www.smashingmagazine.com/2020/08/comment-system-firebase/
// 
import { firestore } from '../firebase.js'
import { collection, onSnapshot, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'

function loadComments() {
    console.log('Loading guestbook entries...')
    
    const entriesContainer = document.getElementById('entries-container')
    console.log(entriesContainer)
    
    const q = query(
        collection(firestore, 'guestbook'),
        orderBy('createdAt', 'desc')
    )
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        
        // clear premade entries
        entriesContainer.innerHTML = ''
        
        // look through each doc, create guestbook entry elements with values, spread operator is huge
        querySnapshot.forEach((doc) => {
            const guestbookEntry = { id: doc.id, ...doc.data() }
            console.log('entry:', guestbookEntry)
            const entryDiv = createGuestbookElement(guestbookEntry)
            entriesContainer.appendChild(entryDiv)
        })
    })

    return unsubscribe
}

// create guestbook entry
function createGuestbookElement(guestbookEntry) {
    const entryDiv = document.createElement('div')
    entryDiv.className = 'guest-entry'
    entryDiv.dataset.id = guestbookEntry.id
    
    // format date
    const date = guestbookEntry.createdAt.toDate()
    const isoString = date.toISOString() 
    const dateStr = isoString.split('T')[0]  // first index is date part
    
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

// store unsubscribe to be called on page unload
let unsubscribe = null

// wait for page load before grabbin
document.addEventListener('DOMContentLoaded', () => {
    unsubscribe = loadComments()
})

// stop listening when unloading page
window.addEventListener('beforeunload', () => {
    unsubscribe()
})
