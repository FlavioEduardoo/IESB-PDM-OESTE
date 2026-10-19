export const COLORS = {
    light: {
        background: '#f5f3ff',
        card: '#ffffff',
        text: '#1c1b1f',
        muted: '#6b6b76',
        primary: '#3e04c3',
        onPrimary: '#ffffff',
        border: '#cccccc',
        error: '#d32f2f',
        tag: '#e8e8e8',
        tagText: '#444444',
        summary: '#e4d9fd',
        overlay: 'rgba(0,0,0,0.4)',
    },
    dark: {
        background: '#121212',
        card: '#1e1e24',
        text: '#f2f2f2',
        muted: '#a0a0aa',
        primary: '#8f6bff',
        onPrimary: '#ffffff',
        border: '#444444',
        error: '#ff6b6b',
        tag: '#33333b',
        tagText: '#dddddd',
        summary: '#2a2342',
        overlay: 'rgba(0,0,0,0.6)',
    },
};

// scheme vem do useColorScheme(): 'light' | 'dark' | null
export function getColors(scheme) {
    return scheme === 'dark' ? COLORS.dark : COLORS.light;
}