const generateExcerpt = (html, length = 100) => {
    if (!html) return '';
    const text = html.replace(/<[^>]+>/g, ''); // Strip HTML tags
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
};

export default generateExcerpt;