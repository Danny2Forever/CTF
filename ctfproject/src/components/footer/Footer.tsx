import React from 'react'

const Footer = () => {
    return (
        <footer className="py-12 border-t border-primary bg-primary/1 w-full self-end mt-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">FLAG CTF</h3>
                <p>
                  KMITL School of Information Technology's official Capture The Flag platform.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-primary">Challenges</a></li>
                  <li><a href="#" className="hover:text-primary">Leaderboard</a></li>
                  <li><a href="#" className="hover:text-primary">Resources</a></li>
                  <li><a href="#team" className="hover:text-primary">Team</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <p>
                  School of Information Technology<br />
                  King Mongkut's Institute of Technology Ladkrabang<br />
                  Bangkok, Thailand
                </p>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
              <p>© {new Date().getFullYear()} FLAG CTF - KMITL School of Information Technology</p>
            </div>
          </div>
        </footer>
    )
}

export default Footer