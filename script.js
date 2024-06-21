document.getElementById('startButton').addEventListener('click', startVisualization);
document.getElementById('resetButton').addEventListener('click', resetVisualization); // Add event listener for reset button

let interval; // Variable to hold interval reference

function startVisualization() {
    clearInterval(interval); // Clear any existing interval
    const selectedAlgorithm = document.getElementById('algorithmSelect').value;
    switch (selectedAlgorithm) {
        case 'bubbleSort':
            visualizeBubbleSort();
            break;
        case 'quickSort':
            visualizeQuickSort();
            break;
        case 'mergeSort':
            visualizeMergeSort();
            break;
        default:
            alert('Please select an algorithm.');
    }
}

function resetVisualization() {
    clearInterval(interval); // Clear any existing interval
    const data = generateRandomArray(20); // Generate new random data
    renderArray(data); // Render the new array
}

function visualizeBubbleSort() {
    const data = generateRandomArray(20);
    renderArray(data);

    let i = 0;
    let j = 0;
    interval = setInterval(() => {
        if (i < data.length) {
            if (j < data.length - i - 1) {
                if (data[j] > data[j + 1]) {
                    [data[j], data[j + 1]] = [data[j + 1], data[j]]; // Swap
                    renderArray(data);
                }
                j++;
            } else {
                j = 0;
                i++;
            }
        } else {
            clearInterval(interval);
        }
    }, 100);
}

function visualizeQuickSort() {
    const data = generateRandomArray(20);
    renderArray(data);
    quickSort(data, 0, data.length - 1);

    function quickSort(arr, low, high) {
        if (low < high) {
            const pi = partition(arr, low, high);
            renderArray(arr); // Render after partition
            interval = setTimeout(() => {
                quickSort(arr, low, pi - 1);
                quickSort(arr, pi + 1, high);
            }, 500);
        }
    }

    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot
        return i + 1;
    }
}

function visualizeMergeSort() {
    const data = generateRandomArray(20);
    renderArray(data);
    mergeSort(data, 0, data.length - 1);

    function mergeSort(arr, left, right) {
        if (left >= right) {
            return;
        }
        const mid = Math.floor((left + right) / 2);
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }

    function merge(arr, left, mid, right) {
        const temp = [];
        let i = left;
        let j = mid + 1;
        let k = 0;

        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }

        while (i <= mid) {
            temp[k++] = arr[i++];
        }

        while (j <= right) {
            temp[k++] = arr[j++];
        }

        for (let p = 0; p < k; p++) {
            arr[left + p] = temp[p];
        }

        renderArray(arr);
    }
}

// Helper functions

function renderArray(array) {
    const container = document.getElementById('visualizationContainer');
    container.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value * 5}px`;
        bar.className = 'bar';
        container.appendChild(bar);
    });
}

function generateRandomArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    return array;
}
