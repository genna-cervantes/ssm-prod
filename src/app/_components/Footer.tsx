import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#2D4A2D] text-white py-8 md:py-16 px-4 md:px-[50px] pb-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {/* Logo and Description */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Save Sierra Madre" className="w-30 h-12" />
            <h3 className="text-xl font-bold">Save Sierra Madre</h3>
          </div>
          <p className="text-brown-2 text-sm leading-relaxed">
            Protecting the Philippines' last ecological frontier for future generations
          </p>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-brown-2 hover:text-white transition-colors">About SSMNAI</Link></li>
            <li><Link href="/publications" className="text-brown-2 hover:text-white transition-colors">Publications</Link></li>
            <li><Link href="/signee-notes" className="text-brown-2 hover:text-white transition-colors">Signee Notes</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-brown-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-[#E5F1E5] shrink-0" />
              <span>Rm. 232, St. Anthony Bldg. 891 Aurora Boulevard cor. Cambridge Street, Cubao 1112 Quezon City</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#E5F1E5] shrink-0" />
              <span>0920968492</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#E5F1E5] shrink-0" />
              <a href="mailto:savesierramadre@yahoo.com" className="hover:text-white transition-colors">savesierramadre@yahoo.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#E5F1E5] shrink-0" />
              <a href="#" className="hover:text-white transition-colors">Save Sierra Madre</a>
            </li>
          </ul>
        </div>

        {/* Developed By */}
        <div className="col-span-1">
          <h4 className="text-lg font-semibold mb-4">Developed by:</h4>
          <a href="#" className="inline-block">
            <img className="w-16 h-16" src="/images/csslogo.jpg" alt="" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20 mt-8 md:mt-12 pt-6 text-center pb-18 lg:pb-0">
        <p className="text-white text-base md:text-sm">
          © 2025 Save Sierra Madre Network Alliance. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
