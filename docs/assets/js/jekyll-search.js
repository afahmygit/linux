// Simple Jekyll Search
// This script provides client-side search functionality

(function() {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');

    if (!searchInput || !resultsContainer) return;

    // Load search data
    let searchData = [];
    fetch('/search.json')
        .then(response => response.json())
        .then(data => {
            searchData = data;
        })
        .catch(error => console.error('Error loading search data:', error));

    // Search function
    function performSearch(query) {
        if (!query || query.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }

        const results = searchData.filter(item => {
            const searchTerm = query.toLowerCase();
            return (
                item.title.toLowerCase().includes(searchTerm) ||
                item.content.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm) ||
                (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
            );
        });

        displayResults(results, query);
    }

    // Display results
    function displayResults(results, query) {
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-result">
                    <p class="text-muted">No results found for "${query}"</p>
                </div>
            `;
            return;
        }

        const html = results.slice(0, 10).map(result => {
            // Highlight matching text
            const excerpt = result.excerpt || result.content.substring(0, 150) + '...';
            const highlightedExcerpt = highlightText(excerpt, query);

            return `
                <div class="search-result">
                    <a href="${result.url}">
                        <div class="search-result-title">${highlightText(result.title, query)}</div>
                        <div class="search-result-excerpt">${highlightedExcerpt}</div>
                        <div class="mt-1">
                            <span class="badge bg-blue-lt border border-blue">${result.category}</span>
                        </div>
                    </a>
                </div>
            `;
        }).join('');

        resultsContainer.innerHTML = html;
    }

    // Highlight matching text
    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Event listeners
    searchInput.addEventListener('input', debounce(function(e) {
        performSearch(e.target.value);
    }, 300));

    // Clear results when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            // Optional: Keep results until new search
            // resultsContainer.innerHTML = '';
        }
    });
})();
