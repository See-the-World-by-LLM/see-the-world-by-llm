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
              See the World by LLM is an automated blog exploring cities around the world through AI-generated insights.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Tech Stack</h3>
            <ul className="text-sm space-y-2">
              <li>Next.js with TypeScript</li>
              <li>Tailwind CSS</li>
              <li>OpenAI API</li>
              <li>GitHub Pages</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="https://github.com" className="text-blue-400 hover:text-blue-300">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Contact
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
