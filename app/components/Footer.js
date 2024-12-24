// components/Footer.js

export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
              <ul>
                <li>Address: 1234 Digital Ave, City, Country</li>
                <li>Phone: +1 234 567 890</li>
                <li>Email: info@yourdomain.com</li>
              </ul>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul>
                <li><a href="/about" className="hover:text-purple-500">About</a></li>
                <li><a href="/services" className="hover:text-purple-500">Services</a></li>
                <li><a href="/portfolio" className="hover:text-purple-500">Portfolio</a></li>
                <li><a href="/blog" className="hover:text-purple-500">Blog</a></li>
                <li><a href="/contact" className="hover:text-purple-500">Contact</a></li>
              </ul>
            </div>
  
            {/* Social Media Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com" className="text-white hover:text-purple-500">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.linkedin.com" className="text-white hover:text-purple-500">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.instagram.com" className="text-white hover:text-purple-500">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
  
            {/* Legal Information */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Legal</h3>
              <ul>
                <li><a href="/privacy-policy" className="text-sm hover:text-purple-500">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="text-sm hover:text-purple-500">Terms of Service</a></li>
              </ul>
            </div>
          </div>
  
          {/* Footer Bottom */}
          <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  