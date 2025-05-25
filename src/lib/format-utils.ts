export function formatFileNameAsTitle(fileName: string): string{
    const withoutExtension = fileName.replace(/\.[^/.]+$/,'');   //remove the extension from the file name and replace special characters with a space
    const withSpaces = withoutExtension
        .replace(/[-_]+/g, '') // replace dashed and underscore with spaces
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase

        // Convert to title case (capitalise first letter of each word)
        return withSpaces
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
            .trim();
}