document.addEventListener('DOMContentLoaded', () => {
    let imageFiles = [];
  
    const dropArea = document.querySelector('.drop-area');
    const uploadButton = dropArea.querySelector('button');
    const fileInput = document.getElementById('input-file');
    const imagePreview = document.getElementById('preview');
  
    ['dragover', 'dragleave', 'drop'].forEach(event => {
        dropArea.addEventListener(event, (e) => {
            e.preventDefault();
            dropArea.classList.toggle('active', event === 'dragover');
        });
    });
  
    dropArea.addEventListener("drop", (e) => {
        imageFiles = imageFiles.concat(Array.from(e.dataTransfer.files));
        updatePreview();
    });
  
    uploadButton.addEventListener("click", (e) => {
        e.preventDefault();
        fileInput.click();
    });
  
    fileInput.addEventListener("change", () => {
        imageFiles = imageFiles.concat(Array.from(fileInput.files));
        updatePreview();
    });
  
    function updatePreview() {
        imagePreview.innerHTML = '';
        imageFiles.forEach(showImage);
    }
  
    function showImage(file, idx) {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            alert("Unsupported file type.");
            imageFiles.splice(idx, 1);
            return;
        }
  
        const reader = new FileReader();
        reader.onload = () => {
            const imageContainer = document.createElement('div');
            imageContainer.className = "previewImage";
            
            const image = document.createElement('img');
            image.src = reader.result;
            
            const fileName = document.createElement('span');
            fileName.textContent = file.name;
            
            const removeButton = document.createElement('span');
            removeButton.className = "material-symbols-outlined removeBtn";
            removeButton.textContent = "close";
            removeButton.onclick = () => {
                imageFiles.splice(idx, 1);
                updatePreview();
            };
            
            imageContainer.append(image, fileName, removeButton);
            imagePreview.appendChild(imageContainer);
        };
        reader.readAsDataURL(file);
    }
});
