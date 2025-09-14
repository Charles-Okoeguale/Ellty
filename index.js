function createPageCheckbox(pageNumber) {
    return `
        <div class="checkbox-item">
            <label class="checkbox-label" for="page-${pageNumber}">Page ${pageNumber}</label>
            <div class="checkbox-wrapper">
                <input type="checkbox" id="page-${pageNumber}" class="checkbox-input">
                <div class="checkbox-custom">
                    <div class="checkmark">
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 8L6.5 12L14 4" stroke="#2469F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    `;
}


const pagesScrollDiv = document.querySelector('.pages-scroll');
for (let i = 1; i <= 6; i++) {
    pagesScrollDiv.innerHTML += createPageCheckbox(i);
}

const allPagesCheckbox = document.getElementById('all-pages');
const pageCheckboxes = [
    document.getElementById('page-1'),
    document.getElementById('page-2'),
    document.getElementById('page-3'),
    document.getElementById('page-4'),
    document.getElementById('page-5'),
    document.getElementById('page-6')
];

allPagesCheckbox.addEventListener('change', function() {
    pageCheckboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});

pageCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const allChecked = pageCheckboxes.every(cb => cb.checked);
        const someChecked = pageCheckboxes.some(cb => cb.checked);

        allPagesCheckbox.checked = allChecked;
        allPagesCheckbox.indeterminate = !allChecked && someChecked;
    });
});

document.querySelectorAll('.checkbox-label').forEach(label => {
    label.addEventListener('click', function(e) {
        e.preventDefault();
        const checkboxId = this.getAttribute('for');
        const checkbox = document.getElementById(checkboxId);
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
    });
});

document.querySelector('.done-button').addEventListener('click', function() {
    const selectedPages = [];
    if (allPagesCheckbox.checked) {
        selectedPages.push('All pages');
    } else {
        pageCheckboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                selectedPages.push(`Page ${index + 1}`);
            }
        });
    }
    console.log('Selected pages:', selectedPages);
});