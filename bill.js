document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const toggleButton = document.getElementById('sidebar-toggle');
    const closeButton = document.getElementById('sidebar-close');
    const customerTab = document.getElementById('customer-tab');
    const adminTab = document.getElementById('admin-tab');
    const customerContent = document.getElementById('customer-content');
    const adminContent = document.getElementById('admin-content');
    const filterBtn = document.getElementById('filter-btn');
    const monthInput = document.getElementById('month');

    function toggleSidebar() {
        sidebar.classList.toggle('sidebar-collapsed');
        mainContent.classList.toggle('main-content-expanded');
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            toggleSidebar();
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', function() {
            toggleSidebar();
        });
    }

    function updateSidebar() {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('sidebar-collapsed');
        } else {
            sidebar.classList.remove('sidebar-collapsed');
        }
    }

    window.addEventListener('resize', updateSidebar);
    updateSidebar();

    if (customerTab && adminTab) {
        customerTab.addEventListener('click', function() {
            customerTab.classList.add('active');
            adminTab.classList.remove('active');
            customerContent.classList.add('active');
            adminContent.classList.remove('active');
        });

        adminTab.addEventListener('click', function() {
            adminTab.classList.add('active');
            customerTab.classList.remove('active');
            adminContent.classList.add('active');
            customerContent.classList.remove('active');
        });
    }

    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            const selectedMonth = monthInput.value;
            console.log('Filtering data for month:', selectedMonth);
        });
    }
});
