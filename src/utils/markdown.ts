export function renderMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';

  const html = markdown
    // Code blocks with syntax backticks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, _lang, code) => {
      const escapedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<pre class="bg-neutral-100 dark:bg-neutral-900 border border-[#E5E5E5] dark:border-[#333333] p-4 overflow-x-auto font-display text-xs md:text-sm my-6"><code>${escapedCode}</code></pre>`;
    })
    // Inline code
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-neutral-100 dark:bg-neutral-900 border border-[#E5E5E5] dark:border-[#333333] px-1.5 py-0.5 font-display text-xs md:text-sm">$1</code>'
    )
    // Headings
    .replace(
      /^### (.*$)/gim,
      '<h3 class="font-display text-xl font-bold uppercase tracking-tight mt-8 mb-4">$1</h3>'
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 class="font-display text-2xl font-bold uppercase tracking-tight mt-10 mb-4 pb-2 border-b border-[#E5E5E5] dark:border-[#333333]">$1</h2>'
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 class="font-display text-3xl font-bold uppercase tracking-tight mt-12 mb-6">$1</h1>'
    )
    // Blockquotes
    .replace(
      /^> (.*$)/gim,
      '<blockquote class="border-l-4 border-black dark:border-white pl-4 italic my-6 text-[#525252] dark:text-[#A3A3A3]">$1</blockquote>'
    )
    // Unordered lists
    .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc mb-2">$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-6 list-decimal mb-2">$1</li>')
    // Bold / Italic
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Paragraph breaks
  const paragraphs = html
    .split(/\n\n+/)
    .map((p) => {
      const trimmed = p.trim();
      if (
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<pre') ||
        trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<li')
      ) {
        return trimmed;
      }
      return `<p class="font-body text-base md:text-lg text-[#333333] dark:text-[#CCCCCC] leading-relaxed mb-6">${trimmed}</p>`;
    })
    .join('\n');

  return paragraphs;
}
