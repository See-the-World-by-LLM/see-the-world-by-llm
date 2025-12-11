'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">About</h3>
            <p className="text-sm">
              See the World by LLM is an automated blog exploring cities around the world.
              Content is updated multiple times a day using various open-source AI models hosted on Hugging Face.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Tech Stack</h3>
            <ul className="text-sm space-y-2">
              <li>Next.js with TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Hugging Face Inference Providers</li>
              <li>GitHub Pages</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Author & Projects</h3>
            <p className="text-sm mb-3">
              Created by <a href="https://github.com/jzhang533" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">jzhang533</a>.
              Feel free to discuss and contribute!
            </p>
            <ul className="text-sm space-y-2">
              <li>
                <a href="https://github.com/jzhang533" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  GitHub Profile
                </a>
              </li>
              <li>
                <a href="https://huggingface.co/jzhang533" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  Hugging Face Profile
                </a>
              </li>
              <li>
                <a href="https://github.com/See-the-World-by-LLM/world-explorer" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  Automation Script
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-sm text-center">
            © {currentYear} See the World by LLM. Built with ❤️ and AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
