const saveRecentSearches = (searchTerm: string) => {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

    if (!recentSearches.includes(searchTerm)) {
        recentSearches.unshift(searchTerm);
        if (recentSearches.length > 5) {
            recentSearches.pop();
        }
    }
    else {
        // If the search term already exists, move it to the front
        const index = recentSearches.indexOf(searchTerm);
        if (index > -1) {
            recentSearches.splice(index, 1);
        }
        recentSearches.unshift(searchTerm);
    }
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
}

export default saveRecentSearches;