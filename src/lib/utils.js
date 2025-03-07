export function formatDate(dateString) {
    const data = dateString || new Date()
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(data).toLocaleDateString(undefined, options);
  }
  
  export function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  }