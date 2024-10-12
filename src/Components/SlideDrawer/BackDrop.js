import React from 'react';

const Backdrop = ({ close }) => {
    const styles = {
        backdrop: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
            top: 0,
            right: 0,
        },
    };

    return <div style={styles.backdrop} onClick={close} />;
};

export default Backdrop;
