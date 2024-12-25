export async function extractPageText(page: any): Promise<string> {
  try {
    const textContent = await page.getTextContent();
    return textContent.items
      .map((item: any) => item.str)
      .join(' ')
      .trim();
  } catch (error) {
    console.error('Failed to extract page text:', error);
    return '';
  }
}