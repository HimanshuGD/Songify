import React from 'react';

const SearchBox = ({ searchfield, searchChange }) => {
    // Inline styles
    const styles = {
        container: {
            padding: '20px',
            textAlign: 'center', // Center the search box
        },
        input: {
            padding: '15px',
            border: '2px solid #1db954', // Spotify-like green
            borderRadius: '5px',
            backgroundColor: '#282828', // Dark background color
            color: '#fff', // White text for dark theme
            width: '100%', // Full width
            maxWidth: '400px', // Limit max width
            outline: 'none', // Remove outline
            transition: 'border-color 0.3s',
        },
        placeholder: {
            color: '#bbb', // Light gray for placeholder text
        },
    };

    return (
        <div style={styles.container}>
            <input
                style={styles.input}
                type='search'
                placeholder='Search Songs'
                onChange={searchChange}
                value={searchfield}
            />
        </div>
    );
}

export default SearchBox;
