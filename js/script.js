/* Links to the about page. TODO: Remove and add a menu instead.*/
document.addEventListener("DOMContentLoaded", function () {
    const $navToAbout = document.getElementById("navToAbout");

    if ($navToAbout) {
        $navToAbout.addEventListener("click", function () {
            window.location.href = "about/about.html";
        });
    }
});

/*loads html onto the page as wella s adds js events for : Experience.*/
fetch('CV/experience.html')
    .then(response => response.text())
    .then(html => {
        const container = document.getElementById('experience');
        container.innerHTML = html;

        // Toggle the entire experience section
        const header = container.querySelector('h2');
        const experienceContainer = container.querySelector('#experience-container');
        if (experienceContainer && header) {
            experienceContainer.style.display = 'none';
            header.addEventListener('click', () => {
                experienceContainer.style.display = experienceContainer.style.display === 'none' ? 'block' : 'none';
            });
        }

        // Toggle individual job entries
        const jobTitles = container.querySelectorAll('h4.job-title.collapsible');
        jobTitles.forEach(title => {
            const jobItem = title.closest('.experience-item').querySelector('.job-description');
            jobItem.style.display = 'none';
            title.addEventListener('click', () => {
                if (!jobItem) return;
                jobItem.style.display = jobItem.style.display === 'none' ? 'block' : 'none';
            });
        });

    })
    .catch(err => console.error('Failed to load experience HTML:', err));