function copyToClipboardFallback(text: string) {
  const textarea = document.createElement('textarea');

  // Styling the textarea to prevent scrolling to the component
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.width = '2em';
  textarea.style.height = '2em';
  textarea.style.padding = '0';
  textarea.style.border = 'none';
  textarea.style.outline = 'none';
  textarea.style.boxShadow = 'none';
  textarea.style.background = 'transparent';

  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand('copy');
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  document.body.removeChild(textarea);
}

async function copyToClipboard(text: string) {
  // Check if the new clipboard async API is implemented
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    // Otherwise we fallback to the old method
    copyToClipboardFallback(text);
  }
}

export default copyToClipboard;
