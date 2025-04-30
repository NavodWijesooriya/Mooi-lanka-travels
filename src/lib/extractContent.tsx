import Image from 'next/image';

export function extractContent(content: any): JSX.Element[] {
  if (!content || !content.root || !content.root.children) {
    return [<p key="no-content">No content available.</p>];
  }

  const elements: JSX.Element[] = [];

  // Recursive function to render content based on its type
  const renderNode = (node: any, index: number): JSX.Element | null => {
    switch (node.type) {
      case 'heading':
        return <h2 key={index} className="text-2xl font-semibold mb-4">{node.children[0]?.text}</h2>;

      case 'list':
        return node.listType === 'number' ? (
          <ol key={index} className="list-decimal pl-5 mb-4">
            {node.children.map((listItem: any, idx: number) => (
              <li key={idx} className="mb-2">{listItem.children[0]?.text}</li>
            ))}
          </ol>
        ) : (
          <ul key={index} className="list-disc pl-5 mb-4">
            {node.children.map((listItem: any, idx: number) => (
              <li key={idx} className="mb-2">{listItem.children[0]?.text}</li>
            ))}
          </ul>
        );

      case 'paragraph':
        // Handle line breaks properly
        return (
          <p key={index} className="mb-4">
            {node.children[0]?.text.split('\n').map((line: string, idx: number) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
          </p>
        );

      case 'hr':
        return <hr key={index} className="border-t border-gray-300 my-4" />;

      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-gray-500 pl-4 italic text-gray-600 my-4">
            {node.children[0]?.text}
          </blockquote>
        );

      case 'upload':
        return (
          <div key={index} className="mb-8">
            <Image
              src={node.value.url}
              alt={node.value.alt || 'Uploaded Image'}
              className="object-cover rounded-xl w-full"
              style={{ maxHeight: '400px' }}
              width={800} // Adjust width as needed
              height={400} // Adjust height as needed
            />
          </div>
        );

      default:
        return null;
    }
  };

  content.root.children.forEach((node: any, index: number) => {
    const element = renderNode(node, index);
    if (element) {
      elements.push(element);
    }
  });

  return elements;
}