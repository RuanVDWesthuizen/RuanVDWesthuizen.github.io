/* Links to the about page. TODO: Remove and add a menu instead.*/
document.addEventListener("DOMContentLoaded", function () {
    const $navToAbout = document.getElementById("navToAbout");

    if ($navToAbout) {
        $navToAbout.addEventListener("click", function () {
            window.location.href = "about/about.html";
        });
    }

    loadExperience('experience', 'CV/experience.html');
    loadExperience('otherWorkExp', 'CV/otherWorkExp.html');

    loadExperience('qualifications', 'CV/qualifications.html', false, false);
    loadExperience('keySkills', 'CV/keySkills.html', false, false);
    loadExperience('usedTechnologies', 'CV/usedTechnologies.html', false, false);
    loadExperience('languageProf', 'CV/languageProf.html', false, false);
});

function loadExperience(containerId, url, includeContainerCollape = true, includeJobEntries = true) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const $container = document.getElementById(containerId);
            if (!$container) return;

            $container.innerHTML = html;

            // Toggle the entire experience section
            const header = $container.querySelector('h2');
                const experienceContainer = $container.querySelector(`#${containerId}-container`);
            if (includeContainerCollape && experienceContainer && header) {
                    experienceContainer.style.display = 'none';
                    header.addEventListener('click', () => {
                        experienceContainer.style.display =
                            experienceContainer.style.display === 'none' ? 'block' : 'none';
                    });
                }

            // Toggle individual job entries
            if (includeJobEntries) {
                const jobTitles = $container.querySelectorAll('h4.job-title.collapsible');
                jobTitles.forEach($title => {
                    const jobItem = $title.closest(`.${containerId}-item`)?.querySelector('.job-description');
                    if (!jobItem) return;
                    jobItem.style.display = 'none';
                    $title.addEventListener('click', () => {
                        jobItem.style.display =
                            jobItem.style.display === 'none' ? 'block' : 'none';
                    });
                });
            }
        })
        .catch(err => console.error('Failed to load experience HTML:', err));
}