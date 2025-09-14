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