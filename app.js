function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const toggleButton = document.getElementById('darkModeToggle');
    const icon = toggleButton.querySelector('i');

    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    // Dark mode initialization (previous code)
    const darkModePreference = localStorage.getItem('darkMode');
    const toggleButton = document.getElementById('darkModeToggle');
    const icon = toggleButton.querySelector('i');

    if (darkModePreference === 'enabled') {
        document.body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    toggleButton.addEventListener('click', toggleDarkMode);

    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');

    mobileMenuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuButton.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuButton.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuButton.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Animate skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseover', function () {
            this.style.transform = 'scale(1.1)';
        });
        tag.addEventListener('mouseout', function () {
            this.style.transform = 'scale(1)';
        });
    });

    // Add a simple filter functionality
    const skillCards = document.querySelectorAll('.skill-card');
    const filterButtons = [{name: 'All', filter: '*'}, {name: 'Languages', filter: 'Languages'}, {
        name: 'Frameworks',
        filter: 'Frameworks'
    }, {name: 'Tools', filter: 'Tools'}, {name: 'Databases', filter: 'Databases'}];

    // Create filter buttons
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterButtons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button.name;
        btn.addEventListener('click', () => filterSkills(button.filter));
        filterContainer.appendChild(btn);
    });

    // Insert filter buttons before the skills container
    const skillsContainer = document.querySelector('.skills-container');
    skillsContainer.parentNode.insertBefore(filterContainer, skillsContainer);

    function filterSkills(filter) {
        skillCards.forEach(card => {
            if (filter === '*' || card.querySelector('h3').textContent === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Optional: Add a scroll-to-top button
    const scrollBtn = document.createElement('button');
    scrollBtn.textContent = 'Top';
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.style.display = 'none';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', function () {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});