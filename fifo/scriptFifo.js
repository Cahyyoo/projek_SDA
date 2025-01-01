const queueContainer = document.getElementById('queue');
const enqueueButton = document.getElementById('enqueue');
const dequeueButton = document.getElementById('dequeue');
const statusMessage = document.getElementById('status');
const progressBar = document.getElementById('progress-bar');
const queueLengthText = document.getElementById('queue-length');

let queue = [];
const maxQueueSize = 5;
let currentNumber = 1;


function updateProgressBar() {
    const percentage = (queue.length / maxQueueSize) * 100;
    progressBar.style.width = `${percentage}%`;
    queueLengthText.textContent = queue.length;
}


function renderQueue() {
    queueContainer.innerHTML = '';
    queue.forEach((element) => {
        const queueElement = document.createElement('div');
        queueElement.classList.add('queue-element');
        queueElement.textContent = element;
        queueContainer.appendChild(queueElement);
    });
    updateProgressBar();
}


enqueueButton.addEventListener('click', () => {
    if (queue.length >= maxQueueSize) {
        statusMessage.textContent = 'Antrian penuh!';
        return;
    }
    const newElement = currentNumber;
    queue.push(newElement);
    renderQueue();

    
    const lastElement = queueContainer.lastElementChild;
    lastElement.classList.add('adding');
    setTimeout(() => {
        lastElement.classList.remove('adding');
    }, 600); 

    statusMessage.textContent = `Elemen ${newElement} berhasil ditambahkan!`;
    currentNumber++;
});


dequeueButton.addEventListener('click', () => {
    if (queue.length === 0) {
        statusMessage.textContent = 'Antrian kosong!';
        return;
    }

    const removedElement = queue[0];
    const firstElement = queueContainer.firstElementChild;

    if (firstElement) {
        
        firstElement.classList.add('removing');
        setTimeout(() => {
            queue.shift(); 
            renderQueue();
        }, 600); 
    }

    statusMessage.textContent = `Elemen ${removedElement} berhasil dihapus!`;
});


renderQueue();
